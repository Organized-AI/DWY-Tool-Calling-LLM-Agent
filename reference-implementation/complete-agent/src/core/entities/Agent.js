/**
 * Agent Entity - Core business entity for the DWY Agent
 * Represents the main agent with its workshop capabilities
 */

class Agent {
    constructor(id, name, workshops = []) {
        this.id = id;
        this.name = name;
        this.workshops = workshops;
        this.status = 'initialized';
        this.createdAt = new Date();
        this.lastActiveAt = new Date();
    }

    addWorkshop(workshop) {
        if (!this.workshops.includes(workshop)) {
            this.workshops.push(workshop);
        }
    }

    removeWorkshop(workshop) {
        this.workshops = this.workshops.filter(w => w !== workshop);
    }

    hasWorkshop(workshop) {
        return this.workshops.includes(workshop);
    }

    updateLastActive() {
        this.lastActiveAt = new Date();
    }

    getStatus() {
        return {
            id: this.id,
            name: this.name,
            workshops: this.workshops,
            status: this.status,
            activeWorkshops: this.workshops.length,
            lastActive: this.lastActiveAt
        };
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            workshops: this.workshops,
            status: this.status,
            createdAt: this.createdAt,
            lastActiveAt: this.lastActiveAt
        };
    }
}

module.exports = Agent;