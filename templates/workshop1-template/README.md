# Workshop 1: Project Planning Systems
**Presenter**: Jordaaan  
**Duration**: 30 minutes  
**Platform**: [DeepInvent.ai](https://deepinvent.ai/) + GitHub

## 🎯 Learning Objectives

Build AI-enhanced project planning and resource management systems with automated workflow optimization and progress tracking.

### What You'll Learn
- Set up complete development environment (GitHub, Cursor, Claude Desktop, MCP)
- Implement AI-driven task prioritization and resource allocation
- Create automated milestone monitoring and reporting systems
- Build foundation architecture for connecting all workshop components

### What You'll Build
- Project planning foundation with GitHub integration
- Automated workflow optimization system
- Progress tracking and milestone management
- Patent application support via DeepInvent.ai integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git configured on your system
- Text editor (VS Code/Cursor recommended)

### Run the Template
```bash
# Clone or navigate to this template
cd workshop1-template

# Install dependencies
npm install

# Run the project planning system
npm start

# Open in browser
open http://localhost:3001
```

### Demo Mode
The template includes demo data so you can see it working immediately without any API keys.

## 📁 Template Structure

```
workshop1-template/
├── README.md                    # This guide
├── package.json                 # Dependencies and scripts
├── .env.example                 # Environment variables template
├── index.js                     # Main application entry
├── src/
│   ├── project-planner.js       # Core planning logic
│   ├── github-integration.js    # GitHub API integration
│   ├── deepinvent-client.js     # DeepInvent.ai integration
│   ├── workflow-optimizer.js    # AI-driven optimization
│   └── demo-data.js             # Sample project data
├── public/
│   ├── index.html               # Simple web interface
│   ├── style.css                # Basic styling
│   └── app.js                   # Frontend JavaScript
└── docs/
    ├── setup-guide.md           # Detailed setup instructions
    ├── api-integration.md       # Platform integration guide
    └── troubleshooting.md       # Common issues
```

## 🛠️ Core Features

### 1. Project Structure Creation
- Automated GitHub repository setup
- Template-based project initialization
- Development environment configuration
- Collaboration workflow setup

### 2. AI-Enhanced Planning
- Intelligent task prioritization
- Resource allocation optimization
- Timeline estimation and adjustment
- Risk assessment and mitigation

### 3. Progress Tracking
- Automated milestone monitoring
- Performance metrics collection
- Progress visualization and reporting
- Team productivity analytics

### 4. Patent Integration
- DeepInvent.ai API integration
- Innovation idea capture and analysis
- Patent application workflow
- IP protection recommendations

## ⚙️ Configuration

### Environment Setup
Copy `.env.example` to `.env` and configure:

```bash
# GitHub Integration (optional for demo)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username

# DeepInvent.ai Integration (optional for demo)
DEEPINVENT_API_KEY=your_deepinvent_api_key

# Application Configuration
PORT=3001
NODE_ENV=development
DEMO_MODE=true
```

### Demo Mode (No API Keys Required)
Set `DEMO_MODE=true` to run with sample data and mock API responses.

## 🎓 Step-by-Step Tutorial

### Step 1: Understanding Project Architecture (5 minutes)
1. Open `src/project-planner.js` to see the core planning logic
2. Review the project structure and component relationships
3. Understand how AI optimization integrates with planning

### Step 2: GitHub Integration (10 minutes)
1. Configure GitHub token (optional - demo mode works without)
2. Create a test repository using the automated setup
3. See how project structure is automatically created

### Step 3: Planning Workflow (10 minutes)
1. Create a new project using the web interface
2. Add tasks and set dependencies
3. Watch AI optimization suggest improvements
4. Generate project timeline and milestones

### Step 4: Patent Integration (5 minutes)
1. Explore DeepInvent.ai integration features
2. Submit innovation ideas for patent analysis
3. Review patent application recommendations

## 🔧 API Integration Examples

### Creating a New Project
```javascript
const { ProjectPlanner } = require('./src/project-planner');

const planner = new ProjectPlanner({
  github: {
    token: process.env.GITHUB_TOKEN,
    username: process.env.GITHUB_USERNAME
  },
  deepinvent: {
    apiKey: process.env.DEEPINVENT_API_KEY
  }
});

// Create new project with AI optimization
const project = await planner.createProject({
  name: "AI Marketing Tool",
  description: "Automated marketing content generation",
  goals: ["Build MVP", "User Testing", "Market Launch"],
  timeline: "3 months",
  team: ["developer", "designer", "marketer"]
});

console.log(project);
```

### AI-Driven Task Optimization
```javascript
// Optimize task sequence and resource allocation
const optimizedPlan = await planner.optimizePlan(project.id, {
  priorityFactors: ["business_value", "technical_risk", "dependencies"],
  resourceConstraints: {
    developers: 2,
    designers: 1,
    budget: 50000
  }
});

console.log(optimizedPlan);
```

### Patent Idea Submission
```javascript
const { DeepInventClient } = require('./src/deepinvent-client');

const client = new DeepInventClient(process.env.DEEPINVENT_API_KEY);

// Submit innovation for patent analysis
const analysis = await client.analyzeInnovation({
  title: "AI-Powered Project Optimization Algorithm",
  description: "Method for automatically optimizing project timelines using machine learning",
  category: "software",
  inventors: ["John Doe", "Jane Smith"]
});

console.log(analysis);
```

## 🎯 Learning Outcomes

After completing this workshop, you'll be able to:

✅ **Set up modern development environments** with proper tooling and workflow
✅ **Implement AI-enhanced project planning** with automated optimization
✅ **Integrate with GitHub** for automated repository and workflow setup  
✅ **Connect to DeepInvent.ai** for patent application support
✅ **Build scalable project architecture** that supports team collaboration
✅ **Create foundation systems** that other workshops can build upon

## 🔗 Next Workshop Integration

This workshop provides the foundation for:
- **Workshop 2**: Knowledge graph integration for project memory
- **Workshop 3**: Marketing strategy integration for business planning
- **Workshop 4**: Content creation workflow for project documentation
- **Workshop 5**: Tool calling integration for external system connectivity
- **Workshop 6**: Local AI deployment for privacy-focused planning

## 🆘 Troubleshooting

### Common Issues

**Port 3001 already in use**
```bash
# Kill process using port 3001
npx kill-port 3001

# Or use different port
PORT=3002 npm start
```

**GitHub API rate limiting**
```bash
# Switch to demo mode
export DEMO_MODE=true
npm start
```

**DeepInvent.ai API errors**
```bash
# Verify API key is correct
echo $DEEPINVENT_API_KEY

# Use demo mode if API unavailable
export DEMO_MODE=true
npm start
```

## 📚 Additional Resources

- [DeepInvent.ai Documentation](https://deepinvent.ai/docs)
- [GitHub API Reference](https://docs.github.com/en/rest)
- [Project Management Best Practices](./docs/setup-guide.md)
- [AI Planning Algorithms](./docs/api-integration.md)

## 🤝 Support

- **Workshop Questions**: Ask during the live session
- **Technical Issues**: Check [troubleshooting.md](./docs/troubleshooting.md)
- **Platform Support**: Contact DeepInvent.ai directly for API issues

---

**Ready to build the future of AI-enhanced project planning? Run `npm start` and let's begin!** 🚀
