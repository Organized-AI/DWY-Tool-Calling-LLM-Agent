/**
 * Conversation Entity - Represents a conversation between user and agent
 */

class Conversation {
    constructor(id, agentId, userId = null) {
        this.id = id;
        this.agentId = agentId;
        this.userId = userId;
        this.messages = [];
        this.context = {};
        this.startedAt = new Date();
        this.lastMessageAt = new Date();
        this.status = 'active';
    }

    addMessage(message) {
        this.messages.push(message);
        this.lastMessageAt = new Date();
    }

    getMessages() {
        return [...this.messages];
    }

    getLastMessage() {
        return this.messages[this.messages.length - 1] || null;
    }

    updateContext(newContext) {
        this.context = { ...this.context, ...newContext };
    }

    getMessageCount() {
        return this.messages.length;
    }

    getDuration() {
        return new Date() - this.startedAt;
    }

    end() {
        this.status = 'ended';
    }

    toJSON() {
        return {
            id: this.id,
            agentId: this.agentId,
            userId: this.userId,
            messageCount: this.messages.length,
            context: this.context,
            startedAt: this.startedAt,
            lastMessageAt: this.lastMessageAt,
            status: this.status
        };
    }
}

module.exports = Conversation;