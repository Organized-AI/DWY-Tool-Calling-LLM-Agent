# Workshop 2: Knowledge Graph Implementation
**Presenter**: Shep  
**Duration**: 30 minutes  
**Platform**: [Penumbra.ai](https://www.getpenumbra.ai/) + Neo4j

## 🎯 Learning Objectives

Create a functional knowledge graph system for AI memory and data relationships, improving context retention and decision-making accuracy.

### What You'll Learn
- Set up Neo4j graph database for persistent AI memory
- Implement data relationship modeling for business logic
- Create context retention and memory capture mechanisms
- Build decision support systems through connected data
- Integrate with Penumbra.ai for thought organization

### What You'll Build
- Neo4j knowledge graph database with business entities
- Memory capture system for AI conversations and decisions
- Context retrieval mechanisms for improved AI responses
- Relationship mapping for complex business logic
- Penumbra.ai integration for thought organization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Docker and Docker Compose (for Neo4j)
- Git configured on your system

### Run the Template
```bash
# Navigate to this template
cd workshop2-template

# Start Neo4j database
docker-compose up -d

# Install dependencies
npm install

# Run the knowledge graph system
npm start

# Open in browser
open http://localhost:3002
```

### Demo Mode
The template includes sample graph data so you can explore relationships immediately without external API dependencies.

## 📁 Template Structure

```
workshop2-template/
├── README.md                    # This guide
├── package.json                 # Dependencies and scripts
├── docker-compose.yml           # Neo4j database setup
├── .env.example                 # Environment variables template
├── index.js                     # Main application entry
├── src/
│   ├── knowledge-graph.js       # Core graph operations
│   ├── penumbra-client.js       # Penumbra.ai integration
│   ├── memory-manager.js        # AI memory and context
│   ├── relationship-mapper.js   # Business logic relationships
│   └── demo-data.js             # Sample graph data
├── cypher/
│   ├── schema.cypher           # Graph database schema
│   ├── constraints.cypher      # Database constraints
│   └── sample-data.cypher      # Initial data loading
├── public/
│   ├── index.html              # Graph visualization interface
│   ├── style.css               # Styling
│   └── graph-app.js            # Frontend graph visualization
└── docs/
    ├── setup-guide.md          # Detailed setup instructions
    ├── cypher-examples.md      # Query examples
    └── troubleshooting.md      # Common issues
```

## 🛠️ Core Features

### 1. Neo4j Knowledge Graph
- Entity and relationship modeling for business data
- Cypher query interface for graph traversal
- Real-time graph updates and synchronization
- Performance-optimized indexing and constraints

### 2. AI Memory System
- Conversation context persistence
- Decision history tracking
- Learning pattern recognition
- Context-aware response generation

### 3. Relationship Intelligence
- Business logic relationship mapping
- Dependency analysis and visualization
- Impact assessment for changes
- Recommendation engine based on graph patterns

### 4. Penumbra.ai Integration
- Thought organization and connection
- Idea clustering and relationship discovery
- Creative insight generation
- Knowledge synthesis across domains

## ⚙️ Configuration

### Environment Setup
Copy `.env.example` to `.env` and configure:

```bash
# Neo4j Database Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password123
NEO4J_DATABASE=neo4j

# Penumbra.ai Integration (optional for demo)
PENUMBRA_API_KEY=your_penumbra_api_key

# Application Configuration
PORT=3002
NODE_ENV=development
DEMO_MODE=true

# Graph Visualization
GRAPH_LAYOUT=force
MAX_NODES_DISPLAY=100
ENABLE_CLUSTERING=true
```

### Neo4j Database Setup
The template automatically sets up Neo4j using Docker:

```bash
# Start Neo4j container
docker-compose up -d

# Check Neo4j status
docker-compose ps

# View Neo4j logs
docker-compose logs neo4j

# Access Neo4j Browser
open http://localhost:7474
```

## 🎓 Step-by-Step Tutorial

### Step 1: Understanding Graph Concepts (5 minutes)
1. Open Neo4j Browser at http://localhost:7474
2. Login with username: `neo4j`, password: `password123`
3. Explore the sample data with: `MATCH (n) RETURN n LIMIT 25`
4. Understand nodes, relationships, and properties

### Step 2: Basic Graph Operations (10 minutes)
1. Create your first node: `CREATE (p:Person {name: "Your Name", role: "Developer"})`
2. Create relationships: `MATCH (p:Person) CREATE (p)-[:WORKS_ON]->(project:Project {name: "My AI Project"})`
3. Query relationships: `MATCH (p:Person)-[r:WORKS_ON]->(project) RETURN p, r, project`

### Step 3: AI Memory Integration (10 minutes)
1. Run the web application: `npm start`
2. Add a conversation memory through the web interface
3. Watch how it connects to existing knowledge
4. Query the memory graph to see relationships

### Step 4: Penumbra.ai Integration (5 minutes)
1. Configure Penumbra.ai API key (or use demo mode)
2. Submit thoughts and ideas for organization
3. See how thoughts connect to your knowledge graph
4. Explore generated insights and connections

## 🔧 API Integration Examples

### Creating Knowledge Graph Entities
```javascript
const { KnowledgeGraph } = require('./src/knowledge-graph');

const kg = new KnowledgeGraph({
  neo4j: {
    uri: process.env.NEO4J_URI,
    username: process.env.NEO4J_USERNAME,
    password: process.env.NEO4J_PASSWORD
  }
});

// Create a project entity
const project = await kg.createEntity('Project', {
  name: 'AI Marketing Tool',
  description: 'Automated marketing content generation',
  status: 'active',
  created_at: new Date().toISOString()
});

// Create relationships
await kg.createRelationship(project.id, 'USES_TECHNOLOGY', 'neo4j-ai-node', {
  since: '2025-01-01',
  confidence: 0.95
});
```

### AI Memory Operations
```javascript
const { MemoryManager } = require('./src/memory-manager');

const memory = new MemoryManager(kg);

// Store conversation context
await memory.storeConversation({
  user_message: "How can I optimize my project timeline?",
  ai_response: "Based on your project graph, I recommend...",
  context: {
    project_id: "proj-123",
    entities_referenced: ["Task", "Resource", "Timeline"],
    relationships_analyzed: ["DEPENDS_ON", "REQUIRES", "ASSIGNED_TO"]
  }
});

// Retrieve relevant context
const context = await memory.getRelevantContext({
  query: "project optimization",
  limit: 5,
  include_relationships: true
});
```

### Penumbra.ai Thought Organization
```javascript
const { PenumbraClient } = require('./src/penumbra-client');

const penumbra = new PenumbraClient(process.env.PENUMBRA_API_KEY);

// Organize thoughts and connect to knowledge graph
const thoughtAnalysis = await penumbra.organizeThoughts({
  thoughts: [
    "AI could automate task prioritization",
    "Resource conflicts are common in Q3",
    "User feedback drives feature prioritization"
  ],
  context: {
    domain: "project_management",
    graph_entities: ["Project", "Task", "Resource", "User"]
  }
});

// Store organized thoughts in knowledge graph
await kg.storeThoughtConnections(thoughtAnalysis);
```

## 📊 Graph Schema Design

### Core Entity Types
```cypher
// Project Management Entities
(:Project {name, description, status, created_at})
(:Task {title, description, priority, status, effort_hours})
(:Person {name, email, role, skills})
(:Resource {name, type, availability, cost})

// AI Memory Entities  
(:Conversation {timestamp, user_message, ai_response})
(:Decision {description, reasoning, outcome, confidence})
(:Context {domain, relevance_score, created_at})
(:Insight {content, confidence, source, validated})

// Knowledge Entities
(:Concept {name, definition, domain})
(:Pattern {description, frequency, accuracy})
(:Recommendation {content, reasoning, priority})
```

### Relationship Types
```cypher
// Project Relationships
(:Project)-[:CONTAINS]->(:Task)
(:Task)-[:DEPENDS_ON]->(:Task)
(:Person)-[:ASSIGNED_TO]->(:Task)
(:Task)-[:REQUIRES]->(:Resource)

// Memory Relationships
(:Conversation)-[:REFERENCES]->(:Project)
(:Decision)-[:AFFECTS]->(:Task)
(:Context)-[:RELATES_TO]->(:Entity)
(:Insight)-[:DERIVED_FROM]->(:Conversation)

// Knowledge Relationships
(:Concept)-[:RELATED_TO]->(:Concept)
(:Pattern)-[:APPLIES_TO]->(:Entity)
(:Recommendation)-[:BASED_ON]->(:Pattern)
```

## 🔍 Cypher Query Examples

### Find Project Dependencies
```cypher
MATCH (p:Project)-[:CONTAINS]->(t1:Task)-[:DEPENDS_ON]->(t2:Task)
RETURN p.name, t1.title, t2.title
ORDER BY p.name, t1.title
```

### Analyze AI Memory Patterns
```cypher
MATCH (c:Conversation)-[:REFERENCES]->(p:Project)
WHERE c.timestamp > datetime() - duration('P7D')
RETURN p.name, count(c) as conversation_count
ORDER BY conversation_count DESC
```

### Find Knowledge Connections
```cypher
MATCH (concept1:Concept)-[:RELATED_TO*1..3]-(concept2:Concept)
WHERE concept1.name = 'project_optimization'
RETURN concept1, concept2, 
       size((concept1)-[:RELATED_TO*1..3]-(concept2)) as connection_strength
ORDER BY connection_strength DESC
```

### Discover Insights from Patterns
```cypher
MATCH (p:Pattern)-[:APPLIES_TO]->(entity)
WHERE p.accuracy > 0.8
MATCH (r:Recommendation)-[:BASED_ON]->(p)
RETURN entity, p.description, r.content, p.accuracy
ORDER BY p.accuracy DESC
```

## 🎯 Learning Outcomes

After completing this workshop, you'll be able to:

✅ **Design and implement graph database schemas** for complex business relationships
✅ **Build AI memory systems** that persist context across conversations and sessions  
✅ **Create intelligent relationship mapping** for business logic and decision support
✅ **Integrate with Penumbra.ai** for advanced thought organization and insight generation
✅ **Query and analyze connected data** using Cypher and graph algorithms
✅ **Visualize complex relationships** in interactive, explorable interfaces

## 🔗 Integration with Other Workshops

This workshop provides the memory foundation for:
- **Workshop 1**: Store project planning decisions and optimizations
- **Workshop 3**: Retain marketing strategy context and customer insights  
- **Workshop 4**: Remember content creation patterns and brand guidelines
- **Workshop 5**: Persist tool usage patterns and integration preferences
- **Workshop 6**: Store local AI model performance and configuration data

## 🆘 Troubleshooting

### Common Issues

**Neo4j connection failed**
```bash
# Check if Neo4j is running
docker-compose ps

# Restart Neo4j container
docker-compose restart neo4j

# Check logs for errors
docker-compose logs neo4j
```

**Graph visualization not loading**
```bash
# Verify data exists
# In Neo4j Browser: MATCH (n) RETURN count(n)

# Check application logs
npm run dev

# Clear browser cache and reload
```

**Penumbra.ai API errors**
```bash
# Verify API key is correct
echo $PENUMBRA_API_KEY

# Switch to demo mode
export DEMO_MODE=true
npm start
```

**Memory queries slow**
```bash
# Create indexes for better performance
# In Neo4j Browser:
CREATE INDEX FOR (c:Conversation) ON (c.timestamp)
CREATE INDEX FOR (p:Project) ON (p.name)
CREATE INDEX FOR (t:Task) ON (t.status)
```

## 📚 Additional Resources

- [Neo4j Documentation](https://neo4j.com/docs/)
- [Cypher Query Language Guide](https://neo4j.com/docs/cypher-manual/current/)
- [Penumbra.ai Platform Guide](https://www.getpenumbra.ai/docs)
- [Graph Database Design Patterns](./docs/setup-guide.md)
- [Knowledge Graph Best Practices](./docs/cypher-examples.md)

## 🤝 Support

- **Workshop Questions**: Ask during the live session
- **Technical Issues**: Check [troubleshooting.md](./docs/troubleshooting.md)  
- **Platform Support**: Contact Penumbra.ai for API assistance
- **Neo4j Help**: Use Neo4j Community Forum for database questions

---

**Ready to build intelligent memory systems with knowledge graphs? Run `docker-compose up -d && npm start` and let's begin!** 🧠
