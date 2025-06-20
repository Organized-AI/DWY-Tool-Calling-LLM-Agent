# Workshop 5: Tool Calling & MCP Integration

**Presenter: Orlando**  
**Duration: 30 minutes**  
**Integration Layer**

## 🎯 Learning Objective

Participants will implement tool calling functionality and Model Context Protocol (MCP) integration, enabling the AI system to interact with external APIs and business systems while orchestrating all previous workshop components into a unified tool calling LLM agent.

## 🔧 Integration Architecture

This workshop establishes the **Integration Layer** of our tool calling LLM agent:

```
┌─────────────────────────────────────────────────────────────┐
│                Integration Layer (Workshop 5)              │
│           MCP Protocol + Tool Calling (Toolhouse.ai)       │
│                                                             │
│  • Model Context Protocol Implementation                    │
│  • External API Integration                                 │
│  • Business System Connectivity                            │
│  • Tool Orchestration Framework                            │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Key Technologies & Tools

### Primary Platform Integration

- **[Toolhouse.ai](https://toolhouse.ai)** - Comprehensive platform for tool calling
- **Model Context Protocol (MCP)** - Standard interface for AI tool integration
- **API Integration Frameworks** - RESTful and GraphQL API connectivity
- **Business System Connectors** - Enterprise system integration

## 📋 Workshop Content Structure

### 1. Learning Objective (2 minutes)

**Clear, Measurable Outcome:**

- Implement MCP protocol for standardized tool integration
- Connect to external APIs and business systems via Toolhouse.ai
- Create tool orchestration workflows that coordinate all workshop components
- Build comprehensive tool calling framework for the AI agent

### 2. Concept Introduction (5 minutes)

**Theory and Business Context:**

- **Model Context Protocol**: Standardizing AI-tool communication
- **Tool Calling Architecture**: How AI agents interact with external systems
- **Business System Integration**: Connecting AI to enterprise workflows
- **Tool Orchestration**: Coordinating multiple tools for complex tasks

### 3. Live Demonstration (10 minutes)

**Step-by-Step Implementation:**

#### MCP Server Setup

1. Register on Zapier.com
2. Navigate to mcp.zapier.com

#### Toolhouse.ai Integration

```javascript
// Comprehensive Tool Calling System
class ToolCallingSystem {
  constructor(mcpServer, toolhouseApi) {
    this.mcp = mcpServer;
    this.toolhouse = toolhouseApi;
    this.executionContext = new Map();
  }

  async executeToolChain(request, context) {
    // Parse tool calling request
    const toolChain = await this.parseToolChain(request);

    // Execute tools sequentially with context passing
    const results = [];
    let currentContext = context;

    for (const toolCall of toolChain) {
      const result = await this.executeTool(toolCall, currentContext);
      results.push(result);

      // Update context with tool result
      currentContext = this.updateContext(currentContext, result);

      // Store execution step in memory
      await this.mcp.memory.storeToolExecution({
        tool: toolCall.name,
        parameters: toolCall.parameters,
        result: result,
        context: currentContext,
        timestamp: new Date(),
      });
    }

    return {
      executionId: this.generateExecutionId(),
      results: results,
      finalContext: currentContext,
      performance: this.calculateExecutionMetrics(results),
    };
  }

  async executeTool(toolCall, context) {
    // Get tool from Toolhouse.ai or local registry
    const tool =
      (await this.toolhouse.getTool(toolCall.name)) ||
      this.mcp.tools.get(toolCall.name);

    if (!tool) {
      throw new Error(`Tool not found: ${toolCall.name}`);
    }

    try {
      // Execute tool with context and parameters
      const result = await tool.handler(toolCall.parameters, context);

      return {
        success: true,
        toolName: toolCall.name,
        result: result,
        executionTime: Date.now() - toolCall.startTime,
      };
    } catch (error) {
      return {
        success: false,
        toolName: toolCall.name,
        error: error.message,
        executionTime: Date.now() - toolCall.startTime,
      };
    }
  }
}
```

#### Tool Orchestration Framework

```javascript
// Advanced Tool Orchestration
class ToolOrchestrator {
  constructor(toolCallingSystem, memorySystem, projectPlanner) {
    this.tools = toolCallingSystem;
    this.memory = memorySystem;
    this.planner = projectPlanner;
    this.workflows = new Map();
  }

  async createComplexWorkflow(goal, resources, constraints) {
    // Analyze goal and break down into tool chain
    const workflow = await this.planWorkflow(goal, resources, constraints);

    // Execute workflow with monitoring
    const execution = await this.executeWorkflow(workflow);

    // Store workflow for future optimization
    await this.memory.storeWorkflow({
      goal: goal,
      workflow: workflow,
      execution: execution,
      success: execution.success,
      performance: execution.metrics,
    });

    return execution;
  }

  async planWorkflow(goal, resources, constraints) {
    // Use project planning capabilities to optimize tool sequence
    const optimizedPlan = await this.planner.optimizeWorkflow({
      objective: goal,
      availableTools: Array.from(this.tools.mcp.tools.keys()),
      resources: resources,
      constraints: constraints,
    });

    return {
      steps: optimizedPlan.steps,
      dependencies: optimizedPlan.dependencies,
      estimatedDuration: optimizedPlan.duration,
      riskAssessment: optimizedPlan.risks,
      fallbackOptions: optimizedPlan.fallbacks,
    };
  }

  async handleComplexRequest(request) {
    // Example: "Create a marketing video for our new AI product,
    // store the customer feedback in our knowledge graph,
    // and use voice AI to follow up with interested prospects"

    const decomposedTasks = await this.decomposeRequest(request);

    const workflow = {
      // Task 1: Generate marketing video
      videoGeneration: {
        tool: "video.generate",
        parameters: {
          content: decomposedTasks.videoContent,
          style: "professional",
          target_audience: decomposedTasks.targetAudience,
        },
      },

      // Task 2: Store customer data
      dataStorage: {
        tool: "memory.store",
        parameters: {
          content: decomposedTasks.customerFeedback,
          context: "customer_feedback",
          relationships: ["customer", "product", "feedback"],
        },
        dependsOn: ["videoGeneration"],
      },

      // Task 3: Voice AI follow-up
      voiceFollowUp: {
        tool: "voice.communicate",
        parameters: {
          message: decomposedTasks.followUpMessage,
          customer_context: "${dataStorage.result}",
          communication_style: "professional_friendly",
        },
        dependsOn: ["dataStorage"],
      },
    };

    return await this.executeWorkflow(workflow);
  }
}
```

### 4. Hands-on Practice (8 minutes)

**Participant Implementation with Guidance:**

#### Task 1: MCP Setup (3 minutes)

- Initialize MCP server
- Register workshop tools
- Test basic tool calling

#### Task 2: Toolhouse.ai Integration (3 minutes)

- Connect to Toolhouse.ai platform
- Test external tool access
- Verify tool orchestration

#### Task 3: Complex Workflow (2 minutes)

- Create multi-tool workflow
- Test tool chain execution
- Verify result integration

### 5. Q&A & Integration (5 minutes)

**Questions and Connection to Overall Project:**

- How does tool calling integrate with all previous workshop components?
- Preparation for local AI deployment in Workshop 6?
- Optimization opportunities for tool execution?

## 🎯 Deliverable Components

### 1. Complete MCP Server Implementation

```javascript
// Production-Ready MCP Server
class ProductionMCPServer {
  constructor(config) {
    this.config = config;
    this.tools = new Map();
    this.middleware = [];
    this.security = new SecurityManager(config.security);
    this.monitoring = new MonitoringSystem(config.monitoring);
  }

  async handleMCPRequest(request) {
    // Security validation
    await this.security.validateRequest(request);

    // Apply middleware
    for (const middleware of this.middleware) {
      request = await middleware.process(request);
    }

    // Route to appropriate handler
    const handler = this.getHandler(request.method);
    const result = await handler(request.params);

    // Monitor performance
    await this.monitoring.recordExecution({
      method: request.method,
      duration: result.executionTime,
      success: result.success,
    });

    return {
      jsonrpc: "2.0",
      id: request.id,
      result: result,
    };
  }

  // Workshop Integration Methods
  async createProject(params) {
    // Innovation tracking with DeepInvent.ai
    const patentAnalysis = await this.analyzePatentPotential(params.innovation);

    // Store in knowledge graph
    await this.storeMemory({
      content: params,
      context: "project_creation",
      relationships: ["project", "innovation", "patent"],
    });

    return {
      project: params,
      patentPotential: patentAnalysis,
      stored: true,
    };
  }

  async generateMarketingContent(params) {
    // Create video content
    const video = await this.generateVideo({
      content: params.content,
      style: params.style,
      target_audience: params.audience,
    });

    // Generate voice communication script
    const voiceScript = await this.voiceCommunicate({
      message: params.voiceMessage,
      customer_context: params.customerContext,
      communication_style: "professional",
    });

    // Store campaign in memory
    await this.storeMemory({
      content: { video, voiceScript },
      context: "marketing_campaign",
      relationships: ["campaign", "video", "voice", "customer"],
    });

    return {
      video: video,
      voiceScript: voiceScript,
      campaignId: this.generateCampaignId(),
    };
  }
}
```

### 2. Tool Registry and Management

1. Inside of Toolhouse.ai create a new bundle
2. Add "search_x" and "send_email" to your bundle
3. Make sure you give your bundle a name you can remember

### 3. Advanced Workflow Orchestration

Here we are going to use an external MCP

## 🔗 Connection to Final Agent

Using the CLI you're going to run and deploy your agent
Here's how you can do it

### How This Workshop Contributes:

1. **Tool Orchestration**: Coordinates all workshop components into unified functionality
2. **External Integration**: Connects the AI agent to external APIs and business systems
3. **Workflow Automation**: Creates complex multi-step processes using all available tools
4. **Protocol Standardization**: Implements MCP for consistent tool interaction
5. **Scalable Architecture**: Provides framework for adding new tools and capabilities

### Integration Points:

- **Workshop 1**: Project planning tools become part of the orchestrated toolkit
- **Workshop 2**: Memory system stores all tool executions and workflow history
- **Workshop 3**: Marketing AI and voice tools integrate into customer engagement workflows
- **Workshop 4**: Video generation becomes available as orchestrated tool capability
- **Workshop 6**: Local AI processing supports tool execution and decision-making

## 📚 Resources & Further Learning

### Documentation

- [Toolhouse.ai Documentation](https://docs.toolhouse.ai/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Tool Calling Best Practices](https://platform.openai.com/docs/guides/function-calling?api-mode=responses)

### Tools & Platforms

- **Toolhouse.ai**: Comprehensive tool calling platform
- **MCP Implementation**: Protocol for AI-tool communication
- **API Integration**: RESTful and GraphQL connectivity
- **Workflow Orchestration**: Complex process automation

### Next Steps

- Test complete tool orchestration with all workshop components
- Prepare for Workshop 6: Local AI Deployment
- Optimize tool execution performance
- Document complete agent capabilities

---

**This workshop transforms our AI agent into a powerful orchestrator capable of coordinating all previous workshop components while connecting to external systems, creating a truly comprehensive tool calling LLM agent.**
