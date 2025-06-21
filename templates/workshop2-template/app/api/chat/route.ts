import { streamText, tool } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { createServerSideClient } from '@/lib/supabase'
import OpenAI from 'openai'

// Tool schemas
const searchVectorSchema = z.object({
  query: z.string().describe('The search query'),
  threshold: z.number().optional().default(0.5),
  limit: z.number().optional().default(10),
})

const searchGraphSchema = z.object({
  nodeLabel: z.string().describe('Starting node label'),
  maxDepth: z.number().optional().default(2),
})

const createNodeSchema = z.object({
  label: z.string().describe('Node label'),
  type: z.string().optional().describe('Node type (concept, person, technology, etc)'),
  properties: z.record(z.any()).optional().default({}),
})

const createEdgeSchema = z.object({
  sourceLabel: z.string().describe('Source node label'),
  targetLabel: z.string().describe('Target node label'),
  relationship: z.string().describe('Relationship type'),
})

// Helper function for safe tool execution with error handling
function createSafeExecute<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  toolName: string
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error(`Error in ${toolName}:`, error)
      return {
        error: true,
        message: `Failed to execute ${toolName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      }
    }
  }) as T
}

export async function POST(req: Request) {
  try {
    const { messages, mode } = await req.json()
    
    // Validate inputs
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    if (!mode || !['vector', 'graph', 'hybrid'].includes(mode)) {
      return new Response(JSON.stringify({ error: 'Invalid mode. Must be vector, graph, or hybrid' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const supabase = await createServerSideClient()

  // Define tools based on mode
  const tools = {
    // Vector RAG tools
    ...(mode === 'vector' || mode === 'hybrid' ? {
      searchDocuments: tool({
        description: 'Search for relevant document chunks using semantic similarity',
        parameters: searchVectorSchema,
        execute: createSafeExecute(async ({ query, threshold, limit }) => {
          // Generate embedding for query
          const embedding = await generateEmbedding(query)
          
          // Search document chunks with lower threshold for better recall
          const { data, error } = await supabase.rpc('search_chunks_semantic', {
            query_embedding: embedding,
            match_threshold: threshold || 0.5,
            match_count: limit || 10,
          })

          if (error) throw error
          
          // Format results to include more details
          const results = (data || []).map(chunk => ({
            ...chunk,
            document_title: chunk.document_title || 'Unknown Document',
            excerpt: chunk.content.substring(0, 200) + '...',
            similarity: chunk.similarity
          }))
          
          return results
        }, 'searchDocuments'),
      }),
    } : {}),

    // Graph RAG tools
    ...(mode === 'graph' || mode === 'hybrid' ? {
      traverseGraph: tool({
        description: 'Traverse the knowledge graph starting from a node',
        parameters: searchGraphSchema,
        execute: async ({ nodeLabel, maxDepth }) => {
          console.log('=== GRAPH TRAVERSAL DEBUG ===')
          console.log('Looking for node:', nodeLabel)
          console.log('Max depth:', maxDepth)
          
          // First find the node
          const { data: nodes } = await supabase
            .from('kg_nodes')
            .select('*')
            .eq('label', nodeLabel)
            .limit(1)

          if (!nodes || nodes.length === 0) {
            console.log('Node not found!')
            return { error: 'Node not found' }
          }

          console.log('Found node:', nodes[0].id, nodes[0].label)

          // Get connected nodes
          const { data, error } = await supabase.rpc('get_connected_nodes', {
            node_id: nodes[0].id,
            max_depth: maxDepth,
          })

          if (error) {
            console.error('RPC Error:', error)
            throw error
          }
          
          console.log('Connected nodes found:', data?.length || 0)
          if (data && data.length > 0) {
            console.log('Connected nodes:')
            data.forEach(node => {
              console.log(`- ${node.label} (depth: ${node.depth})`)
            })
          }
          
          console.log('=== END TRAVERSAL DEBUG ===')
          
          return { startNode: nodes[0], connectedNodes: data || [] }
        },
      }),

      createNode: tool({
        description: 'Create a new node in the knowledge graph',
        parameters: createNodeSchema,
        execute: async ({ label, type, properties }) => {
          const { data, error } = await supabase
            .from('kg_nodes')
            .insert({ label, type, properties })
            .select()
            .single()

          if (error) throw error
          return data
        },
      }),

      createEdge: tool({
        description: 'Create a relationship between two nodes',
        parameters: createEdgeSchema,
        execute: async ({ sourceLabel, targetLabel, relationship }) => {
          // Find both nodes
          const { data: sourceNodes } = await supabase
            .from('kg_nodes')
            .select('id')
            .eq('label', sourceLabel)
            .limit(1)

          const { data: targetNodes } = await supabase
            .from('kg_nodes')
            .select('id')
            .eq('label', targetLabel)
            .limit(1)

          if (!sourceNodes?.[0] || !targetNodes?.[0]) {
            return { error: 'One or both nodes not found' }
          }

          const { data, error } = await supabase
            .from('kg_edges')
            .insert({
              source_id: sourceNodes[0].id,
              target_id: targetNodes[0].id,
              relationship,
            })
            .select()
            .single()

          if (error) throw error
          return data
        },
      }),

      updateGraph: tool({
        description: 'Update the graph visualization with current nodes and edges',
        parameters: z.object({
          operation: z.enum(['add', 'refresh']).describe('Type of update operation'),
          nodeId: z.string().optional().describe('Node ID for focused updates'),
        }),
        execute: async ({ operation, nodeId }) => {
          // For refresh operation, get latest graph data
          if (operation === 'refresh') {
            const query = nodeId 
              ? supabase.rpc('get_node_connections', { node_id: nodeId })
              : supabase.from('kg_nodes').select(`
                  *,
                  source_edges:kg_edges!source_id(*),
                  target_edges:kg_edges!target_id(*)
                `).limit(50)
            
            const { data, error } = await query
            if (error) throw error
            
            // Transform data for visualization
            const nodes = data?.map((node: any) => ({
              id: node.id,
              label: node.label,
              type: node.type || 'entity',
              description: node.properties?.description,
            })) || []
            
            const edges: Array<{ id: string; source: string; target: string; label: string }> = []
            if (data) {
              data.forEach((node: any) => {
                node.source_edges?.forEach((edge: any) => {
                  edges.push({
                    id: edge.id,
                    source: edge.source_id,
                    target: edge.target_id,
                    label: edge.relationship,
                  })
                })
              })
            }
            
            return { nodes, edges, operation: 'refresh' }
          }
          
          // For add operation, just signal the frontend to fetch new data
          return { operation: 'add', message: 'Graph updated' }
        },
      }),
    } : {}),

    // Hybrid mode gets semantic search on nodes
    ...(mode === 'hybrid' ? {
      searchNodesSemanticaly: tool({
        description: 'Search for nodes using semantic similarity',
        parameters: searchVectorSchema,
        execute: async ({ query, threshold, limit }) => {
          const embedding = await generateEmbedding(query)
          
          const { data, error } = await supabase.rpc('search_nodes_semantic', {
            query_embedding: embedding,
            match_threshold: threshold,
            match_count: limit,
          })

          if (error) throw error
          return data || []
        },
      }),
    } : {}),
  }

  // Different system prompts based on mode
  const systemPrompts = {
    vector: `You are a helpful AI assistant using Vector RAG. You search through document chunks using semantic similarity to find relevant information. Use the searchDocuments tool to find relevant content based on the user's query.

IMPORTANT: When providing information from documents, ALWAYS cite your sources:
- ALWAYS use the searchDocuments tool before answering questions
- If the search returns results, quote relevant passages from the chunks
- If the search returns NO results, explicitly state "No documents found matching your query"
- At the end of EVERY response, include a "🔍 Sources:" section
- List each document chunk with title, excerpt, and similarity score
- If no sources found, state "No RAG sources found - this answer is from general knowledge"
- This transparency proves whether information came from RAG or training data`,
    
    graph: `You are a helpful AI assistant using GraphRAG. You navigate through a knowledge graph to find information and can create new nodes and relationships when explicitly asked. 

IMPORTANT RULES:
1. ALWAYS try traverseGraph FIRST before creating anything new
2. ONLY create new nodes/edges when:
   - The user explicitly asks you to add something to the graph
   - The user asks about something that doesn't exist and wants it added
   - NEVER create nodes just because you're answering a question
3. When providing information, ALWAYS cite your sources:
   - Include a "🕸️ Graph Path:" section showing connections like: NASA → [operates] → ISS
   - If no path exists, say "No graph connections found"
4. Use updateGraph ONLY when you've made changes to the graph
5. Be conservative - the graph should grow intentionally, not automatically`,
    
    hybrid: `You are a helpful AI assistant using Hybrid RAG. You combine semantic search with graph traversal for the best results. You can search documents and traverse the graph to find information.

IMPORTANT RULES:
1. ALWAYS search existing data FIRST (both documents and graph)
2. ONLY create new nodes/edges when explicitly asked by the user
3. NEVER automatically add to the graph just because you found new information
4. When providing information, ALWAYS cite your sources clearly:
   - For document searches: Quote passages and include "🔍 Document Sources:"
   - For graph traversals: Show paths and include "🕸️ Graph Paths:"
   - For semantic node searches: Show matches and include "🎯 Matched Nodes:" with similarity scores
5. Use updateGraph ONLY when you've made changes to the graph
6. Be conservative - prefer finding existing information over creating new content`,
  }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: systemPrompts[mode as keyof typeof systemPrompts],
      tools,
      maxSteps: 5,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    
    // Return a proper error response
    return new Response(
      JSON.stringify({
        error: 'An error occurred processing your request',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Initialize OpenAI client for embeddings
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Helper function to generate embeddings
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // Truncate text to avoid token limits
    const truncatedText = text.slice(0, 8000)
    
    const response = await openaiClient.embeddings.create({
      model: 'text-embedding-3-small',
      input: truncatedText,
    })
    
    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding generation failed:', error)
    // Fallback to mock embeddings for demo continuity
    console.warn('Using mock embeddings as fallback')
    return Array(1536).fill(0).map(() => Math.random())
  }
}