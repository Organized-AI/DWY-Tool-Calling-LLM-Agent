import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

// Initialize clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// Create UUID mappings for consistent relationships
const nodeIdMap: Record<string, string> = {
  'nasa': randomUUID(),
  'spacex': randomUUID(),
  'mars': randomUUID(),
  'artemis': randomUUID(),
  'starship': randomUUID(),
  'moon': randomUUID(),
  'iss': randomUUID(),
  'elon-musk': randomUUID(),
  'laika': randomUUID(),
  'apollo': randomUUID(),
}

// Demo data for immediate visual impact
const DEMO_NODES = [
  // Space Exploration Theme
  { id: nodeIdMap['nasa'], label: 'NASA', type: 'organization', properties: { description: 'National Aeronautics and Space Administration, leading space exploration' } },
  { id: nodeIdMap['spacex'], label: 'SpaceX', type: 'organization', properties: { description: 'Private space company revolutionizing space travel' } },
  { id: nodeIdMap['mars'], label: 'Mars', type: 'concept', properties: { description: 'The Red Planet, target for human colonization' } },
  { id: nodeIdMap['artemis'], label: 'Artemis Program', type: 'technology', properties: { description: 'NASA\'s program to return humans to the Moon' } },
  { id: nodeIdMap['starship'], label: 'Starship', type: 'technology', properties: { description: 'SpaceX\'s fully reusable spacecraft' } },
  { id: nodeIdMap['moon'], label: 'Moon', type: 'concept', properties: { description: 'Earth\'s natural satellite' } },
  { id: nodeIdMap['iss'], label: 'International Space Station', type: 'technology', properties: { description: 'Orbital laboratory and space habitat' } },
  { id: nodeIdMap['elon-musk'], label: 'Elon Musk', type: 'person', properties: { description: 'CEO of SpaceX, visionary entrepreneur' } },
  { id: nodeIdMap['laika'], label: 'Laika', type: 'entity', properties: { description: 'First dog in space, Soviet space program' } },
  { id: nodeIdMap['apollo'], label: 'Apollo Program', type: 'technology', properties: { description: 'Historic program that landed humans on the Moon' } },
]

const DEMO_EDGES = [
  { source: nodeIdMap['nasa'], target: nodeIdMap['artemis'], relationship: 'operates' },
  { source: nodeIdMap['nasa'], target: nodeIdMap['apollo'], relationship: 'conducted' },
  { source: nodeIdMap['spacex'], target: nodeIdMap['starship'], relationship: 'develops' },
  { source: nodeIdMap['spacex'], target: nodeIdMap['mars'], relationship: 'plans_mission_to' },
  { source: nodeIdMap['elon-musk'], target: nodeIdMap['spacex'], relationship: 'founded' },
  { source: nodeIdMap['artemis'], target: nodeIdMap['moon'], relationship: 'targets' },
  { source: nodeIdMap['starship'], target: nodeIdMap['mars'], relationship: 'designed_for' },
  { source: nodeIdMap['apollo'], target: nodeIdMap['moon'], relationship: 'landed_on' },
  { source: nodeIdMap['nasa'], target: nodeIdMap['iss'], relationship: 'operates' },
  { source: nodeIdMap['spacex'], target: nodeIdMap['iss'], relationship: 'supplies' },
  // Note: Laika is intentionally left unconnected as a teaching example
  // Users can practice creating connections in the demo
]

async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text.slice(0, 8000),
    })
    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding generation failed:', error)
    // Fallback for demo
    return Array(1536).fill(0).map(() => Math.random())
  }
}

async function clearDatabase() {
  console.log('🧹 Clearing existing data...')
  
  // Clear in correct order due to foreign keys
  await supabase.from('document_chunks').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('documents').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('kg_edges').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('kg_nodes').delete().neq('id', '00000000-0000-0000-0000-000000000000')
}

async function seedNodes() {
  console.log('🌱 Seeding knowledge graph nodes...')
  
  for (const node of DEMO_NODES) {
    // Create text representation for embedding
    const nodeText = [
      node.label,
      node.type,
      node.properties?.description || '',
    ].filter(Boolean).join(' - ')
    
    // Generate embedding
    const embedding = await generateEmbedding(nodeText)
    
    const { error } = await supabase
      .from('kg_nodes')
      .insert({
        id: node.id,
        label: node.label,
        type: node.type,
        properties: node.properties,
        embedding: embedding,
      })
    
    if (error) {
      console.error(`Failed to insert node ${node.id}:`, error)
    }
  }
  
  console.log(`✅ Inserted ${DEMO_NODES.length} nodes with embeddings`)
}

async function seedEdges() {
  console.log('🔗 Creating relationships...')
  
  for (const edge of DEMO_EDGES) {
    const { error } = await supabase
      .from('kg_edges')
      .insert({
        source_id: edge.source,
        target_id: edge.target,
        relationship: edge.relationship,
      })
    
    if (error) {
      console.error(`Failed to insert edge ${edge.source}->${edge.target}:`, error)
    }
  }
  
  console.log(`✅ Created ${DEMO_EDGES.length} relationships`)
}

async function seedDocuments() {
  console.log('📄 Processing documents...')
  
  // Read sample content files
  const contentDir = path.join(process.cwd(), 'sample-content')
  const files = [
    { path: 'space-dog.md', title: 'The Space Dog Story' },
    { path: 'tech-overview.md', title: 'Space Technology Overview' }
  ]
  
  for (const file of files) {
    try {
      const content = await fs.readFile(path.join(contentDir, file.path), 'utf-8')
      
      // Create document
      const { data: doc, error: docError } = await supabase
        .from('documents')
        .insert({
          title: file.title,
          content: content,
          metadata: { source: file.path }
        })
        .select()
        .single()
      
      if (docError) {
        console.error(`Failed to create document ${file.title}:`, docError)
        continue
      }
      
      // Split into chunks (by paragraphs for demo)
      const chunks = content.split('\n\n').filter(chunk => chunk.trim().length > 50)
      
      console.log(`  Processing ${chunks.length} chunks for ${file.title}...`)
      
      for (let i = 0; i < chunks.length; i++) {
        const embedding = await generateEmbedding(chunks[i])
        
        const { error: chunkError } = await supabase
          .from('document_chunks')
          .insert({
            document_id: doc.id,
            content: chunks[i],
            chunk_index: i,
            embedding: embedding,
          })
        
        if (chunkError) {
          console.error(`Failed to insert chunk ${i}:`, chunkError)
        }
      }
      
      console.log(`  ✅ Processed ${file.title}`)
    } catch (error) {
      console.error(`Failed to process ${file.path}:`, error)
    }
  }
}

async function createDemoContent() {
  console.log('📝 Creating additional demo content...')
  
  // Create a comprehensive space exploration document
  const spaceExplorationDoc = `
# The Future of Space Exploration

Space exploration has entered a new golden age, with both government agencies and private companies pushing the boundaries of what's possible.

## Government Programs

NASA's Artemis program represents humanity's return to the Moon, but this time to stay. The program aims to establish a sustainable presence on the lunar surface, using it as a stepping stone for future Mars missions.

The International Space Station continues to serve as humanity's outpost in space, hosting astronauts from multiple nations and conducting crucial research in microgravity.

## Commercial Space

SpaceX has revolutionized space travel with reusable rockets and the ambitious Starship program. Their goal of making life multiplanetary starts with establishing a self-sustaining city on Mars.

Blue Origin, Virgin Galactic, and other companies are opening space to tourism and commercial activities, democratizing access to the final frontier.

## Historic Achievements

From Laika, the first living creature in orbit, to the Apollo missions that put humans on the Moon, our journey to the stars is built on decades of courage and innovation.

The Space Race of the 1960s gave way to international cooperation, exemplified by the ISS and joint missions between former rivals.

## The Road Ahead

Mars beckons as humanity's next great destination. With advanced propulsion systems, life support technologies, and the collective will of our species, the dream of becoming an interplanetary civilization is closer than ever.

The Moon will serve as our proving ground, where we'll test the technologies and techniques needed for the longer journey to Mars and beyond.
`

  const { data: doc } = await supabase
    .from('documents')
    .insert({
      title: 'Comprehensive Guide to Space Exploration',
      content: spaceExplorationDoc,
      metadata: { category: 'overview', featured: true }
    })
    .select()
    .single()
  
  if (doc) {
    // Create embeddings for this document
    const sections = spaceExplorationDoc.split('\n\n').filter(s => s.trim().length > 50)
    
    for (let i = 0; i < sections.length; i++) {
      const embedding = await generateEmbedding(sections[i])
      await supabase
        .from('document_chunks')
        .insert({
          document_id: doc.id,
          content: sections[i],
          chunk_index: i,
          embedding: embedding,
        })
    }
  }
  
  console.log('✅ Created comprehensive demo content')
}

async function main() {
  console.log('🚀 Starting Knowledge Graph Demo Seed Process')
  console.log('============================================\n')
  
  try {
    await clearDatabase()
    await seedNodes()
    await seedEdges()
    await seedDocuments()
    await createDemoContent()
    
    console.log('\n✨ Seed process complete!')
    console.log('\nYour demo now includes:')
    console.log('- 10 interconnected knowledge graph nodes')
    console.log('- 10 meaningful relationships')
    console.log('- 3 searchable documents with embeddings')
    console.log('\nTry these queries:')
    console.log('- "Tell me about Mars exploration"')
    console.log('- "Show connections between NASA and SpaceX"')
    console.log('- "What was the first animal in space?"')
    
  } catch (error) {
    console.error('❌ Seed process failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { main as seedDatabase }