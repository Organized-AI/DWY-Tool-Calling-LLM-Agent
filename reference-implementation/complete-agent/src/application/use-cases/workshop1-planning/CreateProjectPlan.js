/**
 * Create Project Plan Use Case - Workshop 1 Planning
 * Handles project plan creation following clean architecture principles
 */

const { Project } = require('../../../core/entities');

class CreateProjectPlan {
    constructor(projectPlanningService, projectRepository) {
        this.projectPlanningService = projectPlanningService;
        this.projectRepository = projectRepository;
    }

    async execute(planRequest) {
        // Validate input
        this.validatePlanRequest(planRequest);

        const { 
            projectName, 
            description, 
            goals = [], 
            timeline = '1 month',
            resources = []
        } = planRequest;

        try {
            // Create project entity
            const project = new Project(
                this.generateProjectId(),
                projectName,
                description,
                timeline
            );

            // Add goals and resources
            goals.forEach(goal => project.addGoal(goal));
            resources.forEach(resource => project.addResource(resource));

            // Use the planning service to enhance the plan
            const enhancedPlan = await this.projectPlanningService.createPlan({
                projectName,
                description,
                goals,
                timeline,
                resources
            });

            // Add phases from the enhanced plan
            if (enhancedPlan.plan && enhancedPlan.plan.phases) {
                enhancedPlan.plan.phases.forEach(phase => project.addPhase(phase));
            }

            // Save the project
            await this.projectRepository.save(project);

            return {
                success: true,
                project: project.toJSON(),
                enhancedPlan,
                workshop: 1
            };

        } catch (error) {
            console.error('Error creating project plan:', error);
            throw new Error(`Failed to create project plan: ${error.message}`);
        }
    }

    validatePlanRequest(planRequest) {
        if (!planRequest || typeof planRequest !== 'object') {
            throw new Error('Plan request must be an object');
        }

        if (!planRequest.projectName || typeof planRequest.projectName !== 'string') {
            throw new Error('Project name is required and must be a string');
        }

        if (!planRequest.description || typeof planRequest.description !== 'string') {
            throw new Error('Project description is required and must be a string');
        }

        if (planRequest.goals && !Array.isArray(planRequest.goals)) {
            throw new Error('Goals must be an array');
        }

        if (planRequest.resources && !Array.isArray(planRequest.resources)) {
            throw new Error('Resources must be an array');
        }
    }

    generateProjectId() {
        return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

module.exports = CreateProjectPlan;