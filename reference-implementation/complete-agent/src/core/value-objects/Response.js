/**
 * Response Value Object - Immutable representation of an agent response
 */

class Response {
    constructor(text, components = {}, metadata = {}) {
        this._text = text;
        this._components = { ...components };
        this._metadata = {
            timestamp: new Date(),
            ...metadata
        };
        this._id = this.generateId();
        
        // Make properties immutable
        Object.freeze(this);
    }

    get text() {
        return this._text;
    }

    get components() {
        return { ...this._components };
    }

    get metadata() {
        return { ...this._metadata };
    }

    get id() {
        return this._id;
    }

    generateId() {
        return `resp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    hasComponent(componentName) {
        return componentName in this._components && this._components[componentName] !== null;
    }

    getComponent(componentName) {
        return this._components[componentName] || null;
    }

    getUsedWorkshops() {
        const workshops = [];
        if (this.hasComponent('planning')) workshops.push('Workshop 1 (Planning)');
        if (this.hasComponent('memory')) workshops.push('Workshop 2 (Memory)');
        if (this.hasComponent('marketing')) workshops.push('Workshop 3 (Marketing)');
        if (this.hasComponent('content')) workshops.push('Workshop 4 (Content)');
        if (this.hasComponent('tools')) workshops.push('Workshop 5 (Tools)');
        // Workshop 6 (AI) is always used
        workshops.push('Workshop 6 (AI)');
        return workshops;
    }

    equals(other) {
        return other instanceof Response &&
               this._id === other._id &&
               this._text === other._text;
    }

    toJSON() {
        return {
            id: this._id,
            text: this._text,
            components: this._components,
            metadata: this._metadata,
            usedWorkshops: this.getUsedWorkshops()
        };
    }
}

module.exports = Response;