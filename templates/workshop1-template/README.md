# Workshop 1: Project Planning Systems - Standalone Template
**Perfect for Cursor IDE beginners**

## 🎯 **What You'll Build**

A standalone AI-enhanced project planning system that integrates with **DeepInvent.ai** for patent applications and intelligent project analysis.

**Learning Goals:**
- Create project plans with AI assistance
- Integrate external APIs (DeepInvent.ai)
- Build simple web APIs with Express
- Handle errors gracefully with demo modes

---

## 🚀 **Quick Start (2 minutes)**

### **1. Setup**
```bash
cd templates/workshop1-template
npm install
cp .env.example .env
```

### **2. Start the Server**
```bash
npm start
```

### **3. Test It**
Visit: http://localhost:3001

You'll see:
```json
{
  "workshop": 1,
  "title": "Project Planning Systems",
  "platform": "DeepInvent.ai",
  "demo_mode": true,
  "endpoints": [...]
}
```

**🎉 You're running Workshop 1!**

---

## 🧪 **Try These Examples**

### **Create Your First Project Plan**
```bash
curl -X POST http://localhost:3001/create-plan \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "My Mobile App",
    "description": "A social app for sharing photos with friends",
    "goals": ["Launch in 3 months", "Get 1000 users"],
    "timeline": "3 months"
  }'
```

### **Analyze a Project Idea**
```bash
curl -X POST http://localhost:3001/analyze-project \
  -H "Content-Type: application/json" \
  -d '{
    "description": "I want to build a mobile app that helps people track their fitness goals and connect with workout buddies in their area."
  }'
```

### **See Demo Projects**
```bash
curl http://localhost:3001/demo
```

---

## 🔧 **For Cursor IDE Users**

### **Ask Cursor to Help You**

1. **Understand the code**:
   ```
   "Explain how the createDemoPlan function works in index.js"
   ```

2. **Add new features**:
   ```
   "Help me add a feature to estimate project costs based on complexity"
   ```

3. **Connect to DeepInvent.ai**:
   ```
   "Show me how to set up the DeepInvent.ai API integration"
   ```

### **Beginner-Friendly Features**
- ✅ **Works without API keys** (demo mode)
- ✅ **Clear comments** explaining every function
- ✅ **Simple project structure** - just one main file
- ✅ **Error handling** with helpful messages
- ✅ **Example requests** to test functionality

---

## 🔗 **DeepInvent.ai Integration**

### **Get Your API Key**
1. Visit [DeepInvent.ai](https://deepinvent.ai/)
2. Sign up for an account
3. Get your API key
4. Add it to your `.env` file:
   ```bash
   DEEPINVENT_API_KEY=your-key-here
   ```

### **Enhanced Features with API Key**
- 🧠 **AI-enhanced planning** with machine learning insights
- 📄 **Patent analysis** for innovation protection
- 🔍 **Competitive research** and market analysis
- 📊 **Advanced project metrics** and forecasting

---

## 📁 **Project Structure**

```
workshop1-template/
├── index.js              # Main application (all the logic!)
├── package.json           # Dependencies and scripts
├── .env.example          # Configuration template
├── README.md             # This guide
└── test.js              # Simple tests (optional)
```

---

## 🎓 **Learning Path**

### **Phase 1: Understand the Basics (15 mins)**
1. **Start the server** and visit http://localhost:3001
2. **Try the demo endpoints** to see what it does
3. **Read the code** - start with the main endpoints
4. **Ask Cursor** to explain anything confusing

### **Phase 2: Make Changes (20 mins)**
1. **Modify the demo plan** structure in `createDemoPlan()`
2. **Add a new endpoint** for a feature you want
3. **Test your changes** using curl or a browser
4. **Ask Cursor for help** if you get stuck

### **Phase 3: Connect Real APIs (30 mins)**
1. **Get a DeepInvent.ai API key** (free tier available)
2. **Add it to your .env file**
3. **Test the enhanced features**
4. **Explore the API response** structure

### **Phase 4: Build Your Own Features (45+ mins)**
1. **Add project cost estimation**
2. **Create project templates** for different types of apps
3. **Add team member management**
4. **Build a simple web interface**

---

## 🛠️ **Common Customizations**

### **Add Project Templates**
```javascript
// Add this to your index.js
const projectTemplates = {
  'mobile-app': {
    phases: [...],
    estimated_timeline: '3-4 months',
    key_technologies: ['React Native', 'Firebase', 'APIs']
  },
  'website': {
    phases: [...],
    estimated_timeline: '1-2 months', 
    key_technologies: ['React', 'Node.js', 'Database']
  }
};
```

### **Add Cost Estimation**
```javascript
// Ask Cursor: "Help me add project cost estimation based on complexity and timeline"
```

### **Add Team Management**
```javascript
// Ask Cursor: "Help me add endpoints for managing team members and their roles"
```

---

## 🐛 **Troubleshooting**

### **Port 3001 already in use?**
```bash
# Change the port in .env
PORT=3002
```

### **API errors with DeepInvent.ai?**
- Check your API key in `.env`
- Verify your account has API access
- The app will fall back to demo mode automatically

### **Module not found errors?**
```bash
npm install
```

---

## 🔄 **Integration with Other Workshops**

This Workshop 1 template is designed to work with the other workshop templates:

- **Workshop 2** (Memory): Store project plans in knowledge graph
- **Workshop 3** (Marketing): Generate marketing plans for projects  
- **Workshop 4** (Content): Create video pitches for projects
- **Workshop 5** (Tools): Add tool calling capabilities
- **Workshop 6** (AI): Enhance with local AI processing

**Next**: Try the complete integrated agent in `reference-implementation/complete-agent/`

---

## 🤝 **Need Help?**

### **Using Cursor IDE**
- Ask specific questions: *"How do I add user authentication to this project?"*
- Request explanations: *"Explain the analyzeProjectDescription function"*
- Get code help: *"Help me fix this API integration error"*

### **Community Support**
- **GitHub Issues**: Report bugs or ask questions
- **Hackathon Discord**: Connect with other Workshop 1 participants

---

**🚀 Ready to build amazing project planning tools? Start with `npm start` and let Cursor guide you!**