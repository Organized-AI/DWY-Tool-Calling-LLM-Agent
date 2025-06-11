# Beginner's Complete Setup Guide
**Get Started with DWY Tool Calling LLM Agent in 15 Minutes**

## 🎯 **Perfect for Hackathon Participants using Cursor IDE**

This guide is designed for complete beginners attending the [Organized AI // Vibe Coders Hackathon](https://lu.ma/Organizedai). No prior experience required!

---

## 📋 **Prerequisites (5 minutes)**

### **What You Need**
- ✅ **Computer**: Mac, Windows, or Linux  
- ✅ **Internet connection** for downloads
- ✅ **Text editor**: [Cursor IDE](https://cursor.sh/) (recommended) or VS Code
- ✅ **Terminal/Command Prompt** access

### **What You DON'T Need**
- ❌ Prior programming experience  
- ❌ API keys (everything works in demo mode)
- ❌ Complex setup or configurations
- ❌ Expensive tools or subscriptions

---

## 🚀 **Step 1: Install Required Tools (3 minutes)**

### **Install Node.js**
Node.js lets you run JavaScript code on your computer.

**For Mac:**
```bash
# Install using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

**For Windows:**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the "LTS" version
3. Run the installer
4. Follow the setup wizard

**For Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# CentOS/RHEL  
sudo yum install nodejs npm
```

**Verify Installation:**
```bash
node --version
npm --version
```
You should see version numbers like `v18.17.0` and `9.6.7`.

### **Install Cursor IDE (Recommended)**
1. Visit [cursor.sh](https://cursor.sh/)
2. Download for your operating system
3. Install and open Cursor
4. **Why Cursor?** It has built-in AI assistance perfect for beginners!

---

## 📥 **Step 2: Get the Code (2 minutes)**

### **Option A: Clone with Git (If you have Git)**
```bash
git clone https://github.com/jhillbht/dwy-tool-calling-llm-agent.git
cd dwy-tool-calling-llm-agent
```

### **Option B: Download ZIP (Easiest for beginners)**
1. Go to [the GitHub repository](https://github.com/jhillbht/dwy-tool-calling-llm-agent)
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file to your Desktop
5. Open terminal and navigate to the folder:
   ```bash
   cd Desktop/dwy-tool-calling-llm-agent-main
   ```

---

## 🔧 **Step 3: Choose Your Starting Point (1 minute)**

You have **three options** based on your goals:

### **🎯 Option A: Start with One Workshop** *(Recommended for Beginners)*
Learn one concept at a time:
```bash
cd templates/workshop1-template
```

### **🤖 Option B: Try the Complete Agent** *(For Complete Experience)*
See everything working together:
```bash
cd reference-implementation/complete-agent
```

### **📚 Option C: Read the Documentation First** *(For Careful Learners)*
Start with understanding:
```bash
# Open project_overview.md in Cursor
```

**For this guide, we'll use Option A (Workshop 1).**

---

## 🏃‍♂️ **Step 4: Run Your First Workshop (3 minutes)**

### **Navigate to Workshop 1**
```bash
cd templates/workshop1-template
```

### **Install Dependencies**
```bash
npm install
```
*This downloads all the code libraries you need. Takes 1-2 minutes.*

### **Start the Application**
```bash
npm start
```

**You should see:**
```
🎯 Workshop 1: Project Planning Systems

📚 Running in DEMO MODE (no API key needed)
🌐 Server starting on http://localhost:3001
🚀 Workshop 1 server running at http://localhost:3001
```

### **Test It Works**
1. **Open your web browser**
2. **Go to:** http://localhost:3001
3. **You should see JSON data** that looks like:
   ```json
   {
     "workshop": 1,
     "title": "Project Planning Systems",
     "demo_mode": true,
     "endpoints": [...]
   }
   ```

**🎉 Congratulations! You're running your first AI workshop!**

---

## 🧪 **Step 5: Try Your First AI Feature (2 minutes)**

### **Create a Project Plan**

**Option A: Using Browser (Easiest)**
1. Open a new tab
2. Install a browser extension like "JSON Formatter" for better readability
3. This step requires a tool like Postman or curl (see Option B)

**Option B: Using Terminal (Recommended)**
Open a **new terminal window** (keep the first one running) and try:

```bash
curl -X POST http://localhost:3001/create-plan \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "My First App",
    "description": "A simple app to learn AI development",
    "goals": ["Learn something new", "Build something cool"],
    "timeline": "2 weeks"
  }'
```

**You'll get back a detailed project plan with:**
- ✅ Project phases and timelines
- ✅ Task breakdowns
- ✅ Goals and next steps
- ✅ Helpful tips for beginners

### **Try the Analysis Feature**
```bash
curl -X POST http://localhost:3001/analyze-project \
  -H "Content-Type: application/json" \
  -d '{
    "description": "I want to build a mobile app that helps people track their daily habits and set reminders."
  }'
```

**This will analyze your project idea and suggest:**
- Platform recommendations (mobile, web, etc.)
- Key features to include
- Complexity estimation
- Timeline suggestions

---

## 🎓 **Step 6: Understand What You Built (5 minutes)**

### **Open the Code in Cursor**
1. **Open Cursor IDE**
2. **File → Open Folder**
3. **Select:** `templates/workshop1-template`
4. **Look at these files:**
   - `index.js` - The main application code
   - `package.json` - Project configuration
   - `README.md` - Documentation

### **Ask Cursor AI for Help**
In Cursor, press **Ctrl+L** (or Cmd+L on Mac) and ask:

```
"Explain what this index.js file does in simple terms"
```

```
"Show me how the create-plan endpoint works"
```

```
"Help me add a new feature to estimate project costs"
```

### **Key Concepts You've Learned**
- ✅ **REST APIs**: How web services communicate
- ✅ **Express.js**: A framework for building web applications
- ✅ **JSON**: How data is structured and transferred
- ✅ **Demo Mode**: Building applications that work without external dependencies
- ✅ **AI Integration**: Connecting to external AI services

---

## 🔗 **Step 7: Connect Real AI Services (Optional)**

### **Get DeepInvent.ai API Key** *(Free tier available)*
1. Visit [deepinvent.ai](https://deepinvent.ai/)
2. Sign up for a free account
3. Generate an API key
4. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Edit `.env` and add your key:
   ```bash
   DEEPINVENT_API_KEY=your-api-key-here
   ```
6. Restart your application:
   ```bash
   npm start
   ```

**Now your project planning will be enhanced with real AI!**

---

## 🎯 **Next Steps**

### **Option 1: Try More Workshops**
Each workshop teaches different AI concepts:
- **Workshop 2**: Knowledge graphs and memory systems
- **Workshop 3**: Marketing AI and voice services  
- **Workshop 4**: AI video generation
- **Workshop 5**: Tool calling and integrations
- **Workshop 6**: Local AI deployment

### **Option 2: Build the Complete Agent**
```bash
cd ../../reference-implementation/complete-agent
npm install
npm start
```

### **Option 3: Customize Workshop 1**
Ask Cursor AI to help you add features:
- Project cost estimation
- Team member management
- Different project templates
- Progress tracking

---

## 🐛 **Troubleshooting Common Issues**

### **"Command not found: npm"**
- Node.js isn't installed correctly
- Restart your terminal after installing Node.js
- Try `node --version` to check

### **"Port 3001 already in use"**
```bash
# Kill the process using the port
pkill -f "node.*3001"

# Or change the port in .env
PORT=3002
```

### **"Module not found" errors**
```bash
# Make sure you're in the right directory
pwd

# Reinstall dependencies
rm -rf node_modules
npm install
```

### **"Permission denied" errors on Mac/Linux**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### **JSON data looks messy in browser**
- Install "JSON Formatter" browser extension
- Use Cursor's built-in terminal for curl commands
- Try a tool like Postman for testing APIs

---

## 🤝 **Getting Help**

### **During the Hackathon**
- **Ask workshop leaders** during sessions
- **Use the Discord/Slack** for quick questions
- **Pair up with other participants** for collaboration

### **Using Cursor AI**
- **Press Ctrl+L (Cmd+L)** to open AI chat
- **Ask specific questions**: "How do I fix this error?"
- **Request explanations**: "What does this function do?"
- **Get code help**: "Help me add a new feature"

### **Online Resources**
- **GitHub Issues**: Report bugs or ask questions
- **Workshop Documentation**: Read the individual workshop guides
- **Platform Documentation**: Each platform has detailed guides

---

## 🏆 **You're Ready!**

**Congratulations!** You've successfully:
- ✅ Set up your development environment
- ✅ Run your first AI-powered application  
- ✅ Created project plans using AI
- ✅ Learned fundamental web development concepts
- ✅ Connected with real AI services

**You're now ready to participate in the hackathon and build amazing AI applications!**

---

## 📚 **Additional Resources**

### **Beginner-Friendly Learning**
- [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps)
- [What is an API?](https://www.youtube.com/watch?v=GZvSYJDk-us)
- [Express.js Tutorial](https://expressjs.com/en/starter/hello-world.html)

### **AI and Machine Learning**
- [AI for Everyone (Coursera)](https://www.coursera.org/learn/ai-for-everyone)
- [What are Large Language Models?](https://www.anthropic.com/news/guide-to-anthropics-claude)

### **Tools and Platforms**
- [Cursor IDE Documentation](https://cursor.sh/docs)
- [GitHub Basics](https://guides.github.com/introduction/git-handbook/)
- [Terminal/Command Line Basics](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)

**Happy hacking! 🚀**