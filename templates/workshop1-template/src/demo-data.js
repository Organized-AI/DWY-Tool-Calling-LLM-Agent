/**
 * Demo Data for Workshop 1: Project Planning Systems
 * Sample projects and data for learning and testing
 */

const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

function getDemoData() {
  const demoProjects = [
    {
      id: 'demo-project-1',
      name: 'AI Marketing Assistant',
      description: 'An intelligent marketing automation tool that helps small businesses create and optimize their marketing campaigns using AI',
      goals: ['Build MVP', 'User Testing', 'Market Launch'],
      timeline: '12 weeks',
      team: ['developer', 'designer', 'marketer'],
      status: 'in_progress',
      created_at: moment().subtract(2, 'weeks').toISOString(),
      updated_at: moment().subtract(1, 'day').toISOString(),
      
      tasks: [
        {
          id: uuidv4(),
          name: 'Design system architecture',
          effort: 16,
          priority: 'high',
          dependencies: [],
          goal: 'Build MVP',
          status: 'completed',
          assigned_to: 'developer',
          created_at: moment().subtract(2, 'weeks').toISOString()
        },
        {
          id: uuidv4(),
          name: 'Set up development environment',
          effort: 8,
          priority: 'high',
          dependencies: [],
          goal: 'Build MVP',
          status: 'completed',
          assigned_to: 'developer',
          created_at: moment().subtract(2, 'weeks').toISOString()
        },
        {
          id: uuidv4(),
          name: 'Implement AI content generation',
          effort: 40,
          priority: 'high',
          dependencies: ['Design system architecture'],
          goal: 'Build MVP',
          status: 'in_progress',
          assigned_to: 'developer',
          created_at: moment().subtract(1, 'week').toISOString()
        },
        {
          id: uuidv4(),
          name: 'Create user interface mockups',
          effort: 24,
          priority: 'medium',
          dependencies: ['Design system architecture'],
          goal: 'Build MVP',
          status: 'in_progress',
          assigned_to: 'designer',
          created_at: moment().subtract(1, 'week').toISOString()
        },
        {
          id: uuidv4(),
          name: 'Design user testing scenarios',
          effort: 8,
          priority: 'medium',
          dependencies: [],
          goal: 'User Testing',
          status: 'not_started',
          assigned_to: 'designer',
          created_at: moment().subtract(3, 'days').toISOString()
        },
        {
          id: uuidv4(),
          name: 'Create marketing landing page',
          effort: 20,
          priority: 'medium',
          dependencies: [],
          goal: 'Market Launch',
          status: 'not_started',
          assigned_to: 'marketer',
          created_at: moment().subtract(1, 'day').toISOString()
        }
      ],
      
      milestones: [
        {
          id: uuidv4(),
          name: 'Project Foundation Complete',
          description: 'Development environment and architecture established',
          target_date: moment().subtract(1, 'week').toISOString(),
          status: 'completed'
        },
        {
          id: uuidv4(),
          name: 'MVP Development Complete',
          description: 'Core AI features implemented and tested',
          target_date: moment().add(4, 'weeks').toISOString(),
          status: 'in_progress'
        },
        {
          id: uuidv4(),
          name: 'User Testing Complete',
          description: 'User feedback collected and analyzed',
          target_date: moment().add(8, 'weeks').toISOString(),
          status: 'pending'
        },
        {
          id: uuidv4(),
          name: 'Market Launch',
          description: 'Product launched and available to customers',
          target_date: moment().add(10, 'weeks').toISOString(),
          status: 'pending'
        }
      ],
      
      resources: {
        team_members: [
          {
            id: uuidv4(),
            role: 'developer',
            availability: '100%',
            skills: ['JavaScript', 'React', 'Node.js', 'AI/ML APIs'],
            hourly_rate: 75
          },
          {
            id: uuidv4(),
            role: 'designer',
            availability: '75%',
            skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
            hourly_rate: 65
          },
          {
            id: uuidv4(),
            role: 'marketer',
            availability: '50%',
            skills: ['Content Marketing', 'SEO', 'Analytics', 'Social Media'],
            hourly_rate: 55
          }
        ],
        budget: {
          total: 62000,
          allocated: 18500,
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
          { name: 'Figma', type: 'design', cost: 180 },
          { name: 'Analytics Platform', type: 'marketing', cost: 300 }
        ]
      },
      
      risks: [
        {
          id: uuidv4(),
          category: 'technical',
          description: 'AI API integration complexity may exceed estimates',
          probability: 'medium',
          impact: 'high',
          mitigation: 'Allocate extra buffer time for AI integration testing',
          status: 'active'
        },
        {
          id: uuidv4(),
          category: 'market',
          description: 'Competitive products may launch before us',
          probability: 'low',
          impact: 'medium',
          mitigation: 'Focus on unique AI features and faster time-to-market',
          status: 'identified'
        },
        {
          id: uuidv4(),
          category: 'resource',
          description: 'Designer availability reduced to part-time',
          probability: 'high',
          impact: 'low',
          mitigation: 'Prioritize core UI elements and delay nice-to-have features',
          status: 'mitigated'
        }
      ],
      
      github_repo: {
        url: 'https://github.com/demo/ai-marketing-assistant',
        private: true,
        created_at: moment().subtract(2, 'weeks').toISOString()
      },
      
      patent_analysis: {
        innovation_title: 'AI-Powered Marketing Content Optimization',
        patentability_score: 0.82,
        similar_patents: 7,
        novelty_assessment: 'High novelty in AI-driven content personalization approach',
        filing_recommendation: 'Proceed with provisional patent application',
        estimated_cost: '$6,500'
      },
      
      optimization_history: [
        {
          timestamp: moment().subtract(5, 'days').toISOString(),
          type: 'task_reordering',
          description: 'Optimized task sequence based on resource availability',
          impact: 'Reduced project timeline by 1 week'
        },
        {
          timestamp: moment().subtract(2, 'days').toISOString(),
          type: 'resource_allocation',
          description: 'Reallocated designer time to focus on core user flows',
          impact: 'Improved critical path efficiency by 15%'
        }
      ]
    },
    
    {
      id: 'demo-project-2',
      name: 'Voice-Controlled Task Manager',
      description: 'A smart task management app that uses voice AI for natural language task creation and project updates',
      goals: ['Build MVP'],
      timeline: '8 weeks',
      team: ['developer'],
      status: 'planning',
      created_at: moment().subtract(1, 'day').toISOString(),
      updated_at: moment().subtract(1, 'hour').toISOString(),
      
      tasks: [
        {
          id: uuidv4(),
          name: 'Research voice AI APIs',
          effort: 8,
          priority: 'high',
          dependencies: [],
          goal: 'Build MVP',
          status: 'completed',
          assigned_to: 'developer',
          created_at: moment().subtract(1, 'day').toISOString()
        },
        {
          id: uuidv4(),
          name: 'Design voice command schema',
          effort: 16,
          priority: 'high',
          dependencies: ['Research voice AI APIs'],
          goal: 'Build MVP',
          status: 'not_started',
          assigned_to: 'developer',
          created_at: moment().subtract(1, 'day').toISOString()
        },
        {
          id: uuidv4(),
          name: 'Implement voice recognition',
          effort: 32,
          priority: 'high',
          dependencies: ['Design voice command schema'],
          goal: 'Build MVP',
          status: 'not_started',
          assigned_to: 'developer',
          created_at: moment().subtract(1, 'day').toISOString()
        }
      ],
      
      milestones: [
        {
          id: uuidv4(),
          name: 'Voice API Integration Complete',
          description: 'Basic voice recognition working with task creation',
          target_date: moment().add(3, 'weeks').toISOString(),
          status: 'pending'
        },
        {
          id: uuidv4(),
          name: 'MVP Complete',
          description: 'Full voice-controlled task management functionality',
          target_date: moment().add(8, 'weeks').toISOString(),
          status: 'pending'
        }
      ],
      
      resources: {
        team_members: [
          {
            id: uuidv4(),
            role: 'developer',
            availability: '100%',
            skills: ['JavaScript', 'Voice APIs', 'React Native', 'Node.js'],
            hourly_rate: 75
          }
        ],
        budget: {
          total: 25000,
          allocated: 0,
          breakdown: {
            development: 0.8,
            design: 0.1,
            marketing: 0.05,
            operations: 0.05
          }
        },
        tools: [
          { name: 'GitHub', type: 'development', cost: 0 },
          { name: 'Voice AI API', type: 'development', cost: 2000 },
          { name: 'React Native Tools', type: 'development', cost: 500 }
        ]
      },
      
      risks: [
        {
          id: uuidv4(),
          category: 'technical',
          description: 'Voice recognition accuracy may not meet user expectations',
          probability: 'medium',
          impact: 'high',
          mitigation: 'Plan for extensive voice training and fallback text input',
          status: 'identified'
        }
      ],
      
      github_repo: null,
      patent_analysis: null,
      optimization_history: []
    }
  ];
  
  return demoProjects;
}

function getDemoInnovationAnalysis() {
  return {
    patentability_score: 0.78,
    similar_patents: 12,
    novelty_assessment: 'Moderate novelty - focus on unique voice command processing',
    recommendations: [
      'Emphasize natural language processing improvements',
      'Highlight privacy-focused local voice processing',
      'Detail the task context understanding algorithms'
    ],
    estimated_filing_cost: '$4,500 - $7,000',
    filing_timeline: '6-8 weeks for provisional application',
    market_analysis: {
      market_size: '$2.3B voice AI market',
      competitive_landscape: 'Growing but room for specialized solutions',
      commercial_potential: 'High - enterprise task management focus'
    }
  };
}

function getDemoGitHubRepos() {
  return [
    {
      name: 'ai-marketing-assistant',
      url: 'https://github.com/demo/ai-marketing-assistant',
      description: 'AI-powered marketing automation tool',
      private: true,
      created_at: moment().subtract(2, 'weeks').toISOString(),
      language: 'JavaScript',
      stars: 0,
      forks: 0
    },
    {
      name: 'voice-task-manager',
      url: 'https://github.com/demo/voice-task-manager',
      description: 'Voice-controlled task management application',
      private: true,
      created_at: moment().subtract(1, 'day').toISOString(),
      language: 'JavaScript',
      stars: 0,
      forks: 0
    }
  ];
}

module.exports = {
  getDemoData,
  getDemoInnovationAnalysis,
  getDemoGitHubRepos
};
