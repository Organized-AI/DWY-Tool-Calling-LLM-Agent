# Supabase Knowledge Graph Schema

This schema demonstrates how to build a knowledge graph using PostgreSQL/Supabase without needing specialized graph databases like Neo4j.

## Setup Instructions

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Go to the SQL Editor in your Supabase dashboard

3. Copy and paste the contents of `schema.sql` into the editor

4. Run the SQL to create all tables, indexes, and functions

## What This Schema Provides

### Core Tables

- **kg_nodes**: Stores entities (people, concepts, technologies, etc.)
- **kg_edges**: Stores relationships between entities
- **documents**: Stores full documents for traditional RAG
- **document_chunks**: Stores document chunks with embeddings for vector search

### Key Features

1. **Pure SQL Graph Operations**
   - No pgRouting needed!
   - Graph traversal using recursive CTEs
   - Shortest path finding
   - Connected nodes discovery

2. **Vector Search Integration**
   - Uses pgvector (available on Supabase cloud)
   - Semantic search on both nodes and document chunks
   - Hybrid search capabilities

3. **Flexible Properties**
   - JSONB columns for dynamic properties
   - No rigid schema requirements
   - Easy to extend

### Helper Functions

- `get_connected_nodes(node_id, max_depth)`: Find all nodes connected to a given node
- `find_shortest_path(start_id, end_id)`: Find the shortest path between two nodes
- `search_nodes_semantic(embedding, threshold, count)`: Semantic search on nodes
- `search_chunks_semantic(embedding, threshold, count)`: Semantic search on documents

## Usage Example

```sql
-- Find all nodes connected to a specific node
SELECT * FROM get_connected_nodes(
  (SELECT id FROM kg_nodes WHERE label = 'OpenAI'),
  3 -- max depth
);

-- Semantic search for similar nodes
SELECT * FROM search_nodes_semantic(
  '[0.1, 0.2, ...]'::vector, -- your query embedding
  0.7, -- similarity threshold
  5 -- number of results
);
```

## Next Steps

After setting up the schema:

1. Update your `.env.local` with your Supabase credentials
2. Use the Supabase client to interact with these tables
3. Generate embeddings using OpenAI's API
4. Build your knowledge graph!