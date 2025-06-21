/**
 * Message Value Object - Immutable representation of a message
 */

class Message {
    constructor(content, sender, timestamp = new Date(), messageType = 'text') {
        this._content = content;
        this._sender = sender;
        this._timestamp = new Date(timestamp);
        this._messageType = messageType;
        this._id = this.generateId();
        
        // Make properties immutable
        Object.freeze(this);
    }

    get content() {
        return this._content;
    }

    get sender() {
        return this._sender;
    }

    get timestamp() {
        return new Date(this._timestamp);
    }

    get messageType() {
        return this._messageType;
    }

    get id() {
        return this._id;
    }

    generateId() {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    isFromUser() {
        return this._sender === 'user';
    }

    isFromAgent() {
        return this._sender === 'agent';
    }

    equals(other) {
        return other instanceof Message &&
               this._id === other._id &&
               this._content === other._content &&
               this._sender === other._sender;
    }

    toJSON() {
        return {
            id: this._id,
            content: this._content,
            sender: this._sender,
            timestamp: this._timestamp,
            messageType: this._messageType
        };
    }
}

module.exports = Message;