# DWY Tool Calling LLM Agent - Starter Framework
**Build Your Own AI Agent Step by Step**

## 🎯 **What This Is**

This is your **empty DWY agent** that you'll build into a powerful AI system during the hackathon! Instead of using pre-built code, you'll implement each component yourself through guided workshops.

**Perfect for:** Hackathon participants who want to **learn by building** rather than just using existing code.

---

## 🚀 **Quick Start (2 minutes)**

### **1. Setup**
```bash
cd starter-framework
npm install
```

### **2. Start Your Empty Agent**
```bash
npm start
```

### **3. See What You Haven't Built Yet**
Visit: http://localhost:3000/health

You'll see:
```json
{
  "status": "building",
  "implementedWorkshops": 0,
  "nextTodo": "Complete Workshop 1: Project Planning"
}
```

### **4. Try to Use It (Should Fail)**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Help me plan a project"}'
```

**Result:** Error message because you haven't built anything yet!

---

## 🏗️ **The Building Experience**

### **How This Works**
1. **Start with an empty framework** (src/agent.js with TODOs)
2. **Each workshop teaches you to build one component**
3. **Your agent gets more powerful after each workshop**
4. **By the end, you have a complete AI agent you built yourself!**

### **Progressive Building Flow**

#### **Before Any Workshops**
```bash
curl localhost:3000/chat -d '{"message": "help"}'
# Response: "I'm not built yet! Complete Workshop 1 to give me abilities."
```

#### **After Workshop 1** ✅
```bash
curl localhost:3000/chat -d '{"message": "plan my mobile app"}'  
# Response: "I created a project plan for you! Mobile App Project..."
```

#### **After Workshop 3** ✅✅✅
```bash
curl localhost:3000/chat -d '{"message": "plan and market my startup"}'
# Response: Uses planning + memory + marketing to create comprehensive strategy
```

#### **After All 6 Workshops** ✅✅✅✅✅✅
```bash
curl localhost:3000/chat -d '{"message": "create a business plan with video pitch"}'
# Response: Complete AI agent using all 6 workshop components!
```

---

## 📁 **What You're Building**

### **Your Agent Structure**
```
starter-framework/
├── src/
│   ├── agent.js                     # 🤖 Main agent (has TODOs for you to complete)
│   └── workshops/                   # 📚 Empty workshop files you'll implement
│       ├── workshop1-planning.js    # 🚧 Build project planning capabilities
│       ├── workshop2-memory.js      # 🚧 Add knowledge graph memory
│       ├── workshop3-marketing.js   # 🚧 Add marketing AI services  
│       ├── workshop4-content.js     # 🚧 Add video generation
│       ├── workshop5-tools.js       # 🚧 Add tool calling
│       └── workshop6-ai.js          # 🚧 Add local AI processing
├── package.json                     # Dependencies for building
└── README.md                        # This guide
```

### **Workshop Building Progression**

| Workshop | You'll Build | Platform | Time | Status |
|----------|-------------|----------|------|---------|
| 1 | Project Planning Systems | DeepInvent.ai | 30 min | 🚧 Ready to build |
| 2 | Knowledge Graph Memory | Penumbra.ai + Neo4j | 30 min | 🚧 Ready to build |
| 3 | Marketing AI Services | Sindarin.tech | 30 min | 🚧 Ready to build |
| 4 | Video Content Generation | Texel.ai | 30 min | 🚧 Ready to build |
| 5 | Tool Calling & MCP | Toolhouse.ai | 30 min | 🚧 Ready to build |
| 6 | Local AI Processing | WebAI.com + Ollama | 30 min | 🚧 Ready to build |

---

## 🎓 **Workshop Guides**

Each workshop has a **step-by-step building guide** that teaches you to implement one component:

### **📋 [Workshop 1: Build Project Planning](../workshop-guides/workshop1-build-planning.md)**
**What you'll build:** AI-enhanced project planning with DeepInvent.ai integration
**Time:** 30 minutes  
**Result:** Your agent can create detailed project plans!

### **🧠 Workshop 2: Build Knowledge Graph Memory** *(Coming Soon)*
**What you'll build:** Persistent memory system using Neo4j and Penumbra.ai  
**Time:** 30 minutes  
**Result:** Your agent remembers everything and connects information!

### **📢 Workshop 3: Build Marketing AI Services** *(Coming Soon)*  
**What you'll build:** Voice AI and marketing strategy using Sindarin.tech
**Time:** 30 minutes  
**Result:** Your agent can create marketing strategies and communicate via voice!

### **🎬 Workshop 4: Build Video Generation** *(Coming Soon)*
**What you'll build:** AI video creation using Texel.ai
**Time:** 30 minutes  
**Result:** Your agent can create marketing videos and content!

### **🔧 Workshop 5: Build Tool Calling** *(Coming Soon)*
**What you'll build:** External API integration using Toolhouse.ai and MCP
**Time:** 30 minutes  
**Result:** Your agent can use any external tool or API!

### **🏠 Workshop 6: Build Local AI** *(Coming Soon)*
**What you'll build:** Local AI processing using Ollama and WebAI.com  
**Time:** 30 minutes  
**Result:** Your agent processes everything locally with privacy!

---

## 🔍 **Monitoring Your Progress**

### **Check What You've Built**
```bash
# See your implementation progress
curl http://localhost:3000/health
```

### **Test Individual Workshops**
```bash
# Check Workshop 1 status
curl http://localhost:3000/workshop1

# Check Workshop 2 status  
curl http://localhost:3000/workshop2

# etc.
```

### **Watch Your Agent Grow**
After each workshop, test your agent:
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What can you do now?"}'
```

The response will show which capabilities you've implemented!

---

## 🆘 **Need Help? You Have Options!**

### **🤖 Use Cursor AI for Coding Help**
```
"Help me implement the createPlan function for project planning"
```

```
"I'm getting this error: [paste error]. How do I fix it?"
```

```
"Explain what this code does and how I can extend it"
```

### **📚 Reference the Working Example**
If you get stuck, check out the complete working example:
```bash
# See how it should work when complete
cd ../reference-implementation/complete-agent
npm install && npm start
```

### **🔄 Progressive Checkpoints** *(Coming Soon)*
Each workshop will have a checkpoint showing the working code up to that point.

---

## 🎯 **Why Build Instead of Use?**

### **✅ Building Approach (This Framework)**
- **You understand every line** because you wrote it
- **Complete ownership** of your AI agent
- **Can customize anything** because you know how it works
- **Impressive portfolio project** showing real skills
- **Deep learning** of AI development concepts
- **Confidence to build more** AI applications

### **❌ Using Pre-Built Code**
- Black box - you don't understand the internals
- Limited customization options
- Less impressive for portfolios
- Surface-level understanding
- Dependency on others' implementations

---

## 🎪 **Perfect for Hackathon Learning**

### **Designed for Beginners**
- ✅ **Clear step-by-step guides** for each workshop
- ✅ **Working examples** to reference when stuck
- ✅ **Demo modes** that work without API keys
- ✅ **Cursor AI integration** for coding assistance
- ✅ **Immediate feedback** after each workshop

### **Scalable for All Levels**
- **Beginners:** Follow guides exactly, learn fundamentals
- **Intermediate:** Add custom features using Cursor AI
- **Advanced:** Extend with your own workshop components

---

## 🚀 **Ready to Start Building?**

### **Next Steps:**
1. **Make sure your agent is running**: `npm start`
2. **Open the first workshop guide**: [Workshop 1: Build Project Planning](../workshop-guides/workshop1-build-planning.md)
3. **Follow the 30-minute guide** to implement your first component
4. **Test your new capabilities** and see your agent come to life!

### **By the End of the Hackathon**
You'll have built a complete AI agent that can:
- 🎯 Plan projects with AI assistance
- 🧠 Remember everything with persistent memory
- 📢 Create marketing strategies and communicate via voice
- 🎬 Generate video content automatically
- 🔧 Call external tools and APIs
- 🏠 Process everything locally for privacy

**🎉 Start building your AI agent masterpiece!**