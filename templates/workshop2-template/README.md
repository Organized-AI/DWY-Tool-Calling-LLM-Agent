# 🧠 Knowledge Graph AI Starter Kit

Build powerful AI applications that combine vector search with knowledge graphs - without needing Neo4j or complex infrastructure!

![Knowledge Graph AI Demo](./docs/demo.gif)

## ✨ What You'll Build

A fully-functional AI application demonstrating three powerful RAG patterns:

- **🔍 Vector RAG**: Traditional semantic search through documents
- **🕸️ Graph RAG**: Navigate and build knowledge graphs for structured reasoning  
- **🚀 Hybrid RAG**: Combine both approaches for superior results

Perfect for hackathons, prototypes, and production applications!

## 🎯 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/elsheppo/kg-ai-starter
cd kg-ai-starter

# 2. Set up environment
cp .env.local.example .env.local
# Edit .env.local with your OpenAI and Supabase credentials

# 3. Set up Supabase database (REQUIRED!)
# - Go to your Supabase project's SQL Editor
# - Copy everything from supabase/schema.sql
# - Paste and run it to create tables and functions
# 
# ⚠️ IMPORTANT: The schema must be run BEFORE npm setup!
# If you modify schema.sql later, you must manually update 
# your database - the seed script only inserts data, it does
# NOT update table structures or functions.

# 4. Install dependencies and load demo data
npm run setup
# This runs both npm install and npm run seed

# 5. Start the app!
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and try the example queries! 🎉

## ⚠️ Important Database Setup Note

This starter kit uses Supabase's SQL schema for the knowledge graph. The schema (tables, functions, indexes) must be created through Supabase's SQL Editor **before** running the seed script.

**Key points:**
- `npm run setup` only inserts demo data - it does NOT create or update database structures
- If you modify `supabase/schema.sql`, you must manually run the changes in Supabase
- This is intentional - it gives you full control over your database schema
- For production apps, consider implementing a proper migration system

## 🛠️ What's Included

### Core Features
- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **AI Integration**: OpenAI GPT-4, real embeddings, streaming responses
- **Knowledge Graph**: Built on PostgreSQL/Supabase (no graph DB needed!)
- **Interactive UI**: Real-time graph visualization, chat interface, mode switching
- **Production Ready**: Error handling, TypeScript, proper architecture

### Three RAG Patterns Explained

#### 1. Vector RAG (Traditional)
```typescript
// Searches documents using semantic similarity
"Tell me about Mars exploration"
→ Finds relevant document chunks
→ Returns contextualized answer
```

#### 2. Graph RAG (Structured)
```typescript
// Navigates knowledge relationships
"Show connections between NASA and SpaceX"
→ Traverses graph nodes and edges
→ Visualizes relationship network
```

#### 3. Hybrid RAG (Best of Both)
```typescript
// Combines vector search with graph navigation
"Find Mars documents and show concept relationships"
→ Searches documents AND builds graph
→ Provides rich, structured insights
```

## 🚀 Workshop Demo Flow

### 1. **Opening Hook** (2 min)
Show the three modes in action:
```bash
# Vector Mode: "What is the Artemis program?"
# Graph Mode: "Create a knowledge graph of space organizations"
# Hybrid Mode: "Show all Mars-related content and connections"
```

### 2. **Architecture Overview** (3 min)
- No graph database required - just PostgreSQL!
- Embeddings for semantic search
- Graph stored as nodes + edges tables
- Real-time updates via streaming

### 3. **Live Coding** (10 min)
Build a new feature together:
```typescript
// Add a new tool to the API
summarizeGraph: tool({
  description: 'Summarize the knowledge graph',
  parameters: z.object({ maxNodes: z.number() }),
  execute: async ({ maxNodes }) => {
    // Your code here!
  }
})
```

### 4. **Customization** (5 min)
Show how to:
- Add new node types
- Create custom tools
- Modify the UI
- Extend the graph schema

## 📁 Project Structure

```
kg-ai-starter/
├── app/
│   ├── api/chat/route.ts    # AI endpoint with tools
│   └── page.tsx              # Main UI
├── components/
│   ├── chat-interface.tsx    # AI chat UI
│   ├── graph-visualization.tsx # Interactive graph
│   └── example-queries.tsx   # Demo queries
├── lib/
│   └── supabase.ts          # Database client
├── scripts/
│   └── seed-data.ts         # Demo data loader
└── supabase/
    └── schema.sql           # Graph database schema
```

## 🔧 Environment Setup

### 1. Get API Keys

**OpenAI**: 
- Go to [platform.openai.com](https://platform.openai.com)
- Create an API key
- Add to `.env.local`

**Supabase**:
1. Create project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your project
3. Create new query
4. Copy entire contents of `supabase/schema.sql`
5. Run it (this creates all tables and functions)
6. Get your project URL and anon key from Settings → API
7. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

### 2. Load Demo Data

```bash
npm run seed
```

**Note**: This MUST be run AFTER setting up the database schema!

This loads:
- 10 space exploration nodes (NASA, SpaceX, Mars, etc.)
- 10 relationships between them
- 3 searchable documents with embeddings

## 🎮 Usage Examples

### Vector Mode Queries
- "Tell me about Laika the space dog"
- "What are the latest space technologies?"
- "Explain the Artemis moon program"

### Graph Mode Queries
- "Show all connections to Mars"
- "Create a node for Blue Origin"
- "What connects NASA and SpaceX?"

### Hybrid Mode Queries
- "Find all Mars content and visualize connections"
- "Build a graph from space exploration documents"
- "Show technology relationships with supporting docs"

## 🏗️ Extending the Starter Kit

### Add New Tools

```typescript
// In app/api/chat/route.ts
myCustomTool: tool({
  description: 'Your tool description',
  parameters: z.object({
    param: z.string()
  }),
  execute: async ({ param }) => {
    // Your logic here
    return { result: 'data' }
  }
})
```

### Add Node Types

```typescript
// New node type in schema
type NodeType = 'concept' | 'person' | 'technology' | 'your-type'

// Custom styling in graph-visualization.tsx
const nodeColors = {
  'your-type': '#yourcolor'
}
```

### Customize UI

The UI uses shadcn/ui components - modify any component in `/components/ui/`

## 🐛 Troubleshooting

### "Mock embeddings" warning
- Make sure your OpenAI API key is set correctly
- Check you have API credits available

### Graph not updating
- Ensure the updateGraph tool is called after changes
- Check browser console for errors

### Database errors
- Verify Supabase credentials
- Run the schema.sql file in Supabase SQL editor
- Check RLS policies are disabled for demo

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch
3. Submit a PR with description

## 📚 Resources

- [Tutorial Document](./TUTORIAL.md) - Complete build guide

## 🙏 Credits

Built with:
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Supabase](https://supabase.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Flow](https://reactflow.dev)

## 📄 License

MIT License - use this for anything!

---

**Ready to build?** Star ⭐ this repo and [follow me](https://linkedin.com/in/shepbryan) for more AI tutorials!

Made with 💜 for the developer community