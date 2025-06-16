# DWY Tool-Calling LLM Agent - Setup Guide

🚀 **Welcome to the DWY Tool-Calling LLM Agent Hackathon!** 

This directory contains all the setup scripts and resources needed to get your development environment ready for building an advanced AI agent with tool-calling capabilities.

## 🎯 Quick Start

### Automated Setup (Recommended)

Visit **[organizedai.vip](https://organizedai.vip)** and run the appropriate setup script for your operating system:

#### macOS
```bash
curl -fsSL https://raw.githubusercontent.com/Organized-AI/DWY-Tool-Calling-LLM-Agent/main/setup/scripts/hackathon-setup-mac.sh | bash
```

#### Windows (PowerShell as Administrator)
```powershell
irm https://raw.githubusercontent.com/Organized-AI/DWY-Tool-Calling-LLM-Agent/main/setup/scripts/hackathon-setup-windows.ps1 | iex
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://raw.githubusercontent.com/Organized-AI/DWY-Tool-Calling-LLM-Agent/main/setup/scripts/hackathon-setup-linux.sh | bash
```

## 🛠️ What Gets Installed

Our setup scripts automatically install and configure:

### Development Tools
- **Node.js** (LTS) - JavaScript runtime for backend development
- **Python 3.9+** - For AI/ML components and tool calling
- **Git** - Version control
- **VS Code** - Primary IDE with extensions
- **Package Managers** (npm, pip, Homebrew/Chocolatey)

### AI Development Environment
- **Claude Desktop** - AI assistant integration
- **Essential VS Code Extensions**:
  - Python support with Black formatter
  - TypeScript/JavaScript support
  - Tailwind CSS
  - Prettier code formatting
  - GitHub Copilot (if available)
  - Docker support
  - Remote development tools

### Project Structure
```
~/dwy-hackathon/
├── src/
│   ├── frontend/          # React UI components
│   ├── backend/           # Express API server
│   ├── database/          # Database schemas
│   └── shared/            # Shared utilities
├── docs/                  # Documentation
├── templates/             # Code templates
├── tests/                 # Test files
├── scripts/               # Utility scripts
├── data/                  # Data files
├── .env.example          # Environment variables template
└── .vscode/              # VS Code configuration
```

## 🔧 Manual Setup (Alternative)

If you prefer manual installation or encounter issues with automated setup:

### Prerequisites
- **macOS**: Xcode Command Line Tools, Homebrew
- **Windows**: PowerShell 5.1+, Administrator privileges
- **Linux**: Ubuntu 20.04+ or Debian 10+, sudo privileges

### Step-by-Step Manual Installation

1. **Install Node.js**
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose LTS version

2. **Install Python 3.9+**
   - Download from [python.org](https://python.org/)
   - Ensure pip is included

3. **Install Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Configure with your credentials

4. **Install VS Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Install recommended extensions (see list above)

5. **Clone Repository**
   ```bash
   git clone https://github.com/Organized-AI/DWY-Tool-Calling-LLM-Agent.git ~/dwy-hackathon
   cd ~/dwy-hackathon
   ```

6. **Install Dependencies**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

## 🚀 Post-Setup Configuration

### 1. Environment Variables
Copy `.env.example` to `.env` and configure your API keys:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Required API Keys
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here

# Optional Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/dwy_agent
NODE_ENV=development
PORT=3000
```

### 2. VS Code Configuration
Open the project in VS Code:
```bash
code ~/dwy-hackathon
```

The workspace is pre-configured with:
- Python interpreter settings
- Code formatting on save
- Extension recommendations
- Debug configurations

### 3. Git Configuration
If not already configured:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 🔍 Verification

Run these commands to verify your setup:

```bash
# Check versions
node --version          # Should be v18+ or v20+
npm --version           # Should be 9+
python3 --version       # Should be 3.9+
git --version           # Any recent version
code --version          # Any recent version

# Test project setup
cd ~/dwy-hackathon
npm test               # Run basic tests
python3 -c "import requests; print('Python setup OK')"
```

## 🎓 Next Steps

Once setup is complete:

1. **Start with Workshop 1**: [Project Planning Systems](../workshops/workshop1_project_planning_systems.md)
2. **Join the Community**: Connect with other participants
3. **Explore the Codebase**: Familiarize yourself with the project structure
4. **Set up API Keys**: Configure your AI service credentials

## 🆘 Troubleshooting

### Common Issues

**Node.js Permission Errors**
```bash
# Fix npm permissions (Linux/macOS)
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**Python Module Import Errors**
```bash
# Ensure pip packages are in PATH
python3 -m pip install --user -r requirements.txt
```

**VS Code Extensions Not Installing**
- Run VS Code as administrator (Windows)
- Check internet connection
- Try installing extensions manually via VS Code marketplace

**Git Authentication Issues**
```bash
# Generate SSH key for GitHub
ssh-keygen -t ed25519 -C "your.email@example.com"
# Add to GitHub: https://github.com/settings/keys
```

### Getting Help

- **GitHub Issues**: [Report problems](https://github.com/Organized-AI/DWY-Tool-Calling-LLM-Agent/issues)
- **Discord Community**: Join our hackathon Discord server
- **Documentation**: Check the [docs](../docs/) directory
- **Workshop Guides**: Refer to specific workshop instructions

## 📁 Directory Structure

```
setup/
├── index.html                    # organizedai.vip landing page
├── scripts/
│   ├── hackathon-setup-mac.sh    # macOS setup script
│   ├── hackathon-setup-windows.ps1   # Windows setup script
│   └── hackathon-setup-linux.sh  # Linux setup script
└── README.md                     # This file
```

## 🔐 Security Notes

- Setup scripts are signed and verified
- Always review scripts before running
- Use environment variables for sensitive data
- Never commit API keys to version control
- Keep dependencies updated

---

**Ready to build the future of AI? Let's get started!** 🚀

Proceeed to [Workshop 1: Project Planning Systems](../workshops/workshop1_project_planning_systems.md) to begin your journey.
