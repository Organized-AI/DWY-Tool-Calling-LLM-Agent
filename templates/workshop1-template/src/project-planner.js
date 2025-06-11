/**
 * Core Project Planning Logic
 * AI-enhanced project planning with automated optimization
 */

const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const { getDemoData } = require('./demo-data');

class ProjectPlanner {
  constructor(config = {}) {
    this.config = config;
    this.demoMode = config.demoMode || false;
    this.projects = new Map();
    
    // Initialize with demo data if in demo mode
    if (this.demoMode) {
      this.initializeDemoData();
    }
  }

  initializeDemoData() {
    const demoProjects = getDemoData();
    demoProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
  }

  /**
   * Create a new project with AI-enhanced planning
   */
  async createProject(projectData) {
    try {
      const project = {
        id: uuidv4(),
        name: projectData.name,
        description: projectData.description,
        goals: projectData.goals || [],
        timeline: projectData.timeline,
        team: projectData.team || [],
        status: 'planning',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        
        // AI-generated planning data
        tasks: await this.generateTasks(projectData),
        milestones: await this.generateMilestones(projectData),
        resources: await this.allocateResources(projectData),
        risks: await this.assessRisks(projectData),
        
        // Integration metadata
        github_repo: null,
        patent_analysis: null,
        optimization_history: []
      };

      this.projects.set(project.id, project);
      
      console.log(`✅ Created project: ${project.name} (${project.id})`);
      return project;
      
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }
  }

  /**
   * Get all projects
   */
  async getProjects() {
    return Array.from(this.projects.values());
  }

  /**
   * Get specific project by ID
   */
  async getProject(projectId) {
    return this.projects.get(projectId);
  }

  /**
   * Generate AI-optimized tasks for a project
   */
  async generateTasks(projectData) {
    // Simulate AI task generation based on project goals
    const taskTemplates = {
      'Build MVP': [
        { name: 'Design architecture', effort: 16, priority: 'high', dependencies: [] },
        { name: 'Set up development environment', effort: 8, priority: 'high', dependencies: [] },
        { name: 'Implement core features', effort: 40, priority: 'high', dependencies: ['Design architecture'] },
        { name: 'Create user interface', effort: 24, priority: 'medium', dependencies: ['Design architecture'] },
        { name: 'Integration testing', effort: 16, priority: 'medium', dependencies: ['Implement core features', 'Create user interface'] }
      ],
      'User Testing': [
        { name: 'Design test scenarios', effort: 8, priority: 'medium', dependencies: [] },
        { name: 'Recruit test users', effort: 4, priority: 'low', dependencies: [] },
        { name: 'Conduct user testing sessions', effort: 12, priority: 'high', dependencies: ['Design test scenarios', 'Recruit test users'] },
        { name: 'Analyze feedback', effort: 8, priority: 'medium', dependencies: ['Conduct user testing sessions'] }
      ],
      'Market Launch': [
        { name: 'Create marketing materials', effort: 20, priority: 'medium', dependencies: [] },
        { name: 'Set up analytics', effort: 6, priority: 'low', dependencies: [] },
        { name: 'Launch beta version', effort: 8, priority: 'high', dependencies: ['Create marketing materials'] },
        { name: 'Monitor and optimize', effort: 16, priority: 'medium', dependencies: ['Launch beta version', 'Set up analytics'] }
      ]
    };

    let allTasks = [];
    
    // Generate tasks based on project goals
    projectData.goals?.forEach(goal => {
      if (taskTemplates[goal]) {
        const goalTasks = taskTemplates[goal].map(task => ({
          id: uuidv4(),
          ...task,
          goal: goal,
          status: 'not_started',
          assigned_to: null,
          created_at: new Date().toISOString()
        }));
        allTasks = allTasks.concat(goalTasks);
      }
    });

    // Add some generic project management tasks
    const managementTasks = [
      {
        id: uuidv4(),
        name: 'Project kickoff meeting',
        effort: 2,
        priority: 'high',
        dependencies: [],
        goal: 'Project Management',
        status: 'not_started',
        assigned_to: null,
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Weekly progress reviews',
        effort: 1,
        priority: 'medium',
        dependencies: [],
        goal: 'Project Management',
        status: 'not_started',
        assigned_to: null,
        created_at: new Date().toISOString()
      }
    ];

    allTasks = allTasks.concat(managementTasks);

    // AI optimization: sort by priority and dependencies
    return this.optimizeTaskSequence(allTasks);
  }

  /**
   * Generate project milestones
   */
  async generateMilestones(projectData) {
    const milestones = [
      {
        id: uuidv4(),
        name: 'Project Foundation Complete',
        description: 'Development environment and architecture established',
        target_date: moment().add(1, 'week').toISOString(),
        status: 'pending'
      },
      {
        id: uuidv4(),
        name: 'MVP Development Complete',
        description: 'Core features implemented and tested',
        target_date: moment().add(6, 'weeks').toISOString(),
        status: 'pending'
      },
      {
        id: uuidv4(),
        name: 'User Testing Complete',
        description: 'User feedback collected and analyzed',
        target_date: moment().add(10, 'weeks').toISOString(),
        status: 'pending'
      },
      {
        id: uuidv4(),
        name: 'Market Launch',
        description: 'Product launched and available to users',
        target_date: moment().add(12, 'weeks').toISOString(),
        status: 'pending'
      }
    ];

    return milestones;
  }

  /**
   * Allocate resources based on team and requirements
   */
  async allocateResources(projectData) {
    const resources = {
      team_members: projectData.team?.map(role => ({
        id: uuidv4(),
        role: role,
        availability: '100%',
        skills: this.getSkillsForRole(role),
        hourly_rate: this.getHourlyRateForRole(role)
      })) || [],
      
      budget: {
        total: this.estimateBudget(projectData),
        allocated: 0,
        breakdown: {
          development: 0.6,
          design: 0.2,
          marketing: 0.15,
          operations: 0.05
        }
      },
      
      tools: [
        { name: 'GitHub', type: 'development', cost: 0 },
        { name: 'DeepInvent.ai', type: 'patent', cost: 500 },
        { name: 'Development Environment', type: 'development', cost: 200 }
      ]
    };

    return resources;
  }

  /**
   * Assess project risks
   */
  async assessRisks(projectData) {
    const risks = [
      {
        id: uuidv4(),
        category: 'technical',
        description: 'Integration complexity may exceed estimates',
        probability: 'medium',
        impact: 'high',
        mitigation: 'Allocate buffer time for integration tasks',
        status: 'identified'
      },
      {
        id: uuidv4(),
        category: 'resource',
        description: 'Key team member availability',
        probability: 'low',
        impact: 'medium',
        mitigation: 'Cross-train team members on critical components',
        status: 'identified'
      },
      {
        id: uuidv4(),
        category: 'market',
        description: 'User adoption slower than expected',
        probability: 'medium',
        impact: 'medium',
        mitigation: 'Plan extensive user testing and feedback cycles',
        status: 'identified'
      }
    ];

    return risks;
  }

  /**
   * Optimize task sequence based on dependencies and priorities
   */
  optimizeTaskSequence(tasks) {
    // Sort by priority and dependencies
    const priorityWeights = { high: 3, medium: 2, low: 1 };
    
    return tasks.sort((a, b) => {
      // First sort by dependencies (tasks with no dependencies first)
      if (a.dependencies.length !== b.dependencies.length) {
        return a.dependencies.length - b.dependencies.length;
      }
      
      // Then sort by priority
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    });
  }

  /**
   * Generate project timeline
   */
  async generateTimeline(projectId) {
    const project = this.projects.get(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const timeline = {
      project_id: projectId,
      start_date: moment().toISOString(),
      estimated_end_date: moment().add(12, 'weeks').toISOString(),
      phases: [
        {
          name: 'Planning & Setup',
          start: moment().toISOString(),
          end: moment().add(1, 'week').toISOString(),
          tasks: project.tasks.filter(task => task.goal === 'Project Management').length
        },
        {
          name: 'Development',
          start: moment().add(1, 'week').toISOString(),
          end: moment().add(8, 'weeks').toISOString(),
          tasks: project.tasks.filter(task => task.goal === 'Build MVP').length
        },
        {
          name: 'Testing',
          start: moment().add(8, 'weeks').toISOString(),
          end: moment().add(10, 'weeks').toISOString(),
          tasks: project.tasks.filter(task => task.goal === 'User Testing').length
        },
        {
          name: 'Launch',
          start: moment().add(10, 'weeks').toISOString(),
          end: moment().add(12, 'weeks').toISOString(),
          tasks: project.tasks.filter(task => task.goal === 'Market Launch').length
        }
      ],
      critical_path: this.calculateCriticalPath(project.tasks),
      resource_utilization: this.calculateResourceUtilization(project)
    };

    return timeline;
  }

  /**
   * Calculate critical path through project tasks
   */
  calculateCriticalPath(tasks) {
    // Simplified critical path calculation
    // In real implementation, this would use more sophisticated algorithms
    const criticalTasks = tasks
      .filter(task => task.priority === 'high')
      .sort((a, b) => a.dependencies.length - b.dependencies.length);
    
    return criticalTasks.map(task => ({
      task_id: task.id,
      name: task.name,
      effort: task.effort,
      dependencies: task.dependencies
    }));
  }

  /**
   * Calculate resource utilization
   */
  calculateResourceUtilization(project) {
    const totalEffort = project.tasks.reduce((sum, task) => sum + task.effort, 0);
    const teamSize = project.team?.length || 1;
    const weeksToComplete = Math.ceil(totalEffort / (teamSize * 40)); // 40 hours per week per person
    
    return {
      total_effort_hours: totalEffort,
      team_size: teamSize,
      estimated_weeks: weeksToComplete,
      utilization_rate: Math.min((totalEffort / (teamSize * 40 * 12)), 1) // 12 week project
    };
  }

  /**
   * Get demo project for tutorial
   */
  async getDemoProject() {
    const demoProjects = Array.from(this.projects.values());
    return demoProjects[0] || null;
  }

  // Helper methods
  getSkillsForRole(role) {
    const skillMap = {
      developer: ['JavaScript', 'React', 'Node.js', 'API Integration'],
      designer: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
      marketer: ['Content Marketing', 'SEO', 'Analytics', 'Social Media'],
      'project manager': ['Agile', 'Scrum', 'Resource Planning', 'Risk Management']
    };
    return skillMap[role] || ['General Business Skills'];
  }

  getHourlyRateForRole(role) {
    const rateMap = {
      developer: 75,
      designer: 65,
      marketer: 55,
      'project manager': 70
    };
    return rateMap[role] || 50;
  }

  estimateBudget(projectData) {
    const baseAmount = 50000;
    const teamMultiplier = (projectData.team?.length || 1) * 1000;
    const goalMultiplier = (projectData.goals?.length || 1) * 5000;
    
    return baseAmount + teamMultiplier + goalMultiplier;
  }
}

module.exports = { ProjectPlanner };
