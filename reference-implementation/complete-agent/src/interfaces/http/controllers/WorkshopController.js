/**
 * Workshop Controller - HTTP interface for individual workshop endpoints
 * Handles specific workshop requests for testing and direct access
 */

class WorkshopController {
    constructor(workshopUseCases, agentOrchestrator) {
        this.workshopUseCases = workshopUseCases;
        this.agentOrchestrator = agentOrchestrator;
    }

    /**
     * Handle Workshop 1 - Project Planning
     */
    async handlePlanning(req, res) {
        try {
            const result = await this.agentOrchestrator.executeWorkshop('planning', req.body);
            res.json(result);
        } catch (error) {
            console.error('Workshop 1 error:', error);
            res.status(500).json({
                error: 'Workshop 1 (Planning) error',
                details: error.message,
                workshop: 1
            });
        }
    }

    /**
     * Handle Workshop 2 - Knowledge Graph/Memory
     */
    async handleMemory(req, res) {
        try {
            const result = await this.agentOrchestrator.executeWorkshop('memory', req.body);
            res.json(result);
        } catch (error) {
            console.error('Workshop 2 error:', error);
            res.status(500).json({
                error: 'Workshop 2 (Memory) error',
                details: error.message,
                workshop: 2
            });
        }
    }

    /**
     * Handle Workshop 3 - Marketing AI
     */
    async handleMarketing(req, res) {
        try {
            const result = await this.agentOrchestrator.executeWorkshop('marketing', req.body);
            res.json(result);
        } catch (error) {
            console.error('Workshop 3 error:', error);
            res.status(500).json({
                error: 'Workshop 3 (Marketing) error',
                details: error.message,
                workshop: 3
            });
        }
    }

    /**
     * Handle Workshop 4 - Content Generation
     */
    async handleContent(req, res) {
        try {
            const result = await this.agentOrchestrator.executeWorkshop('content', req.body);
            res.json(result);
        } catch (error) {
            console.error('Workshop 4 error:', error);
            res.status(500).json({
                error: 'Workshop 4 (Content) error',
                details: error.message,
                workshop: 4
            });
        }
    }

    /**
     * Handle Workshop 5 - Tool Calling
     */
    async handleTools(req, res) {
        try {
            const result = await this.agentOrchestrator.executeWorkshop('tools', req.body);
            res.json(result);
        } catch (error) {
            console.error('Workshop 5 error:', error);
            res.status(500).json({
                error: 'Workshop 5 (Tools) error',
                details: error.message,
                workshop: 5
            });
        }
    }

    /**
     * Handle Workshop 6 - Local AI
     */
    async handleAI(req, res) {
        try {
            const result = await this.agentOrchestrator.executeWorkshop('ai', req.body);
            res.json(result);
        } catch (error) {
            console.error('Workshop 6 error:', error);
            res.status(500).json({
                error: 'Workshop 6 (AI) error',
                details: error.message,
                workshop: 6
            });
        }
    }

    /**
     * Get all available workshops
     */
    async handleWorkshopList(req, res) {
        try {
            const workshops = [
                {
                    id: 1,
                    name: 'Project Planning',
                    description: 'AI-enhanced project planning with DeepInvent.ai',
                    endpoint: '/workshop1/plan',
                    status: 'available'
                },
                {
                    id: 2,
                    name: 'Knowledge Graph',
                    description: 'Memory and context management with Penumbra.ai',
                    endpoint: '/workshop2/remember',
                    status: 'available'
                },
                {
                    id: 3,
                    name: 'Marketing AI',
                    description: 'Voice AI and marketing strategies with Sindarin.tech',
                    endpoint: '/workshop3/market',
                    status: 'available'
                },
                {
                    id: 4,
                    name: 'Content Generation',
                    description: 'AI video generation with Texel.ai',
                    endpoint: '/workshop4/create',
                    status: 'available'
                },
                {
                    id: 5,
                    name: 'Tool Calling',
                    description: 'MCP protocol integration with Toolhouse.ai',
                    endpoint: '/workshop5/tools',
                    status: 'available'
                },
                {
                    id: 6,
                    name: 'Local AI',
                    description: 'Local AI processing with Ollama',
                    endpoint: '/workshop6/think',
                    status: 'available'
                }
            ];

            res.json({
                workshops,
                totalWorkshops: workshops.length,
                agent: 'DWY Tool Calling LLM Agent'
            });
        } catch (error) {
            console.error('Workshop list error:', error);
            res.status(500).json({
                error: 'Failed to get workshop list',
                details: error.message
            });
        }
    }
}

module.exports = WorkshopController;