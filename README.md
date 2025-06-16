# DWY Tool Calling LLM Agent - Complete Project Deliverable
**Organized AI // Vibe Coders Hackathon**

## 🎯 **Project Overview**

The **DWY (Do With You) Tool Calling LLM Agent** is the comprehensive deliverable for the Organized AI // Vibe Coders Hackathon. Built through six progressive workshops, participants create a complete AI agent capable of tool calling, persistent memory, content generation, and local deployment.

**Event**: June 21st-22nd  
**Participants**: 80 business leaders, developers, and AI enthusiasts  
**Format**: Progressive workshop series building toward complete AI agent  

---

## 🚀 **Quick Start Options**

### **🎓 For Complete Beginners**
**Start here if you're new to coding or AI development:**

1. **Read the [Beginner Setup Guide](docs/beginner-setup-guide.md)** - Complete walkthrough from zero to running code
2. **Try Workshop 1 Template** - Learn one concept at a time:
   ```bash
   cd templates/workshop1-template
   npm install && npm start
   ```
3. **Follow the [Cursor AI Tutorial](docs/cursor-ai-tutorial.md)** - Master AI-assisted development

### **🤖 For the Complete Experience**
**See everything working together:**

1. **Clone and run the complete agent**:
   ```bash
   cd reference-implementation/complete-agent
   npm install && npm start
   ```
2. **Read [project_overview.md](project_overview.md)** - Understand the full architecture
3. **Explore individual workshops** in the `workshops/` directory

### **🛠️ For Experienced Developers**
**Jump straight into building:**

1. **Review the [platform integrations](docs/platform-integrations.md)**
2. **Check out the [complete agent implementation](reference-implementation/complete-agent/)**
3. **Customize workshop components** for your specific needs

---

## 📁 **Repository Structure**

```
dwy-tool-calling-llm-agent/
├── 📄 project_overview.md                    # Complete project vision & architecture
├── 📁 workshops/                             # 6 workshop documentation files
│   ├── workshop1_project_planning_systems.md
│   ├── workshop2_knowledge_graph_implementation.md
│   ├── workshop3_marketing_ai_services.md
│   ├── workshop4_ai_video_generation.md
│   ├── workshop5_tool_calling_mcp_integration.md
│   └── workshop6_local_ai_deployment.md
├── 📁 reference-implementation/               # Working code examples
│   ├── 📁 complete-agent/                   # ✨ Full integrated DWY agent
│   │   ├── src/agent.js                     # Main orchestrator
│   │   ├── src/workshops/                   # Individual workshop components
│   │   ├── package.json & .env.example     # Easy setup
│   │   └── README.md                        # Detailed implementation guide
│   └── docker-compose.yml                   # Container setup
├── 📁 templates/                             # 🎯 Standalone workshop starters
│   ├── 📁 workshop1-template/               # Project planning starter
│   │   ├── index.js                         # Complete standalone example
│   │   ├── package.json                     # Ready to run
│   │   └── README.md                        # Step-by-step guide
│   ├── 📁 workshop2-template/               # Knowledge graph starter
│   └── 📁 project-starter/                  # Basic project template
├── 📁 docs/                                 # 📚 Comprehensive documentation
│   ├── beginner-setup-guide.md             # Complete beginner walkthrough
│   ├── cursor-ai-tutorial.md               # Master AI-assisted development
│   ├── setup-guide.md                       # Technical setup instructions
│   ├── platform-integrations.md             # Partner platform guides
│   └── troubleshooting.md                   # Common issues & solutions
└── README.md                                # This overview file
```

---

## 🏗️ **Progressive Workshop Architecture**

### **Layer Stack** (Built Progressively)
```
┌─────────────────────────────────────────────────────────────┐
│                    AI Core Layer (Workshop 6)              │
│              Local AI Model (Ollama + WebAI.com)           │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                Integration Layer (Workshop 5)              │
│           MCP Protocol + Tool Calling (Toolhouse.ai)       │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                 Content Layer (Workshop 4)                 │
│            AI Video Generation (Texel.ai)                  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                Business Layer (Workshop 3)                 │
│        Marketing AI Services (Sindarin.tech Voice AI)      │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                Memory Layer (Workshop 2)                   │
│      Knowledge Graph System (Penumbra.ai + Neo4j)         │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│               Foundation Layer (Workshop 1)                │
│     Project Planning Systems (DeepInvent.ai + GitHub)      │
└─────────────────────────────────────────────────────────────┘
```

### **Workshop Progression & Key Platforms**

| Workshop | Focus | Platform | Template | Duration |
|----------|-------|----------|----------|----------|
| 1 | Project Planning Systems | [DeepInvent.ai](https://deepinvent.ai/) | ✅ Ready | 30 min |
| 2 | Knowledge Graph Implementation | [Penumbra.ai](https://www.getpenumbra.ai/) | 🚧 In Progress | 30 min |
| 3 | Marketing AI Services | [Sindarin.tech](https://www.sindarin.tech/) | 📋 Planned | 30 min |
| 4 | AI Video Generation | [Texel.ai](https://texel.ai/) | 📋 Planned | 30 min |
| 5 | Tool Calling & MCP Integration | [Toolhouse.ai](https://toolhouse.ai) | 📋 Planned | 30 min |
| 6 | Local AI Deployment | [WebAI.com](https://www.webai.com/) | 📋 Planned | 30 min |

---

## 🏗️ **Technical Architecture**

### **Overall System Architecture**

```
┌─────────────────────────────────────────────────────────────────┐
│                    DWY Tool Calling LLM Agent                  │
│                        Complete System                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │  MCP Server     │    │  Knowledge      │
│                 │    │                 │    │  Graph          │
│  React/Next.js  │◄──►│  Tool Registry  │◄──►│                 │
│  Port 3000      │    │  API Gateway    │    │  Neo4j          │
│                 │    │  Port 8000      │    │  Port 7474      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Local AI      │    │  External APIs  │    │   File Storage  │
│                 │    │                 │    │                 │
│  Ollama Models  │    │  • DeepInvent   │    │  • Projects     │
│  Port 11434     │    │  • Penumbra     │    │  • Videos       │
│                 │    │  • Sindarin     │    │  • Documents    │
│                 │    │  • Texel        │    │  • Logs         │
│                 │    │  • Toolhouse    │    │  • Backups      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Progressive Workshop Build Flow**

```
Workshop 1: Foundation
┌─────────────────────────────────────┐
│  Project Planning & Architecture    │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   Systems   │  │ Architectural│   │
│  │  Thinking   │  │  Decision    │   │
│  │             │  │  Framework   │   │
│  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐   │
│  │ DeepInvent  │  │  Component  │   │
│  │ Innovation  │  │   Design    │   │
│  │ Protection  │  │             │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
              │
              ▼
Workshop 2: Memory Layer
┌─────────────────────────────────────┐
│   Knowledge Graph & Memory          │
│  ┌─────────────┐  ┌─────────────┐   │
│  │    Neo4j    │  │  Penumbra   │   │
│  │  Database   │  │     AI      │   │
│  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   Memory    │  │  Context    │   │
│  │  Manager    │  │  Retention  │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
              │
              ▼
Workshop 3: Business Context
┌─────────────────────────────────────┐
│    Marketing AI & Strategy          │
│  ┌─────────────┐  ┌─────────────┐   │
│  │  Sindarin   │  │   Pricing   │   │
│  │  Voice AI   │  │   Models    │   │
│  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐   │
│  │     ROI     │  │  Customer   │   │
│  │ Calculator  │  │ Acquisition │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
              │
              ▼
Workshop 4: Content Generation
┌─────────────────────────────────────┐
│     AI Video & Content              │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   Texel     │  │    Brand    │   │
│  │  Video AI   │  │ Validation  │   │
│  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   Content   │  │ Automation  │   │
│  │  Pipeline   │  │  Workflows  │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
              │
              ▼
Workshop 5: MCP Integration
┌─────────────────────────────────────┐
│    MCP Server Setup & Use Cases     │
│  ┌─────────────┐  ┌─────────────┐   │
│  │ Toolhouse   │  │     MCP     │   │
│  │  Platform   │  │   Server    │   │
│  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐   │
│  │  Production │  │   Security  │   │
│  │ Deployment  │  │ & Auth      │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
              │
              ▼
Workshop 6: Local Deployment
┌─────────────────────────────────────┐
│      Local AI & Privacy             │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   WebAI     │  │   Ollama    │   │
│  │ Optimization│  │   Models    │   │
│  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   Local     │  │  Security   │   │
│  │ Deployment  │  │   & Privacy │   │
│  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────┘
```

### **Data Flow Architecture**

```
User Input
    │
    ▼
┌─────────────────┐
│   Frontend UI   │ ◄─── User Interface
│                 │      • Form inputs
│  • Chat Interface      • File uploads
│  • Project Forms       • Configuration
│  • Video Player        • Status displays
└─────────────────┘
    │
    ▼
┌─────────────────┐
│   MCP Server    │ ◄─── API Gateway & Orchestration
│                 │      • Request routing
│  • Tool Router         • Authentication
│  • Request Parser      • Rate limiting
│  • Response Handler    • Error handling
└─────────────────┘
    │
    ├─────────────────────┬─────────────────────┬─────────────────────┐
    ▼                     ▼                     ▼                     ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│Project      │    │Memory       │    │Marketing    │    │Video        │
│Planning     │    │Management   │    │AI           │    │Generation   │
│             │    │             │    │             │    │             │
│• DeepInvent │    │• Neo4j      │    │• Sindarin   │    │• Texel      │
│• Systems    │    │• Penumbra   │    │• ROI Calc   │    │• Brand Val  │
│• Architecture│   │• Context    │    │• Pricing    │    │• Templates  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
    │                     │                     │                     │
    └─────────────────────┼─────────────────────┼─────────────────────┘
                          │                     │
                          ▼                     ▼
                    ┌─────────────┐    ┌─────────────┐
                    │Knowledge    │    │External     │
                    │Graph        │    │APIs         │
                    │             │    │             │
                    │• Entities   │    │• Platform   │
                    │• Relations  │    │  APIs       │
                    │• Context    │    │• Webhooks   │
                    │• History    │    │• Storage    │
                    └─────────────┘    └─────────────┘
                          │                     │
                          └──────────┬──────────┘
                                     ▼
                          ┌─────────────────┐
                          │   Local AI      │ ◄─── Processing Engine
                          │                 │      • Model inference
                          │  • Ollama       │      • Context synthesis
                          │  • WebAI        │      • Response generation
                          │  • Local Models │      • Privacy protection
                          └─────────────────┘
```

### **MCP Server Architecture Detail**

```
┌─────────────────────────────────────────────────────────────────┐
│                        MCP Server Core                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Tool Layer    │    │  Resource Layer │    │  Prompt Layer   │
│                 │    │                 │    │                 │
│ • project_plan  │    │ • file_system   │    │ • business_plan │
│ • create_memory │    │ • knowledge_db  │    │ • video_script  │
│ • generate_video│    │ • model_cache   │    │ • marketing_copy│
│ • voice_synth   │    │ • api_endpoints │    │ • patent_claims │
│ • patent_search │    │ • user_sessions │    │ • system_prompts│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    JSON-RPC 2.0 Protocol                       │
│                                                                 │
│  Request:                        Response:                      │
│  {                              {                               │
│    "jsonrpc": "2.0",              "jsonrpc": "2.0",            │
│    "method": "tools/call",        "id": 1,                     │
│    "params": {                    "result": {                  │
│      "name": "generate_video",      "content": [              │
│      "arguments": {...}               {                       │
│    },                                   "type": "text",       │
│    "id": 1                              "text": "Video..."    │
│  }                                    }                       │
│                                     ]                         │
│                                   }                           │
│                                 }                             │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Claude Desktop Integration                   │
│                                                                 │
│  • Automatic tool discovery                                    │
│  • Type-safe parameter validation                              │
│  • Real-time capability updates                                │
│  • Context-aware tool selection                                │
│  • Session state management                                    │
└─────────────────────────────────────────────────────────────────┘
```

### **Knowledge Graph Schema**

```
                    ┌─────────────┐
                    │   Person    │
                    │             │
                    │ • id        │
                    │ • name      │
                    │ • email     │
                    │ • role      │
                    └─────────────┘
                           │
                    PARTICIPATES_IN
                           │
                           ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Project   │◄──►│Conversation │◄──►│    Task     │
│             │    │             │    │             │
│ • id        │    │ • id        │    │ • id        │
│ • title     │    │ • timestamp │    │ • title     │
│ • status    │    │ • topic     │    │ • status    │
│ • timeline  │    │ • context   │    │ • priority  │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
   CONTAINS            GENERATES           DEPENDS_ON
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Resource   │    │  Decision   │    │   Memory    │
│             │    │             │    │             │
│ • id        │    │ • id        │    │ • id        │
│ • type      │    │ • choice    │    │ • content   │
│ • quantity  │    │ • confidence│    │ • type      │
│ • cost      │    │ • timestamp │    │ • relevance │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
   REQUIRES            INFLUENCES          RELATES_TO
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│Innovation   │    │   Tool      │    │   Context   │
│             │    │             │    │             │
│ • id        │    │ • name      │    │ • id        │
│ • concept   │    │ • version   │    │ • scope     │
│ • patent_id │    │ • api_url   │    │ • metadata  │
│ • status    │    │ • auth_type │    │ • timestamp │
└─────────────┘    └─────────────┘    └─────────────┘
```

### **Deployment Architecture**

```
Development Environment
┌─────────────────────────────────────────────────────────────────┐
│                     Local Development                          │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Cursor    │  │   Claude    │  │   Docker    │             │
│  │     IDE     │  │  Desktop    │  │  Compose    │             │
│  │             │  │             │  │             │             │
│  │ • Code Gen  │  │ • MCP       │  │ • Neo4j     │             │
│  │ • AI Assist │  │ • Tools     │  │ • Ollama    │             │
│  │ • Debugging │  │ • Chat      │  │ • Services  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                                │
                       docker-compose up
                                │
                                ▼
Production Environment
┌─────────────────────────────────────────────────────────────────┐
│                    Container Orchestration                      │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Frontend   │  │  MCP Server │  │  Knowledge  │             │
│  │  Container  │  │  Container  │  │    Graph    │             │
│  │             │  │             │  │  Container  │             │
│  │ React App   │  │ • Tools     │  │             │             │
│  │ Port 3000   │  │ • APIs      │  │   Neo4j     │             │
│  │             │  │ Port 8000   │  │ Port 7474   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Local AI   │  │   Storage   │  │   Reverse   │             │
│  │  Container  │  │  Container  │  │    Proxy    │             │
│  │             │  │             │  │             │             │
│  │   Ollama    │  │ • Files     │  │   Nginx     │             │
│  │ Port 11434  │  │ • Logs      │  │   Port 80   │             │
│  │             │  │ • Backups   │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### **Security & Privacy Architecture**

```
Security Layers
┌─────────────────────────────────────────────────────────────────┐
│                         Layer 4: Application Security          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Input     │  │   Output    │  │    Data     │             │
│  │ Validation  │  │ Sanitization│  │ Encryption  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                         Layer 3: API Security                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    Rate     │  │    Auth     │  │   Request   │             │
│  │  Limiting   │  │   Tokens    │  │ Validation  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                         Layer 2: Network Security              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    TLS      │  │  Firewall   │  │    VPN      │             │
│  │ Encryption  │  │    Rules    │  │   Access    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                         Layer 1: Infrastructure Security       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Container   │  │   Local     │  │    Host     │             │
│  │ Isolation   │  │  Storage    │  │   Security  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎓 **Learning Paths**

### **🆕 Complete Beginner (Never coded before)**
1. **[Beginner Setup Guide](docs/beginner-setup-guide.md)** (15 minutes)
2. **[Workshop 1 Template](templates/workshop1-template/)** (30 minutes)
3. **[Cursor AI Tutorial](docs/cursor-ai-tutorial.md)** (20 minutes)
4. **Try more workshop templates** as they become available
5. **Build the complete agent** when ready

### **🛠️ Some Programming Experience**
1. **[Project Overview](project_overview.md)** (10 minutes)
2. **[Complete Agent](reference-implementation/complete-agent/)** (20 minutes)
3. **Pick workshop templates** that interest you
4. **[Platform Integrations Guide](docs/platform-integrations.md)** for real APIs
5. **Customize and extend** for your specific needs

### **🚀 Experienced Developer**
1. **[Complete Agent Implementation](reference-implementation/complete-agent/src/agent.js)** (5 minutes)
2. **Review workshop components** in `src/workshops/`
3. **[Platform Integration Docs](docs/platform-integrations.md)** for API details
4. **Start building** your own features immediately
5. **Contribute** improvements back to the project

---

## 🔗 **Key Platform Partners**

| Platform | Purpose | Workshop | Status |
|----------|---------|----------|---------|
| [DeepInvent.ai](https://deepinvent.ai/) | Patent Applications & Innovation | 1 | ✅ Integrated |
| [Penumbra.ai](https://www.getpenumbra.ai/) | Thought Organization & Memory | 2 | 🚧 In Progress |
| [Sindarin.tech](https://www.sindarin.tech/) | Voice AI & Customer Communication | 3 | 📋 Ready for Integration |
| [Texel.ai](https://texel.ai/) | Video Generation & Content Creation | 4 | 📋 Ready for Integration |
| [Toolhouse.ai](https://toolhouse.ai) | Tool Calling & MCP Protocol | 5 | 📋 Ready for Integration |
| [WebAI.com](https://www.webai.com/) | Local AI Deployment Resources | 6 | 📋 Ready for Integration |

---

## 🤖 **Final Agent Capabilities**

The complete DWY Tool Calling LLM Agent includes:

- ✅ **Project Management & Innovation**: AI-enhanced planning with patent application support
- ✅ **Persistent Memory & Context**: Knowledge graph-based memory system  
- ✅ **Marketing & Customer Engagement**: Voice AI and automated marketing strategies
- ✅ **Content Creation**: AI video generation and brand management
- ✅ **Tool Integration**: External API and business system connectivity
- ✅ **Privacy-Focused Processing**: Local AI deployment without cloud dependencies

---

## 📚 **Documentation Index**

### **🎯 Getting Started**
- **[Beginner Setup Guide](docs/beginner-setup-guide.md)** - Zero to running code in 15 minutes
- **[Cursor AI Tutorial](docs/cursor-ai-tutorial.md)** - Master AI-assisted development
- **[Setup Guide](docs/setup-guide.md)** - Technical setup instructions

### **🏗️ Architecture & Design**
- **[Project Overview](project_overview.md)** - Complete project vision and architecture
- **[Platform Integrations](docs/platform-integrations.md)** - Partner platform guides
- **[Complete Agent README](reference-implementation/complete-agent/README.md)** - Implementation details

### **🔧 Troubleshooting & Support**
- **[Troubleshooting Guide](docs/troubleshooting.md)** - Common issues and solutions
- **Workshop-specific READMEs** in each template directory

---

## 🎪 **Perfect for Hackathon Participants**

### **Designed for https://lu.ma/Organizedai Attendees**
- ✅ **Beginner-friendly** with complete tutorials
- ✅ **Cursor IDE optimized** for AI-assisted development
- ✅ **Demo modes** work without API keys
- ✅ **Progressive complexity** from simple to advanced
- ✅ **Real platform integrations** with cutting-edge AI services
- ✅ **Complete working examples** you can run immediately

### **Multiple Entry Points**
- **Workshop Templates**: Learn one concept at a time
- **Complete Agent**: See everything working together
- **Documentation**: Understand before building
- **Platform Guides**: Connect to real AI services

---

## 📞 **Support & Contact**

### **Event Information**
- **Event Coordinator**: Jordan Hill (jordan@bluehlighlightedtext.com)
- **Technical Director**: Jake O'Shea (jake.oshea@antler.co)
- **Emergency Support**: Allie Mullen (allie.mullen@antler.co)

### **Getting Help**
- **GitHub Issues**: Report bugs or ask questions
- **Workshop Documentation**: Detailed guides in each directory
- **Cursor AI**: Use built-in AI assistance for code help
- **Platform Support**: Each platform has dedicated documentation

---

## 🤝 **Contributing**

This project is designed for the Organized AI // Vibe Coders Hackathon. Contributions, improvements, and extensions are welcome!

### **Ways to Contribute**
- **Complete workshop templates** for Workshops 2-6
- **Add platform integrations** and examples
- **Improve documentation** and tutorials
- **Share your custom implementations**
- **Report issues** and suggest improvements

---

## 📄 **License**

This project is open source and available under the MIT License.

---

**🚀 The DWY Tool Calling LLM Agent represents the cutting edge of practical AI implementation, combining business intelligence, creative capabilities, and privacy-focused deployment into a single, powerful system that participants can immediately deploy and customize for their specific business needs.**

**Ready to build the future of AI applications? Choose your starting point above and begin your journey! 🎉**