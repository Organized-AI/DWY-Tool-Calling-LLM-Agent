/**
 * Project Planning Adapter - Infrastructure layer adapter for Workshop 1
 * Adapts the existing ProjectPlanning service to clean architecture interfaces
 */

const ProjectPlanning = require('../../../workshops/workshop1-planning');

class ProjectPlanningAdapter {
    constructor() {
        // Use the existing workshop implementation
        this.projectPlanning = new ProjectPlanning();
    }

    async initialize() {
        await this.projectPlanning.initialize();
    }

    async createPlan(planRequest) {
        return await this.projectPlanning.createPlan(planRequest);
    }

    async createExecutionPlan(toolPlan) {
        return await this.projectPlanning.createExecutionPlan(toolPlan);
    }

    async getProjectStatus(projectId) {
        return await this.projectPlanning.getProjectStatus(projectId);
    }
}

module.exports = ProjectPlanningAdapter;