/**
 * Express Server Setup - Clean Architecture Entry Point
 * This replaces the original agent.js with proper layer separation
 */

const express = require('express');
const cors = require('cors');

class ExpressServer {
    constructor(chatController, workshopController, middlewares = []) {
        this.app = express();
        this.chatController = chatController;
        this.workshopController = workshopController;
        this.middlewares = middlewares;
        this.port = process.env.PORT || 3000;
        
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        // Core middleware
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));

        // Custom middleware
        this.middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

    setupRoutes() {
        // Health check endpoint
        this.app.get('/health', (req, res) => this.chatController.handleHealth(req, res));

        // Main chat endpoint
        this.app.post('/chat', (req, res) => this.chatController.handleChat(req, res));

        // Workshop endpoints
        this.app.get('/workshops', (req, res) => this.workshopController.handleWorkshopList(req, res));
        this.app.post('/workshop1/plan', (req, res) => this.workshopController.handlePlanning(req, res));
        this.app.post('/workshop2/remember', (req, res) => this.workshopController.handleMemory(req, res));
        this.app.post('/workshop3/market', (req, res) => this.workshopController.handleMarketing(req, res));
        this.app.post('/workshop4/create', (req, res) => this.workshopController.handleContent(req, res));
        this.app.post('/workshop5/tools', (req, res) => this.workshopController.handleTools(req, res));
        this.app.post('/workshop6/think', (req, res) => this.workshopController.handleAI(req, res));

        // 404 handler
        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Endpoint not found',
                message: 'Please check the API documentation for available endpoints',
                availableEndpoints: [
                    'GET /health',
                    'POST /chat',
                    'GET /workshops',
                    'POST /workshop1/plan',
                    'POST /workshop2/remember',
                    'POST /workshop3/market',
                    'POST /workshop4/create',
                    'POST /workshop5/tools',
                    'POST /workshop6/think'
                ]
            });
        });

        // Error handler
        this.app.use((error, req, res, next) => {
            console.error('Unhandled error:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An unexpected error occurred',
                timestamp: new Date().toISOString()
            });
        });
    }

    start() {
        return new Promise((resolve, reject) => {
            try {
                const server = this.app.listen(this.port, () => {
                    console.log(`
🎉 DWY Tool Calling LLM Agent is running!

🌐 Server: http://localhost:${this.port}
🏥 Health: http://localhost:${this.port}/health
💬 Chat: POST http://localhost:${this.port}/chat

📚 Workshop Endpoints:
   GET  /workshops           - List all available workshops
   POST /workshop1/plan     - Project Planning (DeepInvent.ai)
   POST /workshop2/remember - Knowledge Graph (Penumbra.ai)
   POST /workshop3/market   - Marketing AI (Sindarin.tech)
   POST /workshop4/create   - Video Generation (Texel.ai)
   POST /workshop5/tools    - Tool Calling (Toolhouse.ai)
   POST /workshop6/think    - Local AI (Ollama)

🏗️ Architecture: Clean Architecture Implementation
Ready for hackathon participants! 🚀
                    `);
                    resolve(server);
                });

                server.on('error', (error) => {
                    console.error('❌ Server error:', error);
                    reject(error);
                });

            } catch (error) {
                console.error('❌ Failed to start server:', error);
                reject(error);
            }
        });
    }

    getApp() {
        return this.app;
    }
}

module.exports = ExpressServer;