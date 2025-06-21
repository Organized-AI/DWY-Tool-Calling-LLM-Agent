# Workshop: Knowledge Graphs + AI (No Neo4j Required!)
**Presenter:** Shep from GetPenumbra.ai  
**Duration:** 30 minutes  
**Stack:** Next.js, Supabase (PostgreSQL), OpenAI

## 🎯 Learning Objective
Build a production-ready AI system that combines vector search with knowledge graphs for superior context and reasoning - all using PostgreSQL/Supabase (no graph database needed!).

## 🧠 What We're Actually Building

A complete RAG system with three modes:
1. **Vector RAG** - Traditional semantic search through documents
2. **Graph RAG** - Navigate relationships in a knowledge graph
3. **Hybrid RAG** - Combine both for the best results

### Architecture That Actually Works
```
┌─────────────────────────────────────────────────────────────┐
│                 Your AI Knowledge System                     │
├─────────────────────────────────────────────────────────────┤
│  Frontend:  Next.js 15 + React Flow (visualization)         │
│  Backend:   Supabase (PostgreSQL with pgvector)             │
│  AI:        OpenAI GPT-4o-mini + Embeddings                       │
│  Context:   Penumbra.ai (universal context layer)           │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Setup (5 minutes)

### Prerequisites
- Supabase account (free tier works)
- OpenAI API key
- Node.js installed

### Quick Start
```bash
# 1. Clone the starter
git clone https://github.com/elsheppo/kg-ai-starter
cd kg-ai-starter

# 2. Setup environment
cp .env.local.example .env.local
# Add your Supabase URL, anon key, and OpenAI key

# 3. Create database schema in Supabase SQL Editor
# Copy/paste contents of supabase/schema.sql

# 4. Install and seed
npm run setup

# 5. Start the app
npm run dev
```

## 💡 Live Demo (10 minutes)

### 1. Vector RAG - Find Information by Meaning
```
Try: "Tell me about Laika, the space dog"
```
- Watch how it searches documents semantically
- See citations showing which chunks were used
- Notice similarity scores proving it's RAG, not GPT knowledge

### 2. Graph RAG - Navigate Relationships
```
Try: "Show me how NASA connects to the ISS"
Try: "Show me all connections from SpaceX"
```
- See the knowledge graph update in real-time
- Traverse multi-hop relationships
- Only creates nodes when explicitly asked

### 3. Hybrid RAG - Best of Both Worlds
```
Try: "How do NASA and SpaceX relate to the ISS, and what documents mention this?"
```
- Combines document search + graph traversal
- Shows both types of citations
- Most comprehensive results

## 🔨 Hands-On: Build Your Own (10 minutes)

### Task 1: Extend the Knowledge Graph
```
In Graph mode, try:
- "Add Blue Origin to the graph as a company"
- "Connect Blue Origin to commercial space"
- "Create a relationship: Blue Origin competes with SpaceX"
```

### Task 2: Query Your Extended Graph
```
- "Show me all commercial space companies"
- "What connects to Blue Origin?"
- "Find the path from Blue Origin to Mars"
```

### Task 3: Add Context with Penumbra.ai
```javascript
// Integrate Penumbra for persistent context
import { PenumbraClient } from '@penumbra/sdk'

const penumbra = new PenumbraClient({
  apiKey: process.env.PENUMBRA_API_KEY
})

// Store conversation context
await penumbra.context.store({
  conversationId: session.id,
  entities: extractedNodes,
  relationships: extractedEdges,
  insights: aiResponse
})

// Retrieve relevant context
const context = await penumbra.context.retrieve({
  query: userQuestion,
  filters: { type: 'space_exploration' }
})
```

## 🎯 Key Takeaways

### Why This Approach?
1. **No Neo4j Required** - PostgreSQL with recursive CTEs works great
2. **Production Ready** - Supabase handles auth, hosting, scaling
3. **Real Citations** - Users see exactly where information comes from
4. **Flexible** - Easy to extend for any domain

### The Power of Hybrid RAG
- **Vector Search** finds what you don't know to look for
- **Graph Traversal** follows explicit relationships
- **Together** they provide comprehensive, explainable AI responses

### Penumbra.ai Integration
- Universal context layer for all your AI tools
- Maintains context across different systems
- Enables true memory and learning

## 📊 What You Can Build Next

1. **Domain-Specific Knowledge Graphs**
   - Customer relationships for sales
   - Code dependencies for development
   - Research connections for academics

2. **Multi-Modal Systems**
   - Add image embeddings to nodes
   - Connect videos to transcripts
   - Link audio to concepts

3. **Temporal Graphs**
   - Track how relationships change over time
   - Version your knowledge graph
   - Analyze trends and patterns

## 🔗 Resources

- **Starter Kit**: [github.com/elsheppo/kg-ai-starter](https://github.com/elsheppo/kg-ai-starter)
- **Penumbra.ai**: [getpenumbra.ai](https://getpenumbra.ai) - Universal context for AI
- **Tutorial**: See TUTORIAL.md for deep dive
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

## 💬 Q&A Topics
- How does this compare to LangGraph/LlamaIndex?
- Scaling considerations for production
- Integration with existing systems
- Advanced graph algorithms in PostgreSQL
- Penumbra.ai for cross-platform context

---

**Remember**: You don't need a graph database to build knowledge graphs! This approach gives you the power of GraphRAG with the simplicity of PostgreSQL.