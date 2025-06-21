#!/usr/bin/env node

/**
 * Main Entry Point - Clean Architecture Implementation
 * DWY Tool Calling LLM Agent
 * 
 * This is the new entry point that follows clean architecture principles
 * It replaces the original agent.js with proper dependency injection
 */

require('dotenv').config();

// Application Layer
const AgentOrchestrator = require('./application/services/AgentOrchestrator');
const ProcessMessage = require('./application/use-cases/orchestration/ProcessMessage');
const CreateProjectPlan = require('./application/use-cases/workshop1-planning/CreateProjectPlan');

// Infrastructure Layer
const ProjectPlanningService = require('./infrastructure/adapters/ProjectPlanningAdapter');
const MemoryService = require('./infrastructure/adapters/MemoryAdapter');
const AIService = require('./infrastructure/adapters/AIAdapter');

// Interface Layer
const ExpressServer = require('./interfaces/http/server');
const ChatController = require('./interfaces/http/controllers/ChatController');
const WorkshopController = require('./interfaces/http/controllers/WorkshopController');

// Shared
const { createLogger } = require('./shared/utils/logger');

class DWYAgent {
    constructor() {
        this.logger = createLogger('DWYAgent');
        this.initialized = false;
    }

    async initialize() {
        try {
            this.logger.info('🚀 Initializing DWY Agent with Clean Architecture...');

            // Initialize Infrastructure Services
            await this.initializeInfrastructure();

            // Initialize Application Services
            await this.initializeApplicationServices();

            // Initialize Interface Layer
            await this.initializeInterface();

            this.initialized = true;
            this.logger.info('✅ DWY Agent initialization complete!');

        } catch (error) {
            this.logger.error('❌ Failed to initialize DWY Agent:', error);
            throw error;
        }
    }

    async initializeInfrastructure() {
        this.logger.info('📦 Initializing Infrastructure Layer...');

        // Create workshop services (these would be the refactored workshop implementations)
        this.workshopServices = {
            planning: new ProjectPlanningService(),
            // For now, we'll create placeholder services for workshops 2-6
            memory: { initialize: async () => {}, store: async () => ({ success: true }) },
            marketing: { initialize: async () => {}, generateStrategy: async () => ({ success: true }) },
            content: { initialize: async () => {}, generateVideo: async () => ({ success: true }) },
            tools: { initialize: async () => {}, callTool: async () => ({ success: true }), planTools: async () => ({ needsPlanning: false, tools: [] }) },
        };

        // Create core services
        this.memoryService = new MemoryService();
        this.aiService = new AIService();

        this.logger.info('✅ Infrastructure Layer initialized');
    }

    async initializeApplicationServices() {
        this.logger.info('🔧 Initializing Application Layer...');

        // Create the main orchestrator
        this.agentOrchestrator = new AgentOrchestrator(
            this.workshopServices,
            this.memoryService,
            this.aiService
        );

        // Initialize the orchestrator
        await this.agentOrchestrator.initialize();

        // Create use cases
        this.processMessageUseCase = new ProcessMessage(this.agentOrchestrator);

        // Workshop-specific use cases
        this.workshopUseCases = {
            createProjectPlan: new CreateProjectPlan(
                this.workshopServices.planning,
                this.memoryService // Acting as project repository for now
            )
        };

        this.logger.info('✅ Application Layer initialized');
    }

    async initializeInterface() {
        this.logger.info('🌐 Initializing Interface Layer...');

        // Create controllers
        this.chatController = new ChatController(
            this.processMessageUseCase,
            this.agentOrchestrator
        );

        this.workshopController = new WorkshopController(
            this.workshopUseCases,
            this.agentOrchestrator
        );

        // Create the Express server
        this.server = new ExpressServer(
            this.chatController,
            this.workshopController
        );

        this.logger.info('✅ Interface Layer initialized');
    }

    async start() {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            await this.server.start();
            this.logger.info('🎉 DWY Agent is now running!');
        } catch (error) {
            this.logger.error('❌ Failed to start DWY Agent:', error);
            process.exit(1);
        }
    }

    async stop() {
        this.logger.info('🛑 Stopping DWY Agent...');
        // Graceful shutdown logic would go here
        this.logger.info('✅ DWY Agent stopped');
    }
}

// Start the agent if this file is run directly
if (require.main === module) {
    const agent = new DWYAgent();
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
        console.log('\n🛑 Received SIGINT, shutting down gracefully...');
        await agent.stop();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
        await agent.stop();
        process.exit(0);
    });

    // Start the agent
    agent.start().catch((error) => {
        console.error('❌ Fatal error starting DWY Agent:', error);
        process.exit(1);
    });
}

module.exports = DWYAgent;