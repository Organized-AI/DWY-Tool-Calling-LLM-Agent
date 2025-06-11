#!/usr/bin/env node

/**
 * Workshop 1: Project Planning Systems - Standalone Template
 * 
 * This template shows you how to build AI-enhanced project planning
 * using DeepInvent.ai integration. Perfect for Cursor IDE beginners!
 * 
 * What you'll learn:
 * - Creating project plans with AI assistance
 * - Integrating external APIs (DeepInvent.ai)
 * - Building simple web APIs with Express
 * - Error handling and demo modes
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // For any static files

// Configuration
const DEEPINVENT_API_KEY = process.env.DEEPINVENT_API_KEY;
const DEEPINVENT_BASE_URL = process.env.DEEPINVENT_BASE_URL || 'https://api.deepinvent.ai';
const DEMO_MODE = !DEEPINVENT_API_KEY;

// Show startup message
console.log(`
🎯 Workshop 1: Project Planning Systems

${DEMO_MODE ? '📚 Running in DEMO MODE (no API key needed)' : '🔗 Connected to DeepInvent.ai'}
🌐 Server starting on http://localhost:${PORT}

Try these endpoints:
  GET  /                    - Welcome page
  GET  /health              - Health check
  POST /create-plan         - Create a new project plan
  POST /analyze-project     - Analyze project requirements
  GET  /demo                - See example plans
`);

/**
 * Welcome endpoint - shows what this workshop does
 */
app.get('/', (req, res) => {
    res.json({
        workshop: 1,
        title: "Project Planning Systems",
        description: "AI-enhanced project planning with DeepInvent.ai integration",
        platform: "DeepInvent.ai",
        demo_mode: DEMO_MODE,
        endpoints: [
            "GET /health - Check if service is running",
            "POST /create-plan - Create a new project plan",
            "POST /analyze-project - Analyze project requirements",
            "GET /demo - See example plans"
        ],
        next_steps: [
            "1. Try POST /create-plan with your project idea",
            "2. Get a DeepInvent.ai API key for enhanced features",
            "3. Explore the code to understand the patterns",
            "4. Ask Cursor AI to help you add new features!"
        ]
    });
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        workshop: 1,
        platform: 'DeepInvent.ai',
        demo_mode: DEMO_MODE,
        timestamp: new Date().toISOString()
    });
});

/**
 * Main feature: Create a project plan
 * 
 * This is the core function that participants will learn from and extend
 */
app.post('/create-plan', async (req, res) => {
    try {
        const { projectName, description, goals = [], timeline = '1 month' } = req.body;

        if (!projectName) {
            return res.status(400).json({
                error: 'Project name is required',
                example: {
                    projectName: "My Mobile App",
                    description: "A social app for sharing photos",
                    goals: ["Launch in 3 months", "Get 1000 users"],
                    timeline: "3 months"
                }
            });
        }

        console.log(`📋 Creating plan for: ${projectName}`);

        let plan;
        if (DEMO_MODE) {
            // Demo mode - perfect for learning without API keys
            plan = createDemoPlan(projectName, description, goals, timeline);
        } else {
            // Real DeepInvent.ai integration
            plan = await createRealPlan(projectName, description, goals, timeline);
        }

        res.json({
            success: true,
            plan,
            mode: DEMO_MODE ? 'demo' : 'live',
            workshop: 1
        });

    } catch (error) {
        console.error('Error creating plan:', error.message);
        res.status(500).json({
            error: 'Failed to create plan',
            details: error.message,
            workshop: 1
        });
    }
});

/**
 * Analyze project requirements
 * Shows how to process and structure project information
 */
app.post('/analyze-project', async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({
                error: 'Project description is required',
                example: {
                    description: "I want to build a mobile app that helps people track their fitness goals and connect with workout buddies in their area."
                }
            });
        }

        const analysis = analyzeProjectDescription(description);

        res.json({
            success: true,
            analysis,
            workshop: 1,
            next_step: "Use this analysis to create a detailed plan with POST /create-plan"
        });

    } catch (error) {
        console.error('Error analyzing project:', error.message);
        res.status(500).json({
            error: 'Failed to analyze project',
            details: error.message
        });
    }
});

/**
 * Demo endpoint - shows example plans
 */
app.get('/demo', (req, res) => {
    const examples = [
        {
            name: "Mobile Fitness App",
            description: "Track workouts and connect with fitness buddies",
            timeline: "4 months",
            estimated_cost: "$15,000 - $30,000",
            key_features: ["User profiles", "Workout tracking", "Social features", "Location services"]
        },
        {
            name: "E-commerce Website",
            description: "Online store for handmade crafts",
            timeline: "2 months",
            estimated_cost: "$8,000 - $15,000",
            key_features: ["Product catalog", "Shopping cart", "Payment processing", "Admin dashboard"]
        },
        {
            name: "AI Content Generator",
            description: "Tool to help create social media content",
            timeline: "3 months",
            estimated_cost: "$20,000 - $40,000",
            key_features: ["AI integration", "Content templates", "Scheduling", "Analytics"]
        }
    ];

    res.json({
        workshop: 1,
        demo_projects: examples,
        note: "These are example projects. Try creating your own with POST /create-plan!"
    });
});

/**
 * Demo plan creation - works without API keys
 * Perfect for beginners to understand the structure
 */
function createDemoPlan(projectName, description, goals, timeline) {
    return {
        project: {
            name: projectName,
            description: description || "A new project to build something amazing",
            timeline,
            status: 'planned',
            created: new Date().toISOString()
        },
        phases: [
            {
                name: "Discovery & Planning",
                duration: "1-2 weeks",
                description: "Research, planning, and initial setup",
                tasks: [
                    "Research target audience and competition",
                    "Define detailed requirements",
                    "Create wireframes or mockups",
                    "Set up development environment",
                    "Create project timeline"
                ]
            },
            {
                name: "Development",
                duration: "60% of timeline",
                description: "Core development and feature implementation",
                tasks: [
                    "Set up basic project structure",
                    "Implement core features",
                    "Build user interface",
                    "Add business logic",
                    "Integrate external services"
                ]
            },
            {
                name: "Testing & Launch",
                duration: "1-2 weeks",
                description: "Testing, deployment, and launch preparation",
                tasks: [
                    "Comprehensive testing",
                    "Fix bugs and optimize performance",
                    "Set up deployment pipeline",
                    "Launch and monitor",
                    "Gather user feedback"
                ]
            }
        ],
        goals: goals.length > 0 ? goals : [
            "Complete project on time and within budget",
            "Meet all technical requirements",
            "Create a great user experience",
            "Learn new skills and technologies"
        ],
        next_steps: [
            "Review and approve this plan",
            "Set up project management tools",
            "Begin discovery phase tasks",
            "Schedule regular check-ins"
        ],
        tips: [
            "Break large tasks into smaller, manageable pieces",
            "Set realistic deadlines with buffer time",
            "Regularly communicate with stakeholders",
            "Don't be afraid to adjust the plan as you learn"
        ]
    };
}

/**
 * Real DeepInvent.ai integration
 * This function shows how to work with external APIs
 */
async function createRealPlan(projectName, description, goals, timeline) {
    try {
        const response = await axios.post(`${DEEPINVENT_BASE_URL}/v1/plans`, {
            name: projectName,
            description,
            goals,
            timeline,
            enhance_with_ai: true,
            include_ip_analysis: true // DeepInvent.ai specialty
        }, {
            headers: {
                'Authorization': `Bearer ${DEEPINVENT_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10 second timeout
        });

        return {
            ...response.data,
            source: 'DeepInvent.ai',
            enhanced: true
        };

    } catch (error) {
        console.error('DeepInvent.ai API error:', error.message);
        
        // Graceful fallback to demo mode
        console.log('Falling back to demo mode...');
        return {
            ...createDemoPlan(projectName, description, goals, timeline),
            note: 'API call failed, showing demo plan. Check your API key and connection.'
        };
    }
}

/**
 * Simple project analysis function
 * Shows how to extract insights from text
 */
function analyzeProjectDescription(description) {
    const words = description.toLowerCase().split(/\s+/);
    
    // Simple keyword detection (beginners can understand this logic)
    const platforms = [];
    if (words.some(word => ['mobile', 'app', 'ios', 'android'].includes(word))) {
        platforms.push('Mobile App');
    }
    if (words.some(word => ['website', 'web', 'browser', 'online'].includes(word))) {
        platforms.push('Website');
    }
    if (words.some(word => ['ai', 'artificial', 'intelligence', 'machine', 'learning'].includes(word))) {
        platforms.push('AI/ML');
    }

    const features = [];
    if (words.some(word => ['user', 'users', 'account', 'profile'].includes(word))) {
        features.push('User Management');
    }
    if (words.some(word => ['social', 'share', 'connect', 'community'].includes(word))) {
        features.push('Social Features');
    }
    if (words.some(word => ['payment', 'buy', 'sell', 'shop', 'ecommerce'].includes(word))) {
        features.push('E-commerce');
    }
    if (words.some(word => ['track', 'analytics', 'data', 'report'].includes(word))) {
        features.push('Analytics');
    }

    // Estimate complexity (very simple algorithm)
    const complexity = words.length < 20 ? 'Simple' : 
                      words.length < 50 ? 'Medium' : 'Complex';

    return {
        platforms: platforms.length > 0 ? platforms : ['Web Application'],
        suggested_features: features.length > 0 ? features : ['Basic functionality'],
        complexity,
        estimated_timeline: complexity === 'Simple' ? '1-2 months' :
                           complexity === 'Medium' ? '2-4 months' : '4+ months',
        word_count: words.length,
        suggestions: [
            "Consider breaking the project into smaller phases",
            "Research similar apps/websites for inspiration",
            "Think about your target audience and their needs",
            "Plan for testing and feedback from real users"
        ]
    };
}

// Start the server
app.listen(PORT, () => {
    console.log(`
🚀 Workshop 1 server running at http://localhost:${PORT}

${DEMO_MODE ? 
    '💡 Tip: Get a DeepInvent.ai API key for enhanced planning features!' :
    '✅ Connected to DeepInvent.ai for enhanced planning!'
}

🎯 Ready for project planning! Try creating your first plan.
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 Workshop 1 server shutting down gracefully...');
    process.exit(0);
});

module.exports = app;