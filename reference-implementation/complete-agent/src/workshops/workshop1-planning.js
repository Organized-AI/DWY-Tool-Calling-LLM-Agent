/**
 * Workshop 1: Project Planning Systems
 * Integration with DeepInvent.ai for AI-enhanced planning
 * 
 * This is a beginner-friendly example showing how to:
 * 1. Connect to external APIs (DeepInvent.ai)
 * 2. Create planning workflows
 * 3. Integrate with the main DWY agent
 */

const axios = require('axios');

class ProjectPlanning {
    constructor() {
        this.apiKey = process.env.DEEPINVENT_API_KEY;
        this.baseUrl = process.env.DEEPINVENT_BASE_URL || 'https://api.deepinvent.ai';
        this.initialized = false;
    }

    async initialize() {
        console.log('🎯 Initializing Workshop 1: Project Planning Systems');
        
        // Simple initialization check
        if (!this.apiKey) {
            console.log('⚠️  DeepInvent.ai API key not found - using demo mode');
            this.demoMode = true;
        } else {
            this.demoMode = false;
        }
        
        this.initialized = true;
        console.log('✅ Workshop 1 ready!');
    }

    /**
     * Create a project plan - main function for this workshop
     * Beginners can see how to structure AI-enhanced planning
     */
    async createPlan(planRequest) {
        if (!this.initialized) {
            throw new Error('ProjectPlanning not initialized');
        }

        const { 
            projectName, 
            description, 
            goals = [], 
            timeline = '1 month',
            resources = []
        } = planRequest;

        console.log(`📋 Creating plan for: ${projectName}`);

        // Demo mode for beginners without API keys
        if (this.demoMode) {
            return this.createDemoPlan(projectName, description, goals, timeline);
        }

        try {
            // Real DeepInvent.ai integration
            const response = await axios.post(`${this.baseUrl}/v1/plans`, {
                name: projectName,
                description,
                goals,
                timeline,
                resources,
                enhance_with_ai: true
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return {
                success: true,
                plan: response.data,
                source: 'DeepInvent.ai',
                workshop: 1
            };

        } catch (error) {
            console.error('DeepInvent.ai API error:', error.message);
            
            // Fallback to demo mode if API fails
            return this.createDemoPlan(projectName, description, goals, timeline);
        }
    }

    /**
     * Demo plan creation for beginners
     * Shows the structure without requiring API access
     */
    createDemoPlan(projectName, description, goals, timeline) {
        const plan = {
            project: {
                name: projectName,
                description,
                timeline,
                status: 'planned'
            },
            phases: [
                {
                    name: 'Planning & Setup',
                    duration: '1 week',
                    tasks: [
                        'Define project requirements',
                        'Set up development environment',
                        'Create project timeline'
                    ]
                },
                {
                    name: 'Development',
                    duration: '2-3 weeks',
                    tasks: [
                        'Build core functionality',
                        'Implement key features',
                        'Testing and iteration'
                    ]
                },
                {
                    name: 'Launch & Review',
                    duration: '1 week',
                    tasks: [
                        'Final testing',
                        'Deployment',
                        'Performance review'
                    ]
                }
            ],
            goals: goals.length > 0 ? goals : [
                'Complete project on time',
                'Meet quality standards',
                'Learn new skills'
            ],
            nextSteps: [
                'Review plan with team',
                'Set up project tracking',
                'Begin phase 1 tasks'
            ]
        };

        return {
            success: true,
            plan,
            source: 'Demo Mode',
            workshop: 1,
            note: 'This is a demo plan. Connect DeepInvent.ai API for enhanced planning.'
        };
    }

    /**
     * Create execution plan for the main agent
     * Shows how workshop components integrate
     */
    async createExecutionPlan(toolPlan) {
        const executionSteps = [];

        // Analyze what needs to be planned
        if (toolPlan.tools.includes('planning')) {
            executionSteps.push({
                step: 1,
                action: 'Create project structure',
                estimated_time: '15 minutes',
                dependencies: []
            });
        }

        if (toolPlan.tools.includes('memory')) {
            executionSteps.push({
                step: 2,
                action: 'Set up knowledge capture',
                estimated_time: '10 minutes',
                dependencies: ['project structure']
            });
        }

        if (toolPlan.tools.includes('content')) {
            executionSteps.push({
                step: 3,
                action: 'Generate content assets',
                estimated_time: '30 minutes',
                dependencies: ['project structure', 'knowledge capture']
            });
        }

        return {
            success: true,
            executionSteps,
            totalEstimatedTime: this.calculateTotalTime(executionSteps),
            workshop: 1,
            integration: 'DWY Agent'
        };
    }

    calculateTotalTime(steps) {
        const totalMinutes = steps.reduce((total, step) => {
            const minutes = parseInt(step.estimated_time.match(/\d+/)[0]);
            return total + minutes;
        }, 0);

        if (totalMinutes < 60) {
            return `${totalMinutes} minutes`;
        } else {
            const hours = Math.floor(totalMinutes / 60);
            const remaining = totalMinutes % 60;
            return `${hours}h ${remaining}m`;
        }
    }

    /**
     * Simple project status tracking
     * Beginners can see how to maintain state
     */
    async getProjectStatus(projectId) {
        // This would typically connect to a database
        // For demo purposes, return a sample status
        return {
            projectId,
            status: 'in_progress',
            completedTasks: 3,
            totalTasks: 8,
            nextMilestone: 'Complete core features',
            workshop: 1
        };
    }
}

module.exports = ProjectPlanning;