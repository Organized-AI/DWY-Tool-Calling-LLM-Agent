# Workshop 2: Knowledge Graph Implementation
**Presenter: Shep**  
**Duration: 30 minutes**  
**Memory Layer**

## 🎯 Learning Objective

Participants will create a functional knowledge graph system for AI memory and data relationships, improving AI context retention and decision-making accuracy while building the persistent memory foundation for the tool calling LLM agent.

## 🧠 Memory Architecture

This workshop establishes the **Memory Layer** of our tool calling LLM agent:

```
┌─────────────────────────────────────────────────────────────┐
│                Memory Layer (Workshop 2)                   │
│      Knowledge Graph System (Penumbra.ai + Neo4j)         │
│                                                             │
│  • Neo4j Knowledge Graph Database                           │
│  • Thought Organization via Penumbra.ai                     │
│  • Context Retention Mechanisms                             │
│  • Decision History Tracking                                │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Key Technologies & Tools

### Primary Platform Integration
- **[Penumbra.ai](https://www.getpenumbra.ai/)** - Connecting and organizing thoughts
- **Neo4j** - Graph database for knowledge storage
- **Cypher** - Query language for graph data
- **Graph Visualization** - Tools for memory system visualization

## 📋 Workshop Content Structure

### 1. Learning Objective (2 minutes)
**Clear, Measurable Outcome:**
- Implement Neo4j knowledge graph for persistent AI memory
- Integrate Penumbra.ai for thought organization and connection
- Create context retention mechanisms for conversation history
- Build decision tracking system for AI agent learning

### 2. Concept Introduction (5 minutes)
**Theory and Business Context:**
- **Knowledge Graphs vs Traditional Databases**: Relationship-first data modeling
- **AI Memory Systems**: How persistent context improves AI performance
- **Thought Organization**: Connecting ideas and concepts across domains
- **Decision Tracking**: Learning from past decisions to improve future ones

### 3. Live Demonstration (10 minutes)
**Step-by-Step Implementation:**

#### Neo4j Setup
```bash
# 1. Neo4j Database Setup
docker run \
  --name neo4j-memory \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password123 \
  -v neo4j_data:/data \
  neo4j:latest

# 2. Access Neo4j Browser
open http://localhost:7474
```

#### Knowledge Graph Schema
```cypher
// Core Entity Types for AI Agent Memory
CREATE CONSTRAINT FOR (p:Person) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT FOR (c:Conversation) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT FOR (d:Decision) REQUIRE d.id IS UNIQUE;
CREATE CONSTRAINT FOR (t:Task) REQUIRE t.id IS UNIQUE;
CREATE CONSTRAINT FOR (i:Innovation) REQUIRE i.id IS UNIQUE;

// Sample Data Creation
CREATE (p:Person {
  id: 'user_001',
  name: 'Workshop Participant',
  role: 'AI Developer',
  preferences: ['local AI', 'privacy-focused', 'business applications']
});
```

#### Penumbra.ai Integration
```javascript
// Thought Organization System
class ThoughtOrganizer {
  constructor(penumbraApi) {
    this.penumbra = penumbraApi;
    this.neo4j = new Neo4jDriver();
  }
  
  async organizeThought(thought, context) {
    // Use Penumbra.ai to analyze thought connections
    const connections = await this.penumbra.analyzeConnections(thought);
    
    // Store in Neo4j with relationships
    const thoughtNode = await this.neo4j.createThought({
      content: thought,
      context: context,
      connections: connections,
      timestamp: new Date()
    });
    
    return thoughtNode;
  }
}
```

### 4. Hands-on Practice (8 minutes)
**Participant Implementation with Guidance:**

#### Task 1: Database Setup (3 minutes)
- Start Neo4j container
- Access browser interface
- Create basic schema

#### Task 2: Memory Integration (3 minutes)
- Connect to Penumbra.ai
- Implement thought organization
- Test memory storage and retrieval

#### Task 3: Context System (2 minutes)
- Create conversation context tracking
- Test decision history functionality
- Verify memory persistence

### 5. Q&A & Integration (5 minutes)
**Questions and Connection to Overall Project:**
- How does the knowledge graph connect to project planning from Workshop 1?
- Integration with marketing AI memory in Workshop 3?
- Supporting tool calling context in Workshop 5?

## 🎯 Deliverable Components

### 1. Neo4j Knowledge Graph Database
```cypher
// Complete Schema for AI Agent Memory
CREATE CONSTRAINT FOR (p:Person) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT FOR (c:Conversation) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT FOR (d:Decision) REQUIRE d.id IS UNIQUE;
CREATE CONSTRAINT FOR (t:Task) REQUIRE t.id IS UNIQUE;
CREATE CONSTRAINT FOR (i:Innovation) REQUIRE i.id IS UNIQUE;
CREATE CONSTRAINT FOR (proj:Project) REQUIRE proj.id IS UNIQUE;
CREATE CONSTRAINT FOR (tool:Tool) REQUIRE tool.id IS UNIQUE;
CREATE CONSTRAINT FOR (mem:Memory) REQUIRE mem.id IS UNIQUE;

// Indexes for Performance
CREATE INDEX FOR (m:Memory) ON (m.timestamp);
CREATE INDEX FOR (c:Conversation) ON (c.timestamp);
CREATE INDEX FOR (d:Decision) ON (d.confidence);
```

### 2. Memory Management Service
```javascript
// Comprehensive Memory Management
class MemoryManager {
  constructor(neo4jDriver, penumbraApi) {
    this.db = neo4jDriver;
    this.penumbra = penumbraApi;
    this.thoughtOrganizer = new ThoughtOrganizer(penumbraApi);
  }
  
  async storeConversation(conversation) {
    const session = this.db.session();
    
    try {
      const result = await session.run(`
        CREATE (c:Conversation {
          id: $id,
          timestamp: datetime(),
          topic: $topic,
          context: $context,
          participants: $participants
        })
        RETURN c
      `, conversation);
      
      // Process each message for thought connections
      for (const message of conversation.messages) {
        await this.thoughtOrganizer.organizeThought(
          message.content,
          conversation.context
        );
      }
      
      return result.records[0].get('c');
    } finally {
      await session.close();
    }
  }
  
  async getContextualMemory(query, conversationId) {
    // Retrieve contextually relevant memories
    const memories = await this.db.run(`
      MATCH (c:Conversation {id: $conversationId})
      MATCH (m:Memory)
      WHERE m.content CONTAINS $query
        OR EXISTS {
          MATCH (m)-[:RELATES_TO]->(topic)
          WHERE topic.name IN c.topics
        }
      OPTIONAL MATCH (m)-[r]->(related)
      RETURN m, collect(related) as context
      ORDER BY m.relevance_score DESC
      LIMIT 20
    `, { query, conversationId });
    
    return memories.records.map(record => ({
      memory: record.get('m'),
      context: record.get('context')
    }));
  }
}
```

## 🔗 Connection to Final Agent

### How This Workshop Contributes:
1. **Persistent Memory**: Provides the AI agent with long-term memory capabilities
2. **Context Awareness**: Enables the agent to maintain context across conversations
3. **Decision Tracking**: Allows the agent to learn from past decisions
4. **Thought Organization**: Connects ideas and concepts across different domains
5. **Relationship Mapping**: Creates a web of connected knowledge for better decision-making

### Integration Points:
- **Workshop 1**: Project planning data becomes entities and relationships in the knowledge graph
- **Workshop 3**: Marketing strategies and customer interactions are stored as connected memories
- **Workshop 4**: Video generation decisions and content relationships are tracked
- **Workshop 5**: Tool calling history and integration patterns are remembered
- **Workshop 6**: Local AI model performance and optimization decisions are stored

## 📚 Resources & Further Learning

### Documentation
- [Penumbra.ai Documentation](https://www.getpenumbra.ai/docs)
- [Neo4j Developer Guide](https://neo4j.com/developer/get-started/)
- [Cypher Query Language](https://neo4j.com/docs/cypher-manual/current/)

### Tools & Platforms
- **Penumbra.ai**: Thought organization and connection analysis
- **Neo4j**: Graph database for knowledge storage
- **Neo4j Browser**: Visualization and query interface
- **Graph Data Science Library**: Advanced graph algorithms

### Next Steps
- Test memory persistence across sessions
- Prepare for Workshop 3: Marketing AI Services integration
- Begin storing business logic and customer data
- Document memory patterns for tool calling integration

---

**This workshop creates the persistent memory foundation that transforms our AI agent from a stateless chatbot into an intelligent system that learns, remembers, and improves over time.**