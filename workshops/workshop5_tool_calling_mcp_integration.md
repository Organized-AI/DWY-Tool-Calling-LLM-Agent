# Workshop 5: Tool Calling & MCP Integration
**Integration Layer**

**Presenter**: Orlando  
**Duration**: 30 minutes  
**Learning Objective**: Implement tool calling functionality and Model Context Protocol (MCP) integration, enabling the AI system to interact with external APIs and business systems.

## 🎯 Workshop Overview

This critical workshop creates the integration layer that connects all workshop components into a cohesive AI agent system. Participants learn to implement the Model Context Protocol (MCP) for standardized AI tool integration, enabling the agent to interact with external systems and perform real-world tasks.

## 🔧 Core Components

### **MCP Protocol Implementation**
- Standard interface for AI tool integration
- JSON-RPC 2.0 communication protocol
- Tool discovery and capability negotiation
- Real-time tool execution and response handling

### **External API Connectivity**
- Integration with business systems and third-party services
- RESTful API and webhook integration
- Authentication and security management
- Rate limiting and error handling

### **Tool Orchestration**
- Automated tool selection and execution workflows
- Multi-step tool chains and dependencies
- Parallel tool execution and result aggregation
- Error recovery and fallback mechanisms

### **Business System Integration**
- Connect AI agent to existing enterprise systems
- CRM, ERP, and database integration
- File system and document management
- Communication platform integration

## 🛠️ Key Technologies & Tools

### **Primary Tool**: [Toolhouse.ai](https://toolhouse.ai)
- Comprehensive platform for tool calling
- Pre-built integrations with popular business tools
- Custom tool development and deployment
- Analytics and monitoring for tool usage

### **MCP Infrastructure**
- **JSON-RPC 2.0**: Standard protocol for remote procedure calls
- **WebSocket**: Real-time bidirectional communication
- **HTTP/HTTPS**: RESTful API integration
- **Authentication**: OAuth 2.0, API keys, and token management

### **Integration Framework**
- **Tool Registry**: Centralized tool discovery and management
- **Execution Engine**: Tool orchestration and workflow management
- **Security Layer**: Authentication, authorization, and audit logging
- **Monitoring**: Performance tracking and error monitoring

## 📋 Workshop Implementation Steps

### **Step 1: MCP Server Setup and Configuration** (10 minutes)
1. **MCP Server Foundation**
   ```javascript
   // MCP Server implementation
   const express = require('express');
   const WebSocket = require('ws');
   const { JSONRPCServer } = require('json-rpc-2.0');
   
   class MCPServer {
     constructor(config) {
       this.config = config;
       this.app = express();
       this.jsonRpcServer = new JSONRPCServer();
       this.tools = new Map();
       this.setupRoutes();
       this.setupWebSocket();
     }
     
     // Register tools from all workshops
     registerTool(name, handler, schema) {
       this.tools.set(name, { handler, schema });
       this.jsonRpcServer.addMethod(name, handler);
     }
     
     // Setup HTTP and WebSocket endpoints
     setupRoutes() {
       this.app.use(express.json());
       
       // MCP tools endpoint
       this.app.post('/mcp', async (req, res) => {
         const response = await this.jsonRpcServer.receive(req.body);
         if (response) {
           res.json(response);
         } else {
           res.status(204).end();
         }
       });
       
       // Tool discovery endpoint
       this.app.get('/mcp/tools', (req, res) => {
         const toolList = Array.from(this.tools.keys()).map(name => ({
           name,
           schema: this.tools.get(name).schema
         }));
         res.json({ tools: toolList });
       });
     }
     
     // WebSocket for real-time communication
     setupWebSocket() {
       this.wss = new WebSocket.Server({ port: this.config.websocketPort });
       
       this.wss.on('connection', (ws) => {
         ws.on('message', async (message) => {
           try {
             const request = JSON.parse(message);
             const response = await this.jsonRpcServer.receive(request);
             if (response) {
               ws.send(JSON.stringify(response));
             }
           } catch (error) {
             ws.send(JSON.stringify({
               jsonrpc: '2.0',
               id: null,
               error: { code: -32700, message: 'Parse error' }
             }));
           }
         });
       });
     }
   }
   ```

2. **Toolhouse.ai Integration**
   ```javascript
   // Toolhouse.ai client setup
   const { ToolhouseClient } = require('@toolhouse/sdk');
   
   const toolhouseClient = new ToolhouseClient({
     apiKey: process.env.TOOLHOUSE_API_KEY,
     baseURL: 'https://api.toolhouse.ai/v1'
   });
   
   // Enhanced tool execution with Toolhouse
   class EnhancedMCPServer extends MCPServer {
     async executeToolWithToolhouse(toolName, parameters) {
       try {
         // Try local tool first
         if (this.tools.has(toolName)) {
           return await this.tools.get(toolName).handler(parameters);
         }
         
         // Fallback to Toolhouse.ai
         const result = await toolhouseClient.executeTool({
           tool: toolName,
           parameters: parameters,
           context: await this.getExecutionContext()
         });
         
         return result;
       } catch (error) {
         throw new Error(`Tool execution failed: ${error.message}`);
       }
     }
     
     async getExecutionContext() {
       // Gather context from knowledge graph
       const context = await this.gatherSystemContext();
       return {
         workshop_state: context.workshops,
         customer_data: context.customers,
         campaign_data: context.campaigns,
         system_capabilities: context.capabilities
       };
     }
   }
   ```

3. **Knowledge Graph Integration**
   ```cypher
   // Tool execution tracking
   CREATE (te:ToolExecution {
     id: $executionId,
     tool_name: $toolName,
     parameters: $parameters,
     result: $result,
     execution_time: $executionTime,
     success: $success,
     timestamp: datetime()
   });
   
   // Tool capability registration
   CREATE (t:Tool {
     name: $toolName,
     description: $description,
     category: $category,
     provider: $provider,
     capabilities: $capabilities,
     required_auth: $requiredAuth
   });
   
   // Workshop tool relationships
   MATCH (w:Workshop {id: $workshopId})
   MATCH (t:Tool {name: $toolName})
   CREATE (w)-[:PROVIDES_TOOL]->(t);
   
   // Tool dependency mapping
   MATCH (t1:Tool {name: $toolName1})
   MATCH (t2:Tool {name: $toolName2})
   CREATE (t1)-[:DEPENDS_ON]->(t2);
   ```

### **Step 2: Workshop Tool Integration** (10 minutes)
1. **Integrate All Workshop Tools**
   ```javascript
   // Workshop 1: Project Planning Tools
   const projectPlanningTools = {
     'planning.createProject': async (params) => {
       const project = await createProjectInKnowledgeGraph(params);
       await trackProjectCreation(project.id, params);
       return project;
     },
     
     'planning.generateTimeline': async (params) => {
       const timeline = await generateProjectTimeline(params.projectId);
       await storeTimelineInKnowledgeGraph(params.projectId, timeline);
       return timeline;
     },
     
     'planning.trackProgress': async (params) => {
       const progress = await calculateProjectProgress(params.projectId);
       await updateProgressInKnowledgeGraph(params.projectId, progress);
       return progress;
     }
   };
   
   // Workshop 2: Knowledge Graph Tools
   const knowledgeGraphTools = {
     'kg.createEntity': async (params) => {
       const entity = await createEntity(params.name, params.type, params.properties);
       return entity;
     },
     
     'kg.createRelationship': async (params) => {
       const relationship = await createRelationship(
         params.fromEntity, 
         params.toEntity, 
         params.relationshipType,
         params.properties
       );
       return relationship;
     },
     
     'kg.query': async (params) => {
       const results = await queryKnowledgeGraph(params.query, params.parameters);
       return results;
     }
   };
   
   // Workshop 3: Marketing AI Tools
   const marketingTools = {
     'marketing.generateContent': async (params) => {
       const content = await voiceClient.generateContent({
         type: params.contentType,
         audience: params.audience,
         product: params.product,
         tone: params.tone
       });
       await storeMarketingContent(content);
       return content;
     },
     
     'marketing.analyzeCustomer': async (params) => {
       const analysis = await analyzeCustomerWithVoiceAI(params.customerId);
       await updateCustomerProfile(params.customerId, analysis);
       return analysis;
     },
     
     'marketing.createCampaign': async (params) => {
       const campaign = await createMarketingCampaign(params);
       await trackCampaignInKnowledgeGraph(campaign.id, params);
       return campaign;
     }
   };
   
   // Workshop 4: Video Generation Tools
   const videoGenerationTools = {
     'video.generate': async (params) => {
       const video = await texelClient.generateVideo({
         script: params.script,
         template: params.template,
         brand_assets: brandAssets
       });
       await storeVideoInKnowledgeGraph(video.id, params);
       return video;
     },
     
     'video.optimize': async (params) => {
       const optimizedVideo = await videoOptimizer.optimizeForPlatform(
         params.videoId, 
         params.platform
       );
       await trackVideoOptimization(params.videoId, params.platform);
       return optimizedVideo;
     },
     
     'video.distribute': async (params) => {
       const distribution = await videoDistribution.distributeVideo(
         params.videoId, 
         params.distributionConfig
       );
       await trackVideoDistribution(params.videoId, distribution);
       return distribution;
     }
   };
   ```

2. **Tool Chain Orchestration**
   ```javascript
   // Multi-step tool execution workflows
   class ToolOrchestrator {
     async executeCampaignWorkflow(campaignParams) {
       const workflow = [
         // Step 1: Create campaign
         {
           tool: 'marketing.createCampaign',
           params: campaignParams,
           output: 'campaign'
         },
         
         // Step 2: Generate video content
         {
           tool: 'video.generate',
           params: {
             script: '${campaign.script}',
             template: campaignParams.videoTemplate
           },
           output: 'video'
         },
         
         // Step 3: Optimize for platforms
         {
           tool: 'video.optimize',
           params: {
             videoId: '${video.id}',
             platform: 'youtube'
           },
           parallel: true,
           output: 'optimizedVideos'
         },
         
         // Step 4: Track in knowledge graph
         {
           tool: 'kg.createRelationship',
           params: {
             fromEntity: '${campaign.id}',
             toEntity: '${video.id}',
             relationshipType: 'CONTAINS_VIDEO'
           }
         }
       ];
       
       return await this.executeWorkflow(workflow);
     }
     
     async executeWorkflow(workflow) {
       const context = {};
       const results = [];
       
       for (const step of workflow) {
         try {
           // Resolve parameter templates
           const resolvedParams = this.resolveParameters(step.params, context);
           
           // Execute tool
           const result = await this.executeTool(step.tool, resolvedParams);
           
           // Store result in context
           if (step.output) {
             context[step.output] = result;
           }
           
           results.push({ step: step.tool, result, success: true });
         } catch (error) {
           results.push({ step: step.tool, error: error.message, success: false });
           
           // Handle error recovery
           if (step.required !== false) {
             throw new Error(`Workflow failed at step ${step.tool}: ${error.message}`);
           }
         }
       }
       
       return { workflow_results: results, final_context: context };
     }
   }
   ```

### **Step 3: Claude Desktop Integration** (10 minutes)
1. **MCP Configuration for Claude Desktop**
   ```json
   // Claude Desktop MCP configuration
   {
     "mcpServers": {
       "dwy-tool-calling-agent": {
         "command": "node",
         "args": ["server.js"],
         "cwd": "/path/to/dwy-tool-calling-llm-agent",
         "env": {
           "MCP_PORT": "8000",
           "TOOLHOUSE_API_KEY": "your-toolhouse-api-key",
           "NEO4J_URI": "bolt://localhost:7687",
           "NEO4J_USERNAME": "neo4j",
           "NEO4J_PASSWORD": "workshop123"
         }
       }
     }
   }
   ```

2. **Tool Schema Definitions**
   ```javascript
   // Define tool schemas for Claude Desktop
   const toolSchemas = {
     'planning.createProject': {
       name: 'planning.createProject',
       description: 'Create a new project with tasks and timeline',
       inputSchema: {
         type: 'object',
         properties: {
           name: { type: 'string', description: 'Project name' },
           description: { type: 'string', description: 'Project description' },
           startDate: { type: 'string', format: 'date' },
           endDate: { type: 'string', format: 'date' },
           team: { type: 'array', items: { type: 'string' } }
         },
         required: ['name', 'description', 'startDate']
       }
     },
     
     'marketing.generateContent': {
       name: 'marketing.generateContent',
       description: 'Generate marketing content using AI',
       inputSchema: {
         type: 'object',
         properties: {
           contentType: { 
             type: 'string', 
             enum: ['email', 'social_post', 'blog_post', 'ad_copy'],
             description: 'Type of content to generate'
           },
           audience: { type: 'string', description: 'Target audience' },
           product: { type: 'string', description: 'Product or service' },
           tone: { 
             type: 'string', 
             enum: ['professional', 'casual', 'friendly', 'urgent'],
             description: 'Content tone'
           }
         },
         required: ['contentType', 'audience', 'product']
       }
     },
     
     'video.generate': {
       name: 'video.generate',
       description: 'Generate marketing video using AI',
       inputSchema: {
         type: 'object',
         properties: {
           script: { type: 'string', description: 'Video script content' },
           template: { type: 'string', description: 'Video template to use' },
           duration: { type: 'number', description: 'Desired duration in seconds' },
           style: { 
             type: 'string', 
             enum: ['professional', 'casual', 'animated', 'testimonial'],
             description: 'Video style'
           }
         },
         required: ['script', 'template']
       }
     }
   };
   ```

3. **Real-time Tool Execution Monitoring**
   ```javascript
   // Monitor tool execution and provide feedback
   class ToolExecutionMonitor {
     constructor(knowledgeGraph) {
       this.kg = knowledgeGraph;
       this.executionMetrics = new Map();
     }
     
     async trackExecution(toolName, parameters, startTime) {
       const executionId = generateExecutionId();
       
       // Store execution start in knowledge graph
       await this.kg.createEntity('ToolExecution', {
         id: executionId,
         tool_name: toolName,
         parameters: JSON.stringify(parameters),
         status: 'running',
         start_time: startTime
       });
       
       return executionId;
     }
     
     async completeExecution(executionId, result, endTime, success) {
       // Update execution record
       await this.kg.updateEntity('ToolExecution', executionId, {
         result: JSON.stringify(result),
         end_time: endTime,
         execution_time: endTime - this.getStartTime(executionId),
         status: success ? 'completed' : 'failed'
       });
       
       // Update performance metrics
       this.updatePerformanceMetrics(executionId, endTime);
     }
     
     async getExecutionHistory(toolName, limit = 10) {
       return await this.kg.query(`
         MATCH (te:ToolExecution {tool_name: $toolName})
         RETURN te
         ORDER BY te.start_time DESC
         LIMIT $limit
       `, { toolName, limit });
     }
   }
   ```

## 🎯 Workshop Deliverables

### **MCP Server Infrastructure**
- ✅ Complete MCP server with JSON-RPC 2.0 protocol implementation
- ✅ Toolhouse.ai integration for enhanced tool capabilities
- ✅ WebSocket and HTTP endpoints for real-time communication
- ✅ Tool discovery and capability negotiation system
- ✅ Authentication and security layer for tool access

### **Integrated Tool Ecosystem**
- ✅ All workshop tools integrated into unified MCP system
- ✅ Project planning tools for task and timeline management
- ✅ Knowledge graph tools for data relationship management
- ✅ Marketing AI tools for content and campaign management
- ✅ Video generation tools for content creation and distribution

### **Tool Orchestration System**
- ✅ Multi-step workflow execution engine
- ✅ Parallel tool execution and result aggregation
- ✅ Error handling and recovery mechanisms
- ✅ Tool dependency management and validation
- ✅ Performance monitoring and optimization

### **Claude Desktop Integration**
- ✅ MCP configuration for Claude Desktop connectivity
- ✅ Tool schema definitions for proper integration
- ✅ Real-time tool execution and result feedback
- ✅ Knowledge graph context integration for AI assistance
- ✅ Comprehensive tool documentation and examples

## 🔗 Connection to Final Agent

This workshop creates the integration layer that allows the AI agent to:

### **External System Connectivity**
- **API Integration**: Connect to business systems, databases, and third-party services
- **Tool Orchestration**: Execute complex multi-step workflows across different systems
- **Real-time Communication**: Maintain live connections for immediate tool execution
- **Security Management**: Handle authentication and authorization for external systems

### **Comprehensive Tool Access**
- **Workshop Integration**: Access all tools developed in previous workshops
- **Toolhouse Platform**: Leverage extensive library of pre-built business tools
- **Custom Tools**: Create and deploy custom tools for specific business needs
- **Tool Discovery**: Automatically discover and integrate new tool capabilities

### **Intelligent Workflow Execution**
- **Context-Aware Execution**: Use knowledge graph context for intelligent tool selection
- **Error Recovery**: Handle failures and implement fallback mechanisms
- **Performance Optimization**: Monitor and optimize tool execution performance
- **Result Aggregation**: Combine results from multiple tools for comprehensive solutions

### **AI-Driven Automation**
- **Automated Workflows**: Execute complex business processes without human intervention
- **Intelligent Routing**: Route requests to appropriate tools based on context and capability
- **Learning Optimization**: Improve tool selection and execution based on historical performance
- **Predictive Execution**: Anticipate tool needs based on patterns and context

## 📊 Example Tool Integration Queries

### **Tool Performance Analysis**
```cypher
// Analyze tool execution performance and success rates
MATCH (te:ToolExecution)
WITH te.tool_name as tool_name,
     count(te) as total_executions,
     avg(te.execution_time) as avg_execution_time,
     count(CASE WHEN te.status = 'completed' THEN 1 END) as successful_executions
RETURN tool_name, total_executions, avg_execution_time,
       round(100.0 * successful_executions / total_executions) as success_rate
ORDER BY success_rate DESC;
```

### **Workflow Efficiency Analysis**
```cypher
// Identify most effective tool combinations and workflows
MATCH (te1:ToolExecution)-[:PRECEDED_BY]->(te2:ToolExecution)
WHERE te1.status = 'completed' AND te2.status = 'completed'
WITH te2.tool_name + ' → ' + te1.tool_name as tool_sequence,
     count(*) as frequency,
     avg(te1.execution_time + te2.execution_time) as avg_total_time
RETURN tool_sequence, frequency, avg_total_time
ORDER BY frequency DESC;
```

### **Error Pattern Analysis**
```cypher
// Identify common error patterns and failure points
MATCH (te:ToolExecution {status: 'failed'})
WITH te.tool_name as tool_name,
     count(te) as failure_count,
     collect(te.error_message)[0..5] as sample_errors
RETURN tool_name, failure_count, sample_errors
ORDER BY failure_count DESC;
```

## 🚀 Advanced Integration Features

### **Dynamic Tool Loading**
```javascript
// Dynamic tool discovery and loading
class DynamicToolLoader {
  async discoverTools() {
    // Discover tools from Toolhouse.ai
    const toolhouseTools = await toolhouseClient.listAvailableTools();
    
    // Discover local workshop tools
    const localTools = await this.scanLocalTools();
    
    // Merge and register all tools
    const allTools = [...toolhouseTools, ...localTools];
    
    for (const tool of allTools) {
      await this.registerTool(tool);
    }
    
    return allTools;
  }
  
  async registerTool(toolDefinition) {
    // Validate tool schema
    const isValid = await this.validateToolSchema(toolDefinition);
    if (!isValid) {
      throw new Error(`Invalid tool schema: ${toolDefinition.name}`);
    }
    
    // Register with MCP server
    this.mcpServer.registerTool(
      toolDefinition.name,
      toolDefinition.handler,
      toolDefinition.schema
    );
    
    // Update knowledge graph
    await this.kg.createEntity('Tool', {
      name: toolDefinition.name,
      description: toolDefinition.description,
      category: toolDefinition.category,
      capabilities: toolDefinition.capabilities
    });
  }
}
```

### **Intelligent Tool Selection**
```javascript
// AI-powered tool selection and execution
class IntelligentToolSelector {
  async selectOptimalTool(request, context) {
    // Analyze request using knowledge graph context
    const analysis = await this.analyzeRequest(request, context);
    
    // Find matching tools
    const candidateTools = await this.findCandidateTools(analysis.requirements);
    
    // Score tools based on context and historical performance
    const scoredTools = await this.scoreTools(candidateTools, context);
    
    // Select best tool
    return scoredTools[0];
  }
  
  async scoreTools(tools, context) {
    const scoredTools = [];
    
    for (const tool of tools) {
      const score = await this.calculateToolScore(tool, context);
      scoredTools.push({ tool, score });
    }
    
    return scoredTools.sort((a, b) => b.score - a.score);
  }
  
  async calculateToolScore(tool, context) {
    // Factor in historical performance
    const performance = await this.getToolPerformance(tool.name);
    
    // Factor in context relevance
    const relevance = await this.calculateRelevance(tool, context);
    
    // Factor in current system load
    const availability = await this.checkToolAvailability(tool.name);
    
    return (performance * 0.4) + (relevance * 0.4) + (availability * 0.2);
  }
}
```

## 🔧 Integration Best Practices

### **Security and Authentication**
- Implement proper API key management and rotation
- Use OAuth 2.0 for third-party service authentication
- Audit all tool executions and maintain access logs
- Implement rate limiting and abuse detection

### **Performance Optimization**
- Cache frequently used tool results
- Implement connection pooling for external services
- Monitor tool execution times and optimize slow operations
- Use parallel execution where possible

### **Error Handling and Resilience**
- Implement retry mechanisms with exponential backoff
- Create fallback tools for critical functionality
- Monitor tool health and automatically disable failing tools
- Provide meaningful error messages and troubleshooting guidance

---

**This workshop completes the AI agent by creating a comprehensive integration layer that connects all workshop components and enables sophisticated tool-based automation, making the agent capable of performing complex real-world business tasks through intelligent tool orchestration.**