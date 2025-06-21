-- Knowledge Graph Schema for Supabase
-- A practical, hackathon-friendly approach to building KGs without Neo4j

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =================================================================
-- CORE KNOWLEDGE GRAPH TABLES
-- =================================================================

-- Nodes represent entities in our knowledge graph
CREATE TABLE IF NOT EXISTS kg_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    properties JSONB DEFAULT '{}',
    embedding vector(1536), -- For semantic search (OpenAI embeddings)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Edges represent relationships between nodes
CREATE TABLE IF NOT EXISTS kg_edges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES kg_nodes(id) ON DELETE CASCADE,
    target_id UUID NOT NULL REFERENCES kg_nodes(id) ON DELETE CASCADE,
    relationship VARCHAR(255) NOT NULL,
    properties JSONB DEFAULT '{}',
    weight FLOAT DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(source_id, target_id, relationship)
);

-- =================================================================
-- VECTOR RAG TABLES
-- =================================================================

-- Documents for traditional RAG
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document chunks with embeddings
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =================================================================
-- INDEXES FOR PERFORMANCE
-- =================================================================

-- Graph traversal indexes
CREATE INDEX idx_edges_source ON kg_edges(source_id);
CREATE INDEX idx_edges_target ON kg_edges(target_id);
CREATE INDEX idx_edges_relationship ON kg_edges(relationship);
CREATE INDEX idx_nodes_type ON kg_nodes(type);
CREATE INDEX idx_nodes_label ON kg_nodes(label);

-- Vector similarity search indexes
CREATE INDEX idx_nodes_embedding ON kg_nodes USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_chunks_embedding ON document_chunks USING ivfflat (embedding vector_cosine_ops);

-- JSONB indexes for property queries
CREATE INDEX idx_nodes_properties ON kg_nodes USING gin(properties);
CREATE INDEX idx_edges_properties ON kg_edges USING gin(properties);

-- =================================================================
-- HELPER FUNCTIONS
-- =================================================================

-- Function to find all nodes connected to a given node
CREATE OR REPLACE FUNCTION get_connected_nodes(node_id UUID, max_depth INT DEFAULT 2)
RETURNS TABLE(
    node_id UUID,
    label VARCHAR(255),
    type VARCHAR(100),
    properties JSONB,
    depth INT,
    path UUID[]
) AS $$
WITH RECURSIVE node_graph AS (
    -- Base case: start node
    SELECT 
        n.id as node_id,
        n.label,
        n.type,
        n.properties,
        0 as depth,
        ARRAY[n.id] as path
    FROM kg_nodes n
    WHERE n.id = $1
    
    UNION ALL
    
    -- Recursive case: follow edges
    SELECT DISTINCT
        n.id as node_id,
        n.label,
        n.type,
        n.properties,
        ng.depth + 1,
        ng.path || n.id
    FROM node_graph ng
    JOIN kg_edges e ON (ng.node_id = e.source_id OR ng.node_id = e.target_id)
    JOIN kg_nodes n ON (
        (e.source_id = ng.node_id AND e.target_id = n.id) OR
        (e.target_id = ng.node_id AND e.source_id = n.id)
    )
    WHERE ng.depth < $2
    AND NOT n.id = ANY(ng.path) -- Avoid cycles
)
SELECT DISTINCT ON (node_id) * FROM node_graph
ORDER BY node_id, depth;
$$ LANGUAGE SQL;

-- Function to find shortest path between two nodes
CREATE OR REPLACE FUNCTION find_shortest_path(start_id UUID, end_id UUID, max_depth INT DEFAULT 10)
RETURNS TABLE(
    path UUID[],
    total_weight FLOAT
) AS $$
WITH RECURSIVE paths AS (
    -- Base case
    SELECT 
        ARRAY[start_id] as path,
        0::FLOAT as total_weight,
        start_id as current_node
    WHERE EXISTS (SELECT 1 FROM kg_nodes WHERE id = start_id)
    
    UNION ALL
    
    -- Recursive case
    SELECT 
        p.path || e.target_id,
        p.total_weight + e.weight,
        e.target_id
    FROM paths p
    JOIN kg_edges e ON e.source_id = p.current_node
    WHERE NOT e.target_id = ANY(p.path)
    AND array_length(p.path, 1) < max_depth
)
SELECT path, total_weight
FROM paths
WHERE current_node = end_id
ORDER BY total_weight ASC
LIMIT 1;
$$ LANGUAGE SQL;

-- Function for semantic search on nodes
CREATE OR REPLACE FUNCTION search_nodes_semantic(
    query_embedding vector(1536),
    match_threshold FLOAT DEFAULT 0.7,
    match_count INT DEFAULT 10
)
RETURNS TABLE(
    id UUID,
    label VARCHAR(255),
    type VARCHAR(100),
    properties JSONB,
    similarity FLOAT
) AS $$
SELECT
    id,
    label,
    type,
    properties,
    1 - (embedding <=> query_embedding) as similarity
FROM kg_nodes
WHERE embedding IS NOT NULL
AND 1 - (embedding <=> query_embedding) > match_threshold
ORDER BY embedding <=> query_embedding
LIMIT match_count;
$$ LANGUAGE SQL;

-- Function for semantic search on document chunks
CREATE OR REPLACE FUNCTION search_chunks_semantic(
    query_embedding vector(1536),
    match_threshold FLOAT DEFAULT 0.7,
    match_count INT DEFAULT 10
)
RETURNS TABLE(
    id UUID,
    document_id UUID,
    content TEXT,
    metadata JSONB,
    similarity FLOAT
) AS $$
SELECT
    id,
    document_id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) as similarity
FROM document_chunks
WHERE embedding IS NOT NULL
AND 1 - (embedding <=> query_embedding) > match_threshold
ORDER BY embedding <=> query_embedding
LIMIT match_count;
$$ LANGUAGE SQL;

-- =================================================================
-- SAMPLE DATA INSERTION (for demo purposes)
-- =================================================================

-- Insert some sample nodes
INSERT INTO kg_nodes (label, type, properties) VALUES
('OpenAI', 'Organization', '{"founded": "2015", "type": "AI Research"}'),
('GPT-4', 'Model', '{"release_date": "2023-03-14", "parameters": "1.76T"}'),
('LangChain', 'Framework', '{"language": "Python", "purpose": "LLM Applications"}'),
('Supabase', 'Platform', '{"type": "BaaS", "database": "PostgreSQL"}');

-- Insert some sample relationships
INSERT INTO kg_edges (source_id, target_id, relationship, properties)
SELECT 
    (SELECT id FROM kg_nodes WHERE label = 'OpenAI'),
    (SELECT id FROM kg_nodes WHERE label = 'GPT-4'),
    'CREATED',
    '{"year": "2023"}'::JSONB
WHERE EXISTS (SELECT 1 FROM kg_nodes WHERE label = 'OpenAI')
AND EXISTS (SELECT 1 FROM kg_nodes WHERE label = 'GPT-4');

-- Create update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_kg_nodes_updated_at BEFORE UPDATE ON kg_nodes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kg_edges_updated_at BEFORE UPDATE ON kg_edges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =================================================================
-- ROW LEVEL SECURITY (Optional but recommended)
-- =================================================================

-- Enable RLS on tables
ALTER TABLE kg_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE kg_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth strategy)
-- For now, we'll create permissive policies for demo purposes
CREATE POLICY "Enable all access for authenticated users" ON kg_nodes
    FOR ALL USING (true);

CREATE POLICY "Enable all access for authenticated users" ON kg_edges
    FOR ALL USING (true);

CREATE POLICY "Enable all access for authenticated users" ON documents
    FOR ALL USING (true);

CREATE POLICY "Enable all access for authenticated users" ON document_chunks
    FOR ALL USING (true);