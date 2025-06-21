# Knowledge Graphs + AI: Complete Tutorial

This tutorial will walk you through building AI applications with knowledge graphs, step by step. By the end, you'll understand how to combine vector search with graph traversal for powerful AI experiences.

## Table of Contents

1. [Understanding the Concepts](#understanding-the-concepts)
2. [Setting Up Your Environment](#setting-up-your-environment)
3. [Building Your First Knowledge Graph](#building-your-first-knowledge-graph)
4. [Implementing Vector RAG](#implementing-vector-rag)
5. [Implementing GraphRAG](#implementing-graphrag)
6. [Combining Both: Hybrid RAG](#combining-both-hybrid-rag)
7. [Production Tips](#production-tips)

## Understanding the Concepts

### What is a Knowledge Graph?

A knowledge graph is a way to store information as a network of connected entities:
- **Nodes**: Entities (people, concepts, places, things)
- **Edges**: Relationships between entities
- **Properties**: Additional data about nodes or edges

Example:
```
[OpenAI] --created--> [GPT-4]
[GPT-4] --type--> [Language Model]
[GPT-4] --competes-with--> [Claude]
```

### Why Knowledge Graphs for AI?

Traditional RAG (Retrieval-Augmented Generation) uses vector similarity to find relevant documents. But it misses relationships! Knowledge graphs add:

1. **Explicit relationships**: "Who created GPT-4?" → Follow the edge!
2. **Multi-hop reasoning**: "What models compete with products made by OpenAI?"
3. **Structured knowledge**: No more hoping the LLM extracts the right facts

### The Three Patterns We'll Build

1. **Vector RAG**: Search documents by meaning
2. **GraphRAG**: Navigate relationships
3. **Hybrid**: Use vectors to find entry points, then traverse the graph

## Setting Up Your Environment

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (or use existing)
4. Create a new project:
   - Name: `kg-demo` (or whatever you like)
   - Database Password: Generate a strong one
   - Region: Choose closest to you
5. Wait for project to initialize (~2 minutes)

### Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy these values:
   - `URL`: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public`: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Set Up the Database Schema

1. In Supabase dashboard, go to SQL Editor
2. Click "New query"
3. Copy ALL contents from `supabase/schema.sql` in this repo
4. Paste and click "Run"
5. You should see success messages for each CREATE statement

### Step 4: Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in/up
3. Go to API keys
4. Create new secret key
5. Copy it (you won't see it again!)

### Step 5: Configure the Demo App

1. Clone this repository:
   ```bash
   git clone [repo-url]
   cd kg-presentation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.local.example .env.local
   ```

4. Edit `.env.local` with your values:
   ```env
   OPENAI_API_KEY=sk-proj-...your-key...
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
   ```

5. Start the app:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Building Your First Knowledge Graph

### Understanding Our Schema

Look at `supabase/schema.sql`. The key tables are:

```sql
-- Nodes: The entities in our graph
kg_nodes (
  id,          -- Unique identifier
  label,       -- Human-readable name
  type,        -- Category (person, concept, etc.)
  properties,  -- JSONB for flexible data
  embedding    -- Vector for semantic search
)

-- Edges: The relationships
kg_edges (
  source_id,    -- From node
  target_id,    -- To node
  relationship, -- Type of connection
  weight        -- Strength of connection
)
```

### Try It: GraphRAG Mode

1. Open the demo app
2. Switch to "GraphRAG" mode
3. Try these prompts:

**Create some nodes:**
```
Create a node for "React" as a technology
Create a node for "Next.js" as a framework
Create a node for "Vercel" as a company
```

**Create relationships:**
```
Create an edge: Vercel created Next.js
Create an edge: Next.js uses React
```

**Query the graph:**
```
What is connected to React?
Show me everything related to Vercel
```

Watch the graph visualization update in real-time!

## Implementing Vector RAG

### How Vector RAG Works

1. **Chunk documents** into smaller pieces
2. **Generate embeddings** (numerical representations)
3. **Store in vector database** (we use pgvector)
4. **Search by similarity** when user asks questions

### Try It: Vector RAG Mode

1. Switch to "Vector RAG" mode
2. The AI will search through document chunks
3. Try asking about content from the sample files:
   ```
   Tell me about Astro the space dog
   What are the key features of modern AI?
   ```

### Adding Your Own Documents

To add documents for Vector RAG:

1. Create a simple UI for document upload (exercise for reader!)
2. Chunk the document (split into ~500 token pieces)
3. Generate embeddings for each chunk
4. Store in `document_chunks` table

Example code structure:
```typescript
// Pseudo-code for document processing
async function processDocument(content: string) {
  // 1. Split into chunks
  const chunks = splitIntoChunks(content, 500)
  
  // 2. Generate embeddings
  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk.text)
    
    // 3. Store in Supabase
    await supabase.from('document_chunks').insert({
      content: chunk.text,
      embedding: embedding,
      chunk_index: chunk.index
    })
  }
}
```

## Implementing GraphRAG

### Building Knowledge Programmatically

Instead of using the chat interface, you can build graphs programmatically:

```typescript
// Example: Building a tech knowledge graph
async function buildTechGraph() {
  const supabase = createClient()
  
  // Create nodes
  const nodes = [
    { label: 'AI', type: 'field' },
    { label: 'Machine Learning', type: 'subfield' },
    { label: 'Deep Learning', type: 'subfield' },
    { label: 'Transformers', type: 'architecture' },
    { label: 'GPT', type: 'model' },
    { label: 'BERT', type: 'model' }
  ]
  
  for (const node of nodes) {
    await supabase.from('kg_nodes').insert(node)
  }
  
  // Create relationships
  const edges = [
    { source: 'AI', target: 'Machine Learning', relationship: 'includes' },
    { source: 'Machine Learning', target: 'Deep Learning', relationship: 'includes' },
    { source: 'Deep Learning', target: 'Transformers', relationship: 'uses' },
    { source: 'Transformers', target: 'GPT', relationship: 'architecture_for' },
    { source: 'Transformers', target: 'BERT', relationship: 'architecture_for' }
  ]
  
  // ... insert edges
}
```

### Graph Traversal Patterns

Our schema includes powerful SQL functions:

```sql
-- Find all connected nodes
SELECT * FROM get_connected_nodes('node-id', max_depth := 3);

-- Find shortest path
SELECT * FROM find_shortest_path('start-id', 'end-id');
```

## Combining Both: Hybrid RAG

### The Power of Hybrid

Hybrid mode combines the best of both:
1. Use **vector search** to find relevant nodes
2. Use **graph traversal** to expand context
3. Feed both to the LLM

### Example Workflow

User asks: "What technologies are similar to React?"

1. **Vector search**: Find nodes with embeddings similar to "React"
   - Results: Vue, Angular, Svelte

2. **Graph expansion**: For each result, find connected nodes
   - Vue → created_by → Evan You
   - Angular → created_by → Google
   - Svelte → compiles_to → JavaScript

3. **Context assembly**: Combine all information for LLM

### Try It: Hybrid Mode

1. Switch to "Hybrid" mode
2. Ask questions that benefit from both approaches:
   ```
   Find technologies similar to React and who created them
   What databases are semantically similar to PostgreSQL and what are they used for?
   ```

## Production Tips

### 1. Embedding Generation

For production, implement real OpenAI embeddings:

```typescript
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}
```

### 2. Batch Processing

Process multiple embeddings at once:

```typescript
async function batchEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts, // Array of up to 2048 strings
  })
  return response.data.map(d => d.embedding)
}
```

### 3. Graph Building Best Practices

- **Consistent naming**: Use conventions for node labels
- **Type system**: Define clear node and edge types
- **Properties**: Store metadata in JSONB for flexibility
- **Weights**: Use edge weights for ranking traversal

### 4. Performance Optimization

- **Indexes**: Our schema includes indexes on embeddings and properties
- **Materialized views**: Pre-compute common traversals
- **Caching**: Cache frequent graph queries
- **Pagination**: Limit graph traversal depth

### 5. Monitoring and Maintenance

- Track query performance
- Monitor embedding drift
- Periodically validate relationships
- Clean up orphaned nodes

## Next Steps

### Exercises to Try

1. **Build a domain-specific graph**: Create nodes and edges for your area of interest
2. **Implement document upload**: Add UI for uploading and processing documents
3. **Custom tools**: Add new AI tools for graph analysis
4. **Advanced queries**: Implement community detection or centrality measures

### Going Beyond

- **Multi-modal**: Add image embeddings to nodes
- **Temporal**: Add time-based properties and queries
- **Hierarchical**: Implement parent-child relationships
- **External data**: Integrate with APIs to auto-populate graphs

## Common Patterns and Recipes

### Pattern 1: Entity Extraction

```typescript
// Extract entities from text and add to graph
const extractEntities = tool({
  description: 'Extract entities from text and add to knowledge graph',
  parameters: z.object({
    text: z.string(),
  }),
  execute: async ({ text }) => {
    // Use LLM to extract entities
    const entities = await extractWithLLM(text)
    
    // Add to graph
    for (const entity of entities) {
      await supabase.from('kg_nodes').insert({
        label: entity.name,
        type: entity.type,
        properties: { source: 'extraction', confidence: entity.confidence }
      })
    }
  }
})
```

### Pattern 2: Semantic Graph Search

```typescript
// Find semantically similar nodes and their connections
async function semanticGraphSearch(query: string, depth: number = 2) {
  // 1. Get query embedding
  const embedding = await generateEmbedding(query)
  
  // 2. Find similar nodes (with proper threshold)
  const { data: similarNodes } = await supabase.rpc('search_nodes_semantic', {
    query_embedding: embedding,
    match_threshold: 0.5,  // Lowered for better recall
    match_count: 10       // Increased for more results
  })
  
  // 3. Expand each node
  const expanded = []
  for (const node of similarNodes) {
    const { data: connected } = await supabase.rpc('get_connected_nodes', {
      node_id: node.id,
      max_depth: depth
    })
    expanded.push({ root: node, connections: connected })
  }
  
  return expanded
}
```

### Pattern 3: Graph-Guided Generation

```typescript
// Use graph structure to guide LLM generation
async function graphGuidedGeneration(topic: string) {
  // 1. Find topic node
  const { data: topicNode } = await supabase
    .from('kg_nodes')
    .select('*')
    .eq('label', topic)
    .single()
  
  // 2. Get related nodes
  const { data: related } = await supabase.rpc('get_connected_nodes', {
    node_id: topicNode.id,
    max_depth: 2
  })
  
  // 3. Build context from graph
  const context = related.map(node => 
    `${node.label} (${node.type}): ${JSON.stringify(node.properties)}`
  ).join('\n')
  
  // 4. Generate with context
  return await generateText({
    model: openai('gpt-4o'),
    prompt: `Given this knowledge graph context:\n${context}\n\nWrite about ${topic}:`,
  })
}
```

## Troubleshooting

### Common Issues

**"Embedding dimension mismatch"**
- Ensure you're using 1536-dimension embeddings (OpenAI default)
- Check the vector column definition in your schema

**"Node not found" errors**
- Verify nodes exist before creating edges
- Use proper error handling in your tools

**"Slow graph queries"**
- Limit traversal depth
- Add appropriate indexes
- Consider materialized views for complex queries

**"Can't see the graph visualization"**
- Check browser console for errors
- Ensure React Flow styles are loaded
- Verify node/edge data format

## Conclusion

You now have a complete understanding of how to build AI applications with knowledge graphs! Remember:

1. **Vector RAG** is great for semantic search
2. **GraphRAG** excels at relationship queries
3. **Hybrid** gives you the best of both worlds
4. **You don't need Neo4j** - PostgreSQL/Supabase works great!

Happy building! 🚀