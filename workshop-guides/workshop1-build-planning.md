# Workshop 1: Build Project Planning Systems (30 minutes)
**Transform your empty agent into an AI-powered project planner**

## 🎯 **What You'll Build**

By the end of this workshop, your DWY agent will be able to:
- ✅ Create AI-enhanced project plans using DeepInvent.ai
- ✅ Generate demo plans without API keys
- ✅ Handle errors gracefully with fallback modes
- ✅ Integrate with the main agent workflow

**Before:** Your agent says "not implemented yet"  
**After:** Your agent creates detailed project plans with AI assistance!

---

## 🚀 **Step 1: Set Up Your Environment (5 minutes)**

### **Navigate to Your Starter Framework**
```bash
cd starter-framework
npm install
npm start
```

### **Test Current State**
Visit: http://localhost:3000/health

You should see:
```json
{
  "status": "building",
  "implementedWorkshops": 0,
  "nextTodo": "Complete Workshop 1: Project Planning"
}
```

### **Try the Chat (Should Fail)**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Create a plan for my mobile app"}'
```

**Expected:** Error message saying Workshop 1 not implemented.

---

## 🏗️ **Step 2: Build the ProjectPlanning Class (20 minutes)**

### **Open Workshop 1 File**
Open `starter-framework/src/workshops/workshop1-planning.js` in Cursor IDE.

### **Phase A: Basic Setup (5 minutes)**

**Replace the constructor with this code:**
```javascript
constructor() {
    this.apiKey = process.env.DEEPINVENT_API_KEY;
    this.baseUrl = process.env.DEEPINVENT_BASE_URL || 'https://api.deepinvent.ai';
    this.demoMode = !this.apiKey;
    this.initialized = false;
    
    console.log(`🎯 ProjectPlanning initialized (${this.demoMode ? 'Demo Mode' : 'API Mode'})`);
}
```

**Add the axios import at the top:**
```javascript
const axios = require('axios');
```

### **Phase B: Implement Initialize Method (3 minutes)**

**Replace the initialize method:**
```javascript
async initialize() {
    console.log('🎯 Initializing Workshop 1: Project Planning Systems');
    
    if (this.demoMode) {
        console.log('⚠️  DeepInvent.ai API key not found - using demo mode');
    } else {
        console.log('✅ Connected to DeepInvent.ai for enhanced planning');
    }
    
    this.initialized = true;
    console.log('✅ Workshop 1 ready!');
}
```

### **Phase C: Build the Main Planning Function (10 minutes)**

**Replace the createPlan method with this implementation:**

```javascript
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
            },
            timeout: 10000
        });

        return {
            success: true,
            plan: response.data,
            source: 'DeepInvent.ai',
            workshop: 1
        };

    } catch (error) {
        console.error('DeepInvent.ai API error:', error.message);
        
        // Graceful fallback to demo mode
        return this.createDemoPlan(projectName, description, goals, timeline);
    }
}
```

### **Phase D: Add the Demo Plan Creator (2 minutes)**

**Add this method after createPlan:**

```javascript
createDemoPlan(projectName, description, goals, timeline) {
    const plan = {
        project: {
            name: projectName,
            description: description || "An innovative project to build something amazing",
            timeline,
            status: 'planned',
            created: new Date().toISOString()
        },
        phases: [
            {
                name: "Discovery & Planning",
                duration: "1-2 weeks",
                tasks: [
                    "Research target audience and competition",
                    "Define detailed requirements",
                    "Create wireframes or mockups",
                    "Set up development environment"
                ]
            },
            {
                name: "Development",
                duration: "60% of timeline",
                tasks: [
                    "Implement core features",
                    "Build user interface",
                    "Add business logic",
                    "Integrate external services"
                ]
            },
            {
                name: "Testing & Launch",
                duration: "1-2 weeks",
                tasks: [
                    "Comprehensive testing",
                    "Fix bugs and optimize",
                    "Deploy to production",
                    "Monitor and gather feedback"
                ]
            }
        ],
        goals: goals.length > 0 ? goals : [
            "Complete project on time and within budget",
            "Create excellent user experience",
            "Learn new technologies and skills"
        ],
        nextSteps: [
            "Review and approve this plan",
            "Set up project management tools",
            "Begin discovery phase",
            "Schedule regular check-ins"
        ]
    };

    return {
        success: true,
        plan,
        source: 'Demo Mode',
        workshop: 1,
        note: 'This is a demo plan. Add DEEPINVENT_API_KEY to .env for AI-enhanced planning.'
    };
}
```

---

## 🔌 **Step 3: Connect to Your Agent (3 minutes)**

### **Update the Main Agent**

Open `starter-framework/src/agent.js` and find this line around line 21:
```javascript
this.workshops = {
    planning: null,        // Workshop 1: You'll implement project planning
```

**Replace it with:**
```javascript
this.workshops = {
    planning: new ProjectPlanning(),        // Workshop 1: ✅ IMPLEMENTED!
```

### **Update the processMessage Method**

Find the `processMessage` method (around line 85) and add this code after the TODO comments:

```javascript
// Workshop 1: Handle project planning requests
if (this.workshops.planning && this.needsPlanning(message)) {
    const planningResult = await this.workshops.planning.createPlan({
        projectName: this.extractProjectName(message),
        description: message,
        goals: this.extractGoals(message),
        timeline: this.extractTimeline(message)
    });
    
    return {
        response: `I created a project plan for you! ${planningResult.plan.project.name}`,
        plan: planningResult.plan,
        source: planningResult.source,
        workshopsUsed: ['Planning'],
        capabilities: availableCapabilities
    };
}
```

### **Add Helper Methods**

Add these helper methods at the end of the DWYAgent class (before the closing brace):

```javascript
needsPlanning(message) {
    const planningKeywords = ['plan', 'project', 'timeline', 'schedule', 'organize', 'manage'];
    return planningKeywords.some(keyword => 
        message.toLowerCase().includes(keyword)
    );
}

extractProjectName(message) {
    // Simple extraction - you can make this smarter!
    const words = message.split(' ');
    const appIndex = words.findIndex(word => 
        ['app', 'application', 'website', 'project', 'system'].includes(word.toLowerCase())
    );
    
    if (appIndex > 0) {
        return words.slice(Math.max(0, appIndex - 2), appIndex + 1).join(' ');
    }
    
    return "Your Project";
}

extractGoals(message) {
    // Simple goal extraction
    if (message.includes('goal')) {
        return ["Achieve project objectives", "Deliver on time"];
    }
    return [];
}

extractTimeline(message) {
    const timeMatches = message.match(/(\d+)\s*(week|month|day)s?/i);
    return timeMatches ? `${timeMatches[1]} ${timeMatches[2]}s` : '1 month';
}
```

---

## 🧪 **Step 4: Test Your Implementation (2 minutes)**

### **Restart Your Agent**
```bash
# Stop the current agent (Ctrl+C)
npm start
```

### **Check Health**
Visit: http://localhost:3000/health

You should see:
```json
{
  "implementedWorkshops": 1,
  "completed": ["planning"],
  "nextTodo": "Complete Workshop 2: Knowledge Graph Memory"
}
```

### **Test Project Planning**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Create a plan for my mobile app project"}'
```

**You should get back a detailed project plan!** 🎉

### **Test Workshop 1 Endpoint**
Visit: http://localhost:3000/workshop1

Should show: `{"status": "implemented", "component": "Project Planning"}`

---

## 🎉 **Congratulations! You Built Workshop 1!**

### **What You Accomplished**
- ✅ **Built project planning from scratch** with AI integration
- ✅ **Connected to DeepInvent.ai API** (when API key provided)
- ✅ **Created demo mode** that works without API keys
- ✅ **Integrated with main agent** workflow
- ✅ **Added error handling** and graceful fallbacks

### **Your Agent Can Now:**
- 🤖 Understand when users want project planning
- 📋 Generate detailed project plans with phases and tasks
- 🔗 Integrate with DeepInvent.ai for enhanced AI planning
- 🎯 Extract project details from natural language
- 📊 Provide structured, actionable project roadmaps

---

## 🚀 **Next Steps**

### **Immediate Customization (10 minutes)**
Ask Cursor AI to help you add features:
```
"Help me add project cost estimation to the createPlan method based on timeline and complexity"
```

```
"Add team member management to track who's assigned to each task"
```

### **Try Advanced Features**
1. **Get a DeepInvent.ai API key** for enhanced AI planning
2. **Test with different project types** (web apps, mobile apps, APIs)
3. **Customize the plan templates** for your industry

### **Ready for Workshop 2**
Your agent now has **project planning capabilities**! In Workshop 2, you'll add **persistent memory** so your agent remembers all the plans it creates and can reference them in future conversations.

**🎯 You're building an amazing AI agent step by step!**