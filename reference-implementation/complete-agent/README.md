# DWY Tool Calling LLM Agent - Complete Implementation
**Perfect for Cursor IDE and Beginner Developers**

## 🎯 **What This Is**

This is the **complete reference implementation** of the DWY (Do With You) Tool Calling LLM Agent from the Organized AI // Vibe Coders Hackathon. It shows you exactly how all 6 workshops integrate into one powerful AI agent.

**Built for beginners using Cursor IDE** - every file is documented and designed for AI-assisted development.

---

## 🚀 **Quick Start (5 minutes)**

### **1. Clone & Setup**
```bash
# In your terminal
cd reference-implementation/complete-agent
npm install
cp .env.example .env
```

### **2. Start the Agent**
```bash
npm start
```

### **3. Test It**
Visit: http://localhost:3000/health

You should see:
```json
{
  "status": "healthy",
  "agent": "DWY Tool Calling LLM Agent",
  "workshops": 6,
  "timestamp": "2025-06-11T17:35:00Z"
}
```

**🎉 You're running the complete DWY agent!**

---

## 📚 **How the 6 Workshops Connect**

### **Workshop Integration Flow**
```
User Message → Agent → All 6 Workshops → Unified Response

┌─ Workshop 1: Project Planning ────┐
├─ Workshop 2: Knowledge Graph ────┤
├─ Workshop 3: Marketing AI ───────┤  ──→  DWY Agent  ──→  Response
├─ Workshop 4: Video Generation ───┤
├─ Workshop 5: Tool Calling ───────┤
└─ Workshop 6: Local AI ───────────┘
```

### **What Each Workshop Does**

| Workshop | File | Purpose | Platform |
|----------|------|---------|----------|
| 1 | `workshop1-planning.js` | Project planning & workflow | DeepInvent.ai |
| 2 | `workshop2-memory.js` | Knowledge graph memory | Penumbra.ai + Neo4j |
| 3 | `workshop3-marketing.js` | Marketing & voice AI | Sindarin.tech |
| 4 | `workshop4-content.js` | Video content generation | Texel.ai |
| 5 | `workshop5-tools.js` | Tool calling & MCP | Toolhouse.ai |
| 6 | `workshop6-ai.js` | Local AI processing | WebAI.com + Ollama |

---

## 🧭 **For Cursor IDE Users**

### **AI-Assisted Development**
This codebase is designed to work perfectly with Cursor's AI features:

1. **Ask Cursor to explain any file**:
   ```
   "Explain what workshop1-planning.js does and how I can modify it"
   ```

2. **Get help adding features**:
   ```
   "Help me add a new planning feature to workshop1-planning.js that tracks project milestones"
   ```

3. **Understand the integration**:
   ```
   "Show me how agent.js processes a message through all workshops"
   ```

### **Beginner-Friendly Features**
- ✅ **Demo Mode**: Works without API keys for learning
- ✅ **Clear Comments**: Every function explained
- ✅ **Simple Structure**: Easy to follow logic
- ✅ **Error Handling**: Graceful fallbacks
- ✅ **Modular Design**: Each workshop is independent

---

## 🔧 **Development Workflow**

### **Adding Your Own Features**
1. **Pick a workshop** to modify (start with Workshop 1)
2. **Ask Cursor for help**: "Help me add [feature] to this workshop"
3. **Test your changes**: Use the individual workshop endpoints
4. **See it in action**: Send a message to `/chat` endpoint

### **Individual Workshop Testing**
Each workshop has its own endpoint for testing:

```bash
# Test Workshop 1: Project Planning
curl -X POST http://localhost:3000/workshop1/plan \
  -H "Content-Type: application/json" \
  -d '{"projectName": "My App", "description": "A cool app idea"}'

# Test Workshop 2: Memory
curl -X POST http://localhost:3000/workshop2/remember \
  -H "Content-Type: application/json" \
  -d '{"type": "note", "content": "This is a test memory"}'

# Test the complete agent
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Help me plan a new project for a mobile app"}'
```

---

## 📁 **Project Structure**

```
complete-agent/
├── src/
│   ├── agent.js                     # 🤖 Main agent (orchestrates everything)
│   └── workshops/                   # 📚 Individual workshop components
│       ├── workshop1-planning.js    # 🎯 Project planning (DeepInvent.ai)
│       ├── workshop2-memory.js      # 🧠 Knowledge graph (Penumbra.ai)
│       ├── workshop3-marketing.js   # 📢 Marketing AI (Sindarin.tech)
│       ├── workshop4-content.js     # 🎬 Video generation (Texel.ai)
│       ├── workshop5-tools.js       # 🔧 Tool calling (Toolhouse.ai)
│       └── workshop6-ai.js          # 🏠 Local AI (WebAI.com)
├── package.json                     # Dependencies and scripts
├── .env.example                     # Configuration template
└── README.md                        # This file!
```

---

## 🎓 **Learning Path for Beginners**

### **Phase 1: Understand the Structure (15 mins)**
1. Open `src/agent.js` and read the comments
2. Look at `src/workshops/workshop1-planning.js` 
3. Ask Cursor: *"Explain how these files work together"*

### **Phase 2: Test the Agent (10 mins)**
1. Start the agent: `npm start`
2. Visit http://localhost:3000/health
3. Test a workshop endpoint (see examples above)

### **Phase 3: Make Your First Change (20 mins)**
1. Pick Workshop 1 (project planning)
2. Ask Cursor to help you add a new feature
3. Test your change with the workshop endpoint
4. See how it affects the main `/chat` endpoint

### **Phase 4: Connect Platform APIs (30+ mins)**
1. Get API keys for the platforms you want to use
2. Add them to your `.env` file
3. Test the real integrations
4. Build your own custom features

---

## 🔗 **Platform API Setup**

### **Workshop 1: DeepInvent.ai** 
```bash
# Add to .env
DEEPINVENT_API_KEY=your-key-here
```
[Get API Key →](https://deepinvent.ai/)

### **Workshop 2: Penumbra.ai + Neo4j**
```bash
# Add to .env  
PENUMBRA_API_KEY=your-key-here
NEO4J_URI=bolt://localhost:7687
NEO4J_PASSWORD=your-password
```
[Get Penumbra Key →](https://www.getpenumbra.ai/) | [Install Neo4j →](https://neo4j.com/download/)

### **Workshop 3: Sindarin.tech**
```bash
# Add to .env
SINDARIN_API_KEY=your-key-here
```
[Get API Key →](https://www.sindarin.tech/)

### **Workshop 4: Texel.ai**
```bash
# Add to .env
TEXEL_API_KEY=your-key-here
```
[Get API Key →](https://texel.ai/)

### **Workshop 5: Toolhouse.ai**
```bash
# Add to .env
TOOLHOUSE_API_KEY=your-key-here
```
[Get API Key →](https://toolhouse.ai)

### **Workshop 6: WebAI.com + Ollama**
```bash
# Install Ollama first
curl -fsSL https://ollama.ai/install.sh | sh

# Then add to .env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:latest
```
[Install Ollama →](https://ollama.ai/) | [Visit WebAI.com →](https://www.webai.com/)

---

## 🐛 **Common Issues & Solutions**

### **"Module not found" errors**
```bash
# Make sure you installed dependencies
npm install
```

### **Port 3000 already in use**
```bash
# Change port in .env file
PORT=3001
```

### **API key errors**
- Check your `.env` file
- Make sure you copied `.env.example` to `.env`
- Verify your API keys are correct
- **Note**: Agent works in demo mode without API keys!

### **Workshop component errors**
- Check that all workshop files exist in `src/workshops/`
- Look at the console for specific error messages
- Ask Cursor: *"Help me fix this error: [paste error message]"*

---

## 🎯 **Next Steps**

### **For Hackathon Participants**
1. **Customize the workshops** for your specific use case
2. **Add new features** using Cursor's AI assistance
3. **Connect real API keys** to see full functionality
4. **Build your own workshop** following the existing patterns

### **For Advanced Users**
1. **Scale the agent** with more sophisticated error handling
2. **Add databases** for persistent storage
3. **Implement authentication** and user management
4. **Deploy to production** using Docker or cloud platforms

---

## 🤝 **Getting Help**

### **Using Cursor IDE**
- **Ask specific questions**: "How do I add a new tool to workshop5-tools.js?"
- **Request explanations**: "Explain the processMessage function in agent.js"
- **Get code help**: "Help me fix this API integration"

### **Community Support**
- **GitHub Issues**: Report bugs or ask questions
- **Hackathon Discord**: Connect with other participants
- **Workshop Leaders**: Reach out to individual workshop instructors

---

**🚀 Ready to build your own AI agent? Start with `npm start` and let Cursor guide you!**