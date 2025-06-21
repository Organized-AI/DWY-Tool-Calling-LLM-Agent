/**
 * Project Entity - Represents a project managed through Workshop 1 (Planning)
 */

class Project {
    constructor(id, name, description, timeline = '1 month') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.timeline = timeline;
        this.goals = [];
        this.phases = [];
        this.resources = [];
        this.status = 'planned';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.completedTasks = 0;
        this.totalTasks = 0;
    }

    addGoal(goal) {
        this.goals.push(goal);
        this.updateTimestamp();
    }

    addPhase(phase) {
        this.phases.push(phase);
        this.updateTotalTasks();
        this.updateTimestamp();
    }

    addResource(resource) {
        this.resources.push(resource);
        this.updateTimestamp();
    }

    updateStatus(status) {
        this.status = status;
        this.updateTimestamp();
    }

    completeTask() {
        this.completedTasks++;
        this.updateTimestamp();
    }

    updateTotalTasks() {
        this.totalTasks = this.phases.reduce((total, phase) => {
            return total + (phase.tasks ? phase.tasks.length : 0);
        }, 0);
    }

    getProgress() {
        if (this.totalTasks === 0) return 0;
        return Math.round((this.completedTasks / this.totalTasks) * 100);
    }

    getNextMilestone() {
        const currentPhase = this.phases.find(phase => phase.status !== 'completed');
        return currentPhase ? currentPhase.name : 'Project completed';
    }

    updateTimestamp() {
        this.updatedAt = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            timeline: this.timeline,
            goals: this.goals,
            phases: this.phases,
            resources: this.resources,
            status: this.status,
            progress: this.getProgress(),
            nextMilestone: this.getNextMilestone(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Project;