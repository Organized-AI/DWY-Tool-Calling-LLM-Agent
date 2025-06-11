#!/usr/bin/env node

/**
 * Workshop 1: Project Planning Systems
 * AI-enhanced project planning with DeepInvent.ai and GitHub integration
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const { ProjectPlanner } = require('./src/project-planner');
const { GitHubIntegration } = require('./src/github-integration');
const { DeepInventClient } = require('./src/deepinvent-client');
const { WorkflowOptimizer } = require('./src/workflow-optimizer');

const app = express();
const PORT = process.env.PORT || 3001;
const DEMO_MODE = process.env.DEMO_MODE === 'true';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize services
const projectPlanner = new ProjectPlanner({
  github: {
    token: process.env.GITHUB_TOKEN,
    username: process.env.GITHUB_USERNAME
  },
  deepinvent: {
    apiKey: process.env.DEEPINVENT_API_KEY
  },
  demoMode: DEMO_MODE
});

const workflowOptimizer = new WorkflowOptimizer({
  demoMode: DEMO_MODE
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Project Planning Systems',
    workshop: 1,
    demoMode: DEMO_MODE,
    timestamp: new Date().toISOString()
  });
});

// Project Planning Endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectPlanner.getProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = await projectPlanner.createProject(req.body);
    res.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await projectPlanner.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Workflow Optimization Endpoints
app.post('/api/projects/:id/optimize', async (req, res) => {
  try {
    const optimizedPlan = await workflowOptimizer.optimizePlan(req.params.id, req.body);
    res.json(optimizedPlan);
  } catch (error) {
    console.error('Error optimizing plan:', error);
    res.status(500).json({ error: 'Failed to optimize plan' });
  }
});

app.get('/api/projects/:id/timeline', async (req, res) => {
  try {
    const timeline = await projectPlanner.generateTimeline(req.params.id);
    res.json(timeline);
  } catch (error) {
    console.error('Error generating timeline:', error);
    res.status(500).json({ error: 'Failed to generate timeline' });
  }
});

// GitHub Integration Endpoints
app.post('/api/github/create-repo', async (req, res) => {
  try {
    if (DEMO_MODE) {
      res.json({ 
        url: 'https://github.com/demo/ai-project-demo',
        message: 'Demo repository created (simulated)',
        demoMode: true
      });
      return;
    }
    
    const github = new GitHubIntegration(process.env.GITHUB_TOKEN);
    const repo = await github.createRepository(req.body);
    res.json(repo);
  } catch (error) {
    console.error('Error creating GitHub repository:', error);
    res.status(500).json({ error: 'Failed to create repository' });
  }
});

app.get('/api/github/repos', async (req, res) => {
  try {
    if (DEMO_MODE) {
      res.json([
        {
          name: 'ai-project-demo',
          url: 'https://github.com/demo/ai-project-demo',
          description: 'Demo AI project repository',
          private: false,
          created_at: new Date().toISOString()
        }
      ]);
      return;
    }
    
    const github = new GitHubIntegration(process.env.GITHUB_TOKEN);
    const repos = await github.getRepositories();
    res.json(repos);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// DeepInvent.ai Integration Endpoints
app.post('/api/deepinvent/analyze', async (req, res) => {
  try {
    if (DEMO_MODE) {
      res.json({
        patentability_score: 0.85,
        similar_patents: 3,
        novelty_assessment: 'High novelty detected',
        recommendations: [
          'Focus on AI-specific optimizations in patent application',
          'Emphasize unique workflow automation features',
          'Include performance benchmarks in technical description'
        ],
        estimated_filing_cost: '$5,000 - $8,000',
        demoMode: true
      });
      return;
    }
    
    const deepinvent = new DeepInventClient(process.env.DEEPINVENT_API_KEY);
    const analysis = await deepinvent.analyzeInnovation(req.body);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing innovation:', error);
    res.status(500).json({ error: 'Failed to analyze innovation' });
  }
});

// Demo Data Endpoint
app.get('/api/demo/sample-project', async (req, res) => {
  try {
    const sampleProject = await projectPlanner.getDemoProject();
    res.json(sampleProject);
  } catch (error) {
    console.error('Error fetching demo project:', error);
    res.status(500).json({ error: 'Failed to fetch demo project' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message,
    demoMode: DEMO_MODE
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(chalk.green('🚀 Workshop 1: Project Planning Systems'));
  console.log(chalk.blue(`📡 Server running on http://localhost:${PORT}`));
  console.log(chalk.yellow(`🎯 Demo Mode: ${DEMO_MODE ? 'ON' : 'OFF'}`));
  
  if (DEMO_MODE) {
    console.log(chalk.cyan('💡 Demo mode is active - no API keys required!'));
    console.log(chalk.cyan('🔧 Set DEMO_MODE=false to use real integrations'));
  } else {
    console.log(chalk.magenta('🔑 Real integrations active'));
    console.log(chalk.magenta('📝 Make sure your .env file is configured'));
  }
  
  console.log(chalk.green('\\n✨ Ready to build AI-enhanced project planning systems!'));
  console.log(chalk.white(`\\n🌐 Open http://localhost:${PORT} to get started`));
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\\n🛑 Shutting down gracefully...'));
  process.exit(0);
});

module.exports = app;
