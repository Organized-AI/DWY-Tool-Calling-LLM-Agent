/**
 * Chat Controller - HTTP interface for chat interactions
 * Handles chat requests and coordinates with use cases
 */

class ChatController {
    constructor(processMessageUseCase, agentOrchestrator) {
        this.processMessageUseCase = processMessageUseCase;
        this.agentOrchestrator = agentOrchestrator;
    }

    /**
     * Handle main chat endpoint
     */
    async handleChat(req, res) {
        try {
            const { message, context = {} } = req.body;

            // Validate request
            if (!message) {
                return res.status(400).json({
                    error: 'Message is required',
                    details: 'Please provide a message in the request body'
                });
            }

            // Process the message
            const response = await this.processMessageUseCase.execute(message, context);

            // Return the response
            res.json(response.toJSON());

        } catch (error) {
            console.error('Chat error:', error);
            res.status(500).json({
                error: 'Internal server error',
                details: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Handle health check endpoint
     */
    async handleHealth(req, res) {
        try {
            const status = this.agentOrchestrator.getStatus();
            res.json(status);
        } catch (error) {
            console.error('Health check error:', error);
            res.status(500).json({
                status: 'error',
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }
}

module.exports = ChatController;