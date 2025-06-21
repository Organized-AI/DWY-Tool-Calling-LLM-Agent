/**
 * Agent Orchestrator - Main application service for coordinating all workshops
 * This replaces the original DWYAgent class but follows clean architecture principles
 */

const { Message, Response } = require('../../core/value-objects');

class AgentOrchestrator {
    constructor(workshopServices, memoryService, aiService) {
        this.workshopServices = workshopServices;
        this.memoryService = memoryService;
        this.aiService = aiService;
        this.initialized = false;
    }

    async initialize() {
        console.log('🚀 Initializing DWY Agent Orchestrator...');
        
        // Initialize all workshop services
        for (const [name, service] of Object.entries(this.workshopServices)) {
            await service.initialize();
            console.log(`✅ ${name} initialized`);
        }

        // Initialize core services
        await this.memoryService.initialize();
        await this.aiService.initialize();
        
        this.initialized = true;
        console.log('✅ Agent Orchestrator ready!');
    }

    /**
     * Main message processing orchestration
     * Coordinates all 6 workshops following clean architecture principles
     */
    async processMessage(messageContent, context = {}) {
        if (!this.initialized) {
            throw new Error('AgentOrchestrator not initialized');
        }

        console.log(`🤖 Processing message: "${messageContent}"`);

        // Create message value object
        const message = new Message(messageContent, 'user');

        try {
            // Step 1: Store the message in memory (Workshop 2)
            await this.memoryService.storeMessage(message, context);

            // Step 2: Get AI analysis (Workshop 6)
            const aiAnalysis = await this.aiService.analyzeMessage(messageContent, context);

            // Step 3: Plan tool usage (Workshop 5)
            const toolPlan = await this.workshopServices.tools.planTools(aiAnalysis);

            // Step 4: Create execution plan if needed (Workshop 1)
            let executionPlan = null;
            if (toolPlan.needsPlanning) {
                executionPlan = await this.workshopServices.planning.createExecutionPlan(toolPlan);
            }

            // Step 5: Generate marketing response if needed (Workshop 3)
            let marketingResponse = null;
            if (this.shouldUseMarketing(aiAnalysis)) {
                marketingResponse = await this.workshopServices.marketing.generateResponse(aiAnalysis);
            }

            // Step 6: Generate content if needed (Workshop 4)
            let contentResponse = null;
            if (this.shouldUseContent(aiAnalysis)) {
                contentResponse = await this.workshopServices.content.generateContent(aiAnalysis);
            }

            // Step 7: Generate final AI response
            const responseText = await this.aiService.generateResponse({
                userMessage: messageContent,
                aiAnalysis,
                toolPlan,
                executionPlan,
                marketingResponse,
                contentResponse,
                memory: await this.memoryService.getRelevantContext(messageContent)
            });

            // Step 8: Create response value object
            const response = new Response(
                responseText,
                {
                    planning: executionPlan,
                    marketing: marketingResponse,
                    content: contentResponse,
                    tools: toolPlan,
                    memory: 'stored'
                },
                {
                    processed_by: 'DWY Agent',
                    message_id: message.id
                }
            );

            // Step 9: Store the complete interaction
            await this.memoryService.storeInteraction(message, response);

            return response;

        } catch (error) {
            console.error('Error processing message:', error);
            
            // Create error response
            const errorResponse = new Response(
                'I apologize, but I encountered an error processing your message. Please try again.',
                {},
                {
                    error: true,
                    errorMessage: error.message,
                    processed_by: 'DWY Agent'
                }
            );

            return errorResponse;
        }
    }

    /**
     * Execute specific workshop functionality
     */
    async executeWorkshop(workshopName, request) {
        if (!this.initialized) {
            throw new Error('AgentOrchestrator not initialized');
        }

        const workshop = this.workshopServices[workshopName];
        if (!workshop) {
            throw new Error(`Workshop '${workshopName}' not found`);
        }

        try {
            switch (workshopName) {
                case 'planning':
                    return await workshop.createPlan(request);
                case 'memory':
                    return await workshop.store(request);
                case 'marketing':
                    return await workshop.generateStrategy(request);
                case 'content':
                    return await workshop.generateVideo(request);
                case 'tools':
                    return await workshop.callTool(request);
                case 'ai':
                    return await workshop.generate(request);
                default:
                    throw new Error(`Unknown workshop operation for '${workshopName}'`);
            }
        } catch (error) {
            console.error(`Error executing workshop ${workshopName}:`, error);
            throw error;
        }
    }

    /**
     * Get agent status and health information
     */
    getStatus() {
        return {
            status: this.initialized ? 'healthy' : 'initializing',
            agent: 'DWY Tool Calling LLM Agent',
            workshops: Object.keys(this.workshopServices).length,
            timestamp: new Date().toISOString(),
            workshops_available: Object.keys(this.workshopServices)
        };
    }

    // Helper methods for determining workshop usage
    shouldUseMarketing(aiAnalysis) {
        return aiAnalysis.intent &&
               (aiAnalysis.intent.includes('marketing') || 
                aiAnalysis.intent.includes('business'));
    }

    shouldUseContent(aiAnalysis) {
        return aiAnalysis.intent &&
               (aiAnalysis.intent.includes('video') || 
                aiAnalysis.intent.includes('content'));
    }
}

module.exports = AgentOrchestrator;