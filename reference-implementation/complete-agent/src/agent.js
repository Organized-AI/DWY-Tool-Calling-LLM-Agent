#!/usr/bin/env node

/**
 * DWY Tool Calling LLM Agent
 * Complete integration of all 6 workshop components
 * 
 * Built for Organized AI // Vibe Coders Hackathon
 * Optimized for beginners using Cursor IDE
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import workshop components (each workshop builds one piece)
const ProjectPlanning = require('./workshops/workshop1-planning');      // DeepInvent.ai integration
const KnowledgeGraph = require('./workshops/workshop2-memory');         // Penumbra.ai + Neo4j
const MarketingServices = require('./workshops/workshop3-marketing');   // Sindarin.tech Voice AI  
const VideoGeneration = require('./workshops/workshop4-content');       // Texel.ai integration
const ToolCalling = require('./workshops/workshop5-tools');             // Toolhouse.ai MCP
const LocalAI = require('./workshops/workshop6-ai');                    // WebAI.com + Ollama

class DWYAgent {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        
        // Initialize workshop components
        this.planning = new ProjectPlanning();
        this.memory = new KnowledgeGraph();
        this.marketing = new MarketingServices();
        this.content = new VideoGeneration();
        this.tools = new ToolCalling();
        this.ai = new LocalAI();
        
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    setupRoutes() {
        // Health check - always good to have!
        this.app.get('/health', (req, res) => {
            res.json({ 
                status: 'healthy', 
                agent: 'DWY Tool Calling LLM Agent',
                workshops: 6,
                timestamp: new Date().toISOString()
            });
        });

        // Main chat endpoint - where the magic happens
        this.app.post('/chat', async (req, res) => {
            try {
                const { message, context = {} } = req.body;
                
                // Process message through all workshop components
                const response = await this.processMessage(message, context);
                
                res.json(response);
            } catch (error) {
                console.error('Chat error:', error);
                res.status(500).json({ 
                    error: 'Something went wrong', 
                    details: error.message 
                });
            }
        });

        // Individual workshop endpoints for testing
        this.app.post('/workshop1/plan', async (req, res) => {
            const result = await this.planning.createPlan(req.body);
            res.json(result);
        });

        this.app.post('/workshop2/remember', async (req, res) => {
            const result = await this.memory.store(req.body);
            res.json(result);
        });

        this.app.post('/workshop3/market', async (req, res) => {
            const result = await this.marketing.generateStrategy(req.body);
            res.json(result);
        });

        this.app.post('/workshop4/create', async (req, res) => {
            const result = await this.content.generateVideo(req.body);
            res.json(result);
        });

        this.app.post('/workshop5/tools', async (req, res) => {
            const result = await this.tools.callTool(req.body);
            res.json(result);
        });

        this.app.post('/workshop6/think', async (req, res) => {
            const result = await this.ai.generate(req.body);
            res.json(result);
        });
    }

    /**
     * Main message processing - integrates all 6 workshops
     * This is where beginners can see how everything works together!
     */
    async processMessage(message, context) {
        console.log(`🤖 DWY Agent processing: "${message}"`);

        // Step 1 (Workshop 2): Store the conversation in memory
        await this.memory.store({
            type: 'user_message',
            content: message,
            timestamp: new Date(),
            context
        });

        // Step 2 (Workshop 6): Get AI understanding of the message
        const aiAnalysis = await this.ai.analyze(message, context);

        // Step 3 (Workshop 5): Determine which tools to use
        const toolPlan = await this.tools.planTools(aiAnalysis);

        // Step 4 (Workshop 1): Create execution plan if needed
        let executionPlan = null;
        if (toolPlan.needsPlanning) {
            executionPlan = await this.planning.createExecutionPlan(toolPlan);
        }

        // Step 5 (Workshop 3): Check if marketing response needed
        let marketingResponse = null;
        if (aiAnalysis.intent.includes('marketing') || aiAnalysis.intent.includes('business')) {
            marketingResponse = await this.marketing.generateResponse(aiAnalysis);
        }

        // Step 6 (Workshop 4): Generate content if requested
        let contentResponse = null;
        if (aiAnalysis.intent.includes('video') || aiAnalysis.intent.includes('content')) {
            contentResponse = await this.content.generateContent(aiAnalysis);
        }

        // Step 7: Generate final response using local AI
        const finalResponse = await this.ai.generateResponse({
            userMessage: message,
            aiAnalysis,
            toolPlan,
            executionPlan,
            marketingResponse,
            contentResponse,
            memory: await this.memory.getRelevantContext(message)
        });

        // Step 8: Store the complete interaction in memory
        await this.memory.store({
            type: 'agent_response',
            userMessage: message,
            response: finalResponse,
            components: {
                planning: executionPlan,
                marketing: marketingResponse,
                content: contentResponse,
                tools: toolPlan
            },
            timestamp: new Date()
        });

        return {
            response: finalResponse.text,
            components: {
                planning: executionPlan,
                marketing: marketingResponse,
                content: contentResponse,
                tools: toolPlan,
                memory: 'stored'
            },
            metadata: {
                processed_by: 'DWY Agent',
                workshops_used: this.getUsedWorkshops(executionPlan, marketingResponse, contentResponse),
                timestamp: new Date().toISOString()
            }
        };
    }

    getUsedWorkshops(planning, marketing, content) {
        const used = ['Workshop 2 (Memory)', 'Workshop 5 (Tools)', 'Workshop 6 (AI)'];
        if (planning) used.push('Workshop 1 (Planning)');
        if (marketing) used.push('Workshop 3 (Marketing)');
        if (content) used.push('Workshop 4 (Content)');
        return used;
    }

    async start() {
        try {
            // Initialize all workshop components
            console.log('🚀 Initializing DWY Agent components...');
            
            await this.planning.initialize();
            await this.memory.initialize();
            await this.marketing.initialize();
            await this.content.initialize();
            await this.tools.initialize();
            await this.ai.initialize();

            // Start the server
            this.app.listen(this.port, () => {
                console.log(`
🎉 DWY Tool Calling LLM Agent is running!

🌐 Server: http://localhost:${this.port}
🏥 Health: http://localhost:${this.port}/health
💬 Chat: POST http://localhost:${this.port}/chat

📚 Workshop Endpoints:
   POST /workshop1/plan     - Project Planning (DeepInvent.ai)
   POST /workshop2/remember - Knowledge Graph (Penumbra.ai)
   POST /workshop3/market   - Marketing AI (Sindarin.tech)
   POST /workshop4/create   - Video Generation (Texel.ai)
   POST /workshop5/tools    - Tool Calling (Toolhouse.ai)
   POST /workshop6/think    - Local AI (WebAI.com)

Ready for hackathon participants! 🚀
                `);
            });

        } catch (error) {
            console.error('❌ Failed to start DWY Agent:', error);
            process.exit(1);
        }
    }
}

// Start the agent if this file is run directly
if (require.main === module) {
    const agent = new DWYAgent();
    agent.start();
}

module.exports = DWYAgent;