/**
 * Process Message Use Case - Main orchestration use case
 * Handles the complete message processing workflow
 */

class ProcessMessage {
    constructor(agentOrchestrator) {
        this.agentOrchestrator = agentOrchestrator;
    }

    async execute(messageContent, context = {}) {
        // Validate input
        if (!messageContent || typeof messageContent !== 'string') {
            throw new Error('Message content is required and must be a string');
        }

        if (messageContent.trim().length === 0) {
            throw new Error('Message content cannot be empty');
        }

        // Process the message through the orchestrator
        const response = await this.agentOrchestrator.processMessage(messageContent, context);

        return response;
    }
}

module.exports = ProcessMessage;