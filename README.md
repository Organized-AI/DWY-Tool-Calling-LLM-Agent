# DWY Tool Calling LLM Agent
**Organized AI // Vibe Coders Hackathon**

The DWY (Do With You) Tool Calling LLM Agent is the comprehensive deliverable for the Organized AI // Vibe Coders Hackathon. Built through six progressive workshops, participants create a complete AI agent capable of tool calling, persistent memory, content generation, and local deployment.

**Event**: June 21st-22nd  
**Participants**: 80 business leaders, developers, and AI enthusiasts  
**Format**: Progressive workshop series building toward complete AI agent  

## 🚀 Quick Start

### For Beginners
Start here if you're new to coding or AI development:
- Read the [Beginner Setup Guide](docs/beginner-setup-guide.md) - Complete walkthrough from zero to running code
- Try [Workshop 1 Template](templates/workshop1-template/) - Learn one concept at a time
- Follow the [Cursor AI Tutorial](docs/cursor-ai-tutorial.md) - Master AI-assisted development

### For Developers
See everything working together:
- Clone and run the [Complete Agent](reference-implementation/complete-agent/) 
- Read [project_overview.md](project_overview.md) - Understand the full architecture
- Explore individual workshops in the `workshops/` directory

### For Advanced Users
Jump straight into building:
- Review the [Platform Integrations](docs/platform-integrations.md)
- Check out the [Complete Agent Implementation](reference-implementation/complete-agent/)
- Customize workshop components for your specific needs

## 📁 Project Structure

```
dwy-tool-calling-llm-agent/
├── 📄 project_overview.md              # Complete project vision & architecture
├── 📁 workshops/                       # 6 workshop documentation files
│   ├── workshop1_project_planning_systems.md
│   ├── workshop2_knowledge_graph_implementation.md
│   ├── workshop3_marketing_ai_services.md
│   ├── workshop4_ai_video_generation.md
│   ├── workshop5_tool_calling_mcp_integration.md
│   └── workshop6_local_ai_deployment.md
├── 📁 reference-implementation/         # Working code examples
│   ├── 📁 complete-agent/              # ✨ Full integrated DWY agent
│   │   ├── src/agent.js                # Main orchestrator
│   │   ├── src/workshops/              # Individual workshop components
│   │   ├── package.json & .env.example # Easy setup
│   │   └── README.md                   # Detailed implementation guide
│   └── docker-compose.yml              # Container setup
├── 📁 templates/                       # 🎯 Standalone workshop starters
│   ├── 📁 workshop1-template/          # Project planning starter
│   │   ├── index.js                    # Complete standalone example
│   │   ├── package.json                # Ready to run
│   │   └── README.md                   # Step-by-step guide
│   ├── 📁 workshop2-template/          # Knowledge graph starter
│   └── 📁 project-starter/             # Basic project template
├── 📁 docs/                           # 📚 Comprehensive documentation
│   ├── beginner-setup-guide.md        # Complete beginner walkthrough
│   ├── cursor-ai-tutorial.md          # Master AI-assisted development
│   ├── setup-guide.md                 # Technical setup instructions
│   ├── platform-integrations.md       # Partner platform guides
│   └── troubleshooting.md             # Common issues & solutions
└── README.md                          # This overview file
```

## 🏗️ Progressive Workshop Architecture

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

## 🎓 Workshop Overview

| Workshop | Focus | Platform | Template | Duration |
|----------|-------|----------|----------|----------|
| 1 | Project Planning Systems | [DeepInvent.ai](https://deepinvent.ai/) | [Template](templates/workshop1-template/) | 30 min |
| 2 | Knowledge Graph & Memory | [Penumbra.ai](https://www.getpenumbra.ai/) | [Template](templates/workshop2-template/) | 30 min |
| 3 | Marketing AI Services | [Sindarin.tech](https://www.sindarin.tech/) | [Template](templates/workshop3-template/) | 30 min |
| 4 | AI Video Generation | [Texel.ai](https://texel.ai/) | [Template](templates/workshop4-template/) | 30 min |
| 5 | Tool Calling & MCP | [Toolhouse.ai](https://toolhouse.ai) | [Template](templates/workshop5-template/) | 30 min |
| 6 | Local AI Deployment | [WebAI.com](https://www.webai.com/) | [Template](templates/workshop6-template/) | 30 min |

## 🎯 Learning Paths

### Beginner Path (65 minutes total)
- [Beginner Setup Guide](docs/beginner-setup-guide.md) (15 minutes)
- [Workshop 1 Template](templates/workshop1-template/) (30 minutes)
- [Cursor AI Tutorial](docs/cursor-ai-tutorial.md) (20 minutes)

### Intermediate Path (50 minutes total)
- [Project Overview](project_overview.md) (10 minutes)
- [Complete Agent](reference-implementation/complete-agent/) (20 minutes)
- Try workshop templates of interest (20 minutes)

### Advanced Path (30 minutes total)
- [Platform Integrations Guide](docs/platform-integrations.md) (10 minutes)
- [Complete Agent Implementation](reference-implementation/complete-agent/src/agent.js) (5 minutes)
- Start building custom features (15 minutes)

## 🔗 Platform Partners

| Platform | Purpose | Workshop | Status |
|----------|---------|----------|--------|
| [DeepInvent.ai](https://deepinvent.ai/) | Patent Applications | 1 | ✅ Integrated |
| [Penumbra.ai](https://www.getpenumbra.ai/) | Thought Organization | 2 | ✅ Integrated |
| [Sindarin.tech](https://www.sindarin.tech/) | Voice AI | 3 | ✅ Integrated |
| [Texel.ai](https://texel.ai/) | Video Generation | 4 | ✅ Integrated |
| [Toolhouse.ai](https://toolhouse.ai) | Tool Calling | 5 | ✅ Integrated |
| [WebAI.com](https://www.webai.com/) | Local AI | 6 | ✅ Integrated |

## ✅ Final Agent Capabilities

The complete DWY Tool Calling LLM Agent includes:
- ✅ **Project Management & Innovation**: AI-enhanced planning with patent application support
- ✅ **Persistent Memory & Context**: Knowledge graph-based memory system
- ✅ **Marketing & Customer Engagement**: Voice AI and automated marketing strategies
- ✅ **Content Creation**: AI video generation and brand management
- ✅ **Tool Integration**: External API and business system connectivity
- ✅ **Privacy-Focused Processing**: Local AI deployment without cloud dependencies

## 📚 Documentation

- [Beginner Setup Guide](docs/beginner-setup-guide.md) - Zero to running code in 15 minutes
- [Cursor AI Tutorial](docs/cursor-ai-tutorial.md) - Master AI-assisted development
- [Setup Guide](docs/setup-guide.md) - Technical setup instructions
- [Project Overview](project_overview.md) - Complete project vision and architecture
- [Platform Integrations](docs/platform-integrations.md) - Partner platform guides
- [Complete Agent README](reference-implementation/complete-agent/README.md) - Implementation details
- [Troubleshooting Guide](docs/troubleshooting.md) - Common issues and solutions
- Workshop-specific READMEs in each template directory

## 🎯 Designed for [Organized AI // Vibe Coders Hackathon](https://lu.ma/Organizedai) Attendees

- ✅ Beginner-friendly with complete tutorials
- ✅ Cursor IDE optimized for AI-assisted development
- ✅ Demo modes work without API keys
- ✅ Progressive complexity from simple to advanced
- ✅ Real platform integrations with cutting-edge AI services
- ✅ Complete working examples you can run immediately

## 🚀 Get Started Now

Choose your path:
- **Workshop Templates**: Learn one concept at a time
- **Complete Agent**: See everything working together
- **Documentation**: Understand before building
- **Platform Guides**: Connect to real AI services

## 📞 Support

- **Event Coordinator**: Jordan Hill ([jordan@bluehlighlightedtext.com](mailto:jordan@bluehlighlightedtext.com))
- **Technical Director**: Jake O'Shea ([jake.oshea@antler.co](mailto:jake.oshea@antler.co))
- **Emergency Support**: Allie Mullen ([allie.mullen@antler.co](mailto:allie.mullen@antler.co))

- **GitHub Issues**: Report bugs or ask questions
- **Workshop Documentation**: Detailed guides in each directory
- **Cursor AI**: Use built-in AI assistance for code help
- **Platform Support**: Each platform has dedicated documentation

## 🤝 Contributing

This project is designed for the Organized AI // Vibe Coders Hackathon. Contributions, improvements, and extensions are welcome!

- Complete workshop templates for Workshops 2-6
- Add platform integrations and examples
- Improve documentation and tutorials
- Share your custom implementations
- Report issues and suggest improvements

## 📄 License

This project is open source and available under the MIT License.

---

🚀 **The DWY Tool Calling LLM Agent represents the cutting edge of practical AI implementation, combining business intelligence, creative capabilities, and privacy-focused deployment into a single, powerful system that participants can immediately deploy and customize for their specific business needs.**

**Ready to build the future of AI applications? Choose your starting point above and begin your journey!** 🎉
