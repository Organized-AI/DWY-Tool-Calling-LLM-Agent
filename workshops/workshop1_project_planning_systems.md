# Workshop 1: Project Planning Systems & Environment Setup
**Presenter: Jordaaan**  
**Duration: 45 minutes** (Extended to include setup)  
**Foundation Layer**

## 🎯 Learning Objective

Participants will establish a complete development environment and build AI-enhanced project planning and resource management systems, automating workflow optimization and progress tracking while establishing the foundation architecture for the complete tool calling LLM agent.

## 🛠️ Prerequisites & Environment Setup (15 minutes)

### Quick Start - Automated Setup
**Visit [organizedai.vip](https://organizedai.vip) and run the appropriate command:**

#### macOS
```bash
curl -fsSL https://raw.githubusercontent.com/Organized-AI/DWY-Tool-Calling-LLM-Agent/main/setup/scripts/hackathon-setup-mac.sh | bash
```

#### Windows (PowerShell as Administrator)
```powershell
irm https://raw.githubusercontent.com/Organized-AI/DWY-Tool-Calling-LLM-Agent/main/setup/scripts/hackathon-setup-windows.ps1 | iex
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://raw.githubusercontent.com/Organized-AI/DWY-Tool-Calling-LLM-Agent/main/setup/scripts/hackathon-setup-linux.sh | bash
```

### What Gets Installed
- **Node.js (LTS)** - JavaScript runtime
- **Python 3.9+** - AI/ML development
- **Git** - Version control
- **VS Code** - Primary IDE with AI extensions
- **Claude Desktop** - AI assistant integration
- **Project Dependencies** - All required packages

### Verification Commands
```bash
# Verify installation
node --version    # Should be v18+ or v20+
python3 --version # Should be 3.9+
git --version     # Any recent version
code --version    # Any recent version

# Navigate to project
cd ~/dwy-hackathon
```

## 🏗️ Architecture Foundation

This workshop establishes the **Foundation Layer** of our tool calling LLM agent:

```
┌─────────────────────────────────────────────────────────────┐
│               Foundation Layer (Workshop 1)                │
│     Project Planning Systems (DeepInvent.ai + GitHub)      │
│                                                             │
│  • Complete Development Environment                         │
│  • Project Architecture Design                              │
│  • Workflow Optimization Framework                          │
│  • Patent Application Integration                           │
│  • Tool Calling Infrastructure Setup                        │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Key Technologies & Tools

### Primary Platform Integration
- **[DeepInvent.ai](https://deepinvent.ai/)** - Quick patent application for AI innovations
- **GitHub** - Version control and collaboration
- **Project Management Frameworks** - Agile, Scrum, and AI-enhanced methodologies
- **Development Environment** - VS Code, Cursor, and Claude Desktop setup
- **MCP (Model Context Protocol)** - Tool calling infrastructure

## 📋 Workshop Content Structure

### 1. Environment Setup & Verification (5 minutes)
**Ensuring Everyone Is Ready:**

```bash
# Quick verification script
#!/bin/bash
echo "🔍 Verifying DWY Hackathon Environment..."

# Check all required tools
commands=("node" "npm" "python3" "git" "code")
for cmd in "${commands[@]}"; do
    if command -v $cmd &> /dev/null; then
        echo "✅ $cmd: $(command -v $cmd)"
    else
        echo "❌ $cmd: Not found"
    fi
done

# Check project structure
if [ -d "~/dwy-hackathon" ]; then
    echo "✅ Project directory: ~/dwy-hackathon"
    cd ~/dwy-hackathon
    if [ -f "package.json" ]; then
        echo "✅ Node.js project configured"
    fi
    if [ -f ".env.example" ]; then
        echo "✅ Environment template ready"
    fi
else
    echo "❌ Project directory not found"
fi

echo "🚀 Environment check complete!"
```

### 2. Project Architecture & Configuration (10 minutes)
**Step-by-Step Implementation:**

#### API Keys Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit with your API keys
code .env
```

Required API Keys:
```env
# Essential for tool calling
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here

# Tool calling configuration
ENABLE_TOOL_CALLING=true
MAX_TOOL_CALLS=10
MCP_SERVER_URL=http://localhost:8000
```

#### Project Structure Enhancement
```javascript
// Enhanced project structure
const projectStructure = {
  src: {
    frontend: "React UI components",
    backend: "Express API with tool calling",
    database: "Knowledge graph storage",
    shared: "Shared utilities and types",
    tools: "Custom tool implementations"
  },
  workshops: "Workshop guides and examples",
  templates: "Code templates for rapid development",
  docs: "Comprehensive documentation"
};
```

### 3. AI-Enhanced Project Planning Implementation (10 minutes)

#### DeepInvent.ai Integration
```javascript
// Project Innovation Tracker with Enhanced Capabilities
class InnovationManager {
  constructor() {
    this.apiKey = process.env.DEEPINVENT_API_KEY;
    this.innovations = new Map();
  }

  async trackInnovation(description, category) {
    // Integration with DeepInvent.ai API
    const patentableFeatures = await this.analyzePatentability(description);
    
    const innovation = {
      id: this.generateId(),
      description,
      category,
      timestamp: new Date(),
      patentPotential: patentableFeatures,
      toolCallCapabilities: this.assessToolCallValue(description),
      nextSteps: this.generatePatentStrategy(patentableFeatures)
    };

    this.innovations.set(innovation.id, innovation);
    
    return innovation;
  }

  assessToolCallValue(description) {
    // Assess how innovation enhances tool calling capabilities
    const toolCallKeywords = [
      'automation', 'api integration', 'workflow',
      'data processing', 'real-time', 'intelligent routing'
    ];
    
    const score = toolCallKeywords.reduce((acc, keyword) => {
      return acc + (description.toLowerCase().includes(keyword) ? 1 : 0);
    }, 0);

    return {
      score: score / toolCallKeywords.length,
      enhancesToolCalling: score > 2,
      suggestedTools: this.suggestToolIntegrations(description)
    };
  }
}
```

#### AI-Enhanced Workflow Optimizer
```javascript
// Tool-Calling Aware Project Planning
class AIProjectPlanner {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
    this.tools = new Map();
  }

  async optimizeWorkflow(tasks, resources, constraints) {
    // AI-driven optimization with tool calling awareness
    const optimizationPrompt = `
      Optimize this project workflow considering:
      - Available tool calling capabilities
      - Resource constraints: ${JSON.stringify(constraints)}
      - Tasks requiring automation: ${tasks.filter(t => t.automatable)}
      
      Focus on maximizing tool calling efficiency and AI agent capabilities.
    `;

    const response = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: optimizationPrompt
      }]
    });

    return this.parseOptimizationResponse(response.content);
  }

  parseOptimizationResponse(content) {
    // Parse AI response into actionable workflow optimization
    return {
      optimizedTasks: this.extractTasks(content),
      toolCallOpportunities: this.identifyToolCallOpportunities(content),
      automationRecommendations: this.extractAutomationSuggestions(content),
      timeline: this.generateTimeline(content),
      riskAssessment: this.assessRisks(content)
    };
  }
}
```

### 4. Tool Calling Infrastructure Setup (10 minutes)

#### MCP Protocol Configuration
```javascript
// Model Context Protocol setup for tool calling
class MCPManager {
  constructor() {
    this.serverUrl = process.env.MCP_SERVER_URL;
    this.tools = new Map();
    this.sessions = new Map();
  }

  async registerTool(toolName, toolConfig) {
    // Register custom tools for the AI agent
    this.tools.set(toolName, {
      name: toolName,
      description: toolConfig.description,
      parameters: toolConfig.parameters,
      handler: toolConfig.handler,
      enabled: true
    });

    console.log(`✅ Tool registered: ${toolName}`);
  }

  async callTool(toolName, parameters) {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`Tool not found: ${toolName}`);
    }

    try {
      const result = await tool.handler(parameters);
      return {
        success: true,
        result,
        toolName,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        toolName,
        timestamp: new Date()
      };
    }
  }
}
```

#### Essential Tool Implementations
```javascript
// Core tools for the DWY agent
const coreTools = {
  projectAnalyzer: {
    description: "Analyze project structure and suggest improvements",
    parameters: {
      projectPath: "string",
      analysisType: "string"
    },
    handler: async ({ projectPath, analysisType }) => {
      // Implement project analysis logic
      return await analyzeProject(projectPath, analysisType);
    }
  },

  workflowOptimizer: {
    description: "Optimize development workflows",
    parameters: {
      currentWorkflow: "object",
      constraints: "object"
    },
    handler: async ({ currentWorkflow, constraints }) => {
      // Implement workflow optimization
      return await optimizeWorkflow(currentWorkflow, constraints);
    }
  },

  innovationTracker: {
    description: "Track and analyze innovations for patent potential",
    parameters: {
      innovation: "string",
      category: "string"
    },
    handler: async ({ innovation, category }) => {
      // Implement innovation tracking
      return await trackInnovation(innovation, category);
    }
  }
};
```

### 5. Hands-on Practice (10 minutes)
**Participant Implementation with Guidance:**

#### Task 1: Complete Environment Verification (3 minutes)
```bash
# Run comprehensive environment check
cd ~/dwy-hackathon
npm run check-environment

# Test AI API connections
npm run test-apis

# Verify tool calling setup
npm run test-tools
```

#### Task 2: Initialize Your First Tool (4 minutes)
```javascript
// Create your first custom tool
const myFirstTool = {
  name: "hello-hackathon",
  description: "A simple greeting tool for the hackathon",
  parameters: {
    name: { type: "string", description: "Participant name" }
  },
  handler: async ({ name }) => {
    return {
      message: `Hello ${name}! Welcome to the DWY Tool-Calling LLM Agent Hackathon!`,
      timestamp: new Date(),
      nextSteps: [
        "Explore the project structure",
        "Set up your API keys",
        "Start building your agent"
      ]
    };
  }
};

// Register and test the tool
mcpManager.registerTool("hello-hackathon", myFirstTool);
const result = await mcpManager.callTool("hello-hackathon", { name: "Your Name" });
console.log(result);
```

#### Task 3: Innovation Tracking Integration (3 minutes)
```javascript
// Test the innovation tracking system
const testInnovation = {
  description: "AI-powered code review tool with automated suggestions",
  category: "developer-tools",
  author: "Your Name"
};

const tracked = await innovationManager.trackInnovation(
  testInnovation.description,
  testInnovation.category
);

console.log("Innovation tracked:", tracked);
```

## 🎯 Deliverable Components

### 1. Complete Development Environment
✅ All tools installed and configured  
✅ API keys set up and tested  
✅ Project structure initialized  
✅ VS Code workspace configured  

### 2. Tool Calling Infrastructure
✅ MCP protocol configured  
✅ Core tools registered  
✅ Tool calling tested and verified  

### 3. Innovation Management System
✅ DeepInvent.ai integration  
✅ Patent tracking functionality  
✅ Innovation assessment capabilities  

## 🔗 Connection to Final Agent

### How This Workshop Contributes:
1. **Development Environment**: Complete setup for all subsequent workshops
2. **Tool Calling Foundation**: Infrastructure that enables all AI agent capabilities
3. **Project Planning Logic**: Core algorithms for resource optimization
4. **Innovation Framework**: Patent tracking for AI developments
5. **Integration Architecture**: Prepared connection points for workshops 2-6

### Integration Points:
- **Workshop 2**: Project data feeds knowledge graph entities
- **Workshop 3**: Business planning supports marketing AI strategies  
- **Workshop 4**: Project workflows integrate with content creation
- **Workshop 5**: MCP protocol enables advanced tool calling
- **Workshop 6**: Foundation supports local AI model integration

## 📚 Resources & Further Learning

### Documentation
- [Setup Guide](../setup/README.md) - Detailed setup instructions
- [DeepInvent.ai Documentation](https://deepinvent.ai/docs)
- [MCP Protocol Guide](https://modelcontextprotocol.io/docs)

### Next Steps
1. ✅ Complete environment setup and verification
2. ✅ Configure API keys and test connections  
3. ✅ Register your first custom tool
4. ➡️ **Proceed to Workshop 2**: [Knowledge Graph Implementation](./workshop2_knowledge_graph_implementation.md)

---

**🎉 Congratulations!** You now have a complete development environment and the foundation for building an advanced tool-calling LLM agent. Every subsequent workshop builds upon this foundation to create increasingly sophisticated AI capabilities.

**Ready for Workshop 2?** Let's build the knowledge graph that will power your agent's intelligence! 🧠➡️