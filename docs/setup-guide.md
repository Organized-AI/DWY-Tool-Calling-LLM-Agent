# Complete Setup Guide
**DWY Tool Calling LLM Agent**

## 🚀 Quick Start Guide

### Prerequisites

Before starting the workshops, ensure you have:

- **Hardware Requirements:**
  - 8GB+ RAM (16GB recommended for local AI models)
  - 50GB+ free disk space
  - Modern CPU (Intel i5/AMD Ryzen 5 or better)
  - Optional: GPU with 6GB+ VRAM for faster AI processing

- **Software Requirements:**
  - Docker and Docker Compose
  - Node.js 18+ and npm
  - Git for version control
  - Modern web browser (Chrome, Firefox, Safari)

### Environment Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/jhillbht/dwy-tool-calling-llm-agent.git
cd dwy-tool-calling-llm-agent
```

#### 2. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Verify Docker installation
docker --version
docker-compose --version
```

#### 3. Configure Environment Variables
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

#### 4. Start Core Services
```bash
# Start Neo4j and other core services
docker-compose up -d neo4j

# Verify services are running
docker-compose ps
```

## 📋 Workshop-by-Workshop Setup

### Workshop 1: Project Planning Systems

#### Required Tools:
- **DeepInvent.ai Account**: [Sign up here](https://deepinvent.ai/)
- **GitHub Account**: For version control and collaboration
- **Development Environment**: VS Code or Cursor IDE

#### Setup Steps:
```bash
# 1. Configure GitHub CLI (optional but recommended)
gh auth login

# 2. Set up project structure
mkdir -p src/{frontend,backend,database} docs templates tests scripts

# 3. Initialize package.json
npm init -y

# 4. Install development dependencies
npm install --save-dev nodemon jest eslint prettier
```

#### Environment Variables:
```env
# DeepInvent.ai Configuration
DEEPINVENT_API_KEY=your_api_key_here
DEEPINVENT_ENDPOINT=https://api.deepinvent.ai

# GitHub Configuration
GITHUB_TOKEN=your_github_token_here
GITHUB_REPO=your_username/your_repo
```

### Workshop 2: Knowledge Graph Implementation

#### Required Services:
- **Neo4j Database**: Graph database for knowledge storage
- **Penumbra.ai Account**: [Sign up here](https://www.getpenumbra.ai/)

#### Setup Steps:
```bash
# 1. Start Neo4j container
docker run \
  --name neo4j-memory \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password123 \
  -v neo4j_data:/data \
  -d neo4j:latest

# 2. Verify Neo4j is running
curl http://localhost:7474/browser/

# 3. Install Neo4j driver
npm install neo4j-driver
```

#### Environment Variables:
```env
# Neo4j Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password123
NEO4J_DATABASE=neo4j

# Penumbra.ai Configuration
PENUMBRA_API_KEY=your_api_key_here
PENUMBRA_ENDPOINT=https://api.getpenumbra.ai
```

### Workshop 3: Marketing AI Services

#### Required Services:
- **Sindarin.tech Account**: [Sign up here](https://www.sindarin.tech/)
- **Voice AI Dependencies**: Audio processing libraries

#### Setup Steps:
```bash
# 1. Install audio processing dependencies
npm install @sindarin/voice-ai axios multer

# 2. Configure audio permissions (if using browser)
# Enable microphone access in browser settings

# 3. Test Sindarin.tech connection
curl -H "Authorization: Bearer $SINDARIN_API_KEY" \
     https://api.sindarin.tech/v1/health
```

#### Environment Variables:
```env
# Sindarin.tech Configuration
SINDARIN_API_KEY=your_api_key_here
SINDARIN_ENDPOINT=https://api.sindarin.tech
SINDARIN_MODEL=business_professional

# Marketing Configuration
CRM_INTEGRATION=enabled
ANALYTICS_TRACKING=enabled
```

### Workshop 4: AI Video Generation

#### Required Services:
- **Texel.ai Account**: [Sign up here](https://texel.ai/)
- **Video Processing Tools**: FFmpeg for video manipulation

#### Setup Steps:
```bash
# 1. Install FFmpeg (macOS)
brew install ffmpeg

# 1. Install FFmpeg (Ubuntu)
sudo apt update && sudo apt install ffmpeg

# 2. Install video processing dependencies
npm install @texel/video-generator sharp canvas

# 3. Configure video storage
mkdir -p storage/{videos,thumbnails,assets}
```

#### Environment Variables:
```env
# Texel.ai Configuration
TEXEL_API_KEY=your_api_key_here
TEXEL_ENDPOINT=https://api.texel.ai
TEXEL_MODEL=business_video_v2

# Video Configuration
VIDEO_STORAGE_PATH=./storage/videos
MAX_VIDEO_DURATION=300
VIDEO_QUALITY=1080p
```

### Workshop 5: Tool Calling & MCP Integration

#### Required Services:
- **Toolhouse.ai Account**: [Sign up here](https://toolhouse.ai/)
- **MCP Server Setup**: Model Context Protocol implementation

#### Setup Steps:
```bash
# 1. Install MCP and tool calling dependencies
npm install @toolhouse/sdk @modelcontextprotocol/sdk express cors helmet

# 2. Initialize MCP server
mkdir -p src/mcp/{tools,handlers,middleware}

# 3. Create MCP server configuration
cat > src/mcp/server.js << 'EOF'
const express = require('express');
const { MCPServer } = require('@modelcontextprotocol/sdk');
const app = express();

// MCP server implementation will be added during workshop
EOF
```

#### Environment Variables:
```env
# Toolhouse.ai Configuration
TOOLHOUSE_API_KEY=your_api_key_here
TOOLHOUSE_ENDPOINT=https://api.toolhouse.ai

# MCP Configuration
MCP_SERVER_PORT=8001
MCP_AUTH_SECRET=secure_random_string_here
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://claude.anthropic.com
```

### Workshop 6: Local AI Deployment

#### Required Services:
- **Ollama**: Local AI model serving
- **WebAI.com Resources**: Local AI deployment guides

#### Setup Steps:
```bash
# 1. Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Start Ollama service
ollama serve &

# 3. Pull recommended models
ollama pull llama3.2:latest
ollama pull codellama:latest

# 4. Test model availability
ollama list
```

#### Environment Variables:
```env
# Ollama Configuration
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:latest
OLLAMA_TIMEOUT=30000

# WebAI Configuration
WEBAI_RESOURCES_ENABLED=true
LOCAL_AI_PRIVACY_MODE=maximum
```

## 🔧 Complete Environment Configuration

### Sample .env File
```env
# Node.js Configuration
NODE_ENV=development
PORT=8000
MCP_PORT=8001

# Database Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password123
NEO4J_DATABASE=neo4j

# API Keys (Workshop Partners)
DEEPINVENT_API_KEY=your_deepinvent_key
PENUMBRA_API_KEY=your_penumbra_key
SINDARIN_API_KEY=your_sindarin_key
TEXEL_API_KEY=your_texel_key
TOOLHOUSE_API_KEY=your_toolhouse_key

# Local AI Configuration
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:latest
OLLAMA_TIMEOUT=30000

# Security Configuration
MCP_AUTH_SECRET=change_this_to_secure_random_string
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://claude.anthropic.com
SESSION_SECRET=another_secure_random_string

# Storage Configuration
VIDEO_STORAGE_PATH=./storage/videos
DATA_STORAGE_PATH=./storage/data
LOGS_PATH=./storage/logs

# Feature Flags
ENABLE_VOICE_AI=true
ENABLE_VIDEO_GENERATION=true
ENABLE_LOCAL_AI=true
ENABLE_KNOWLEDGE_GRAPH=true
```

## 🐳 Docker Configuration

### docker-compose.yml
```yaml
version: '3.8'

services:
  neo4j:
    image: neo4j:latest
    container_name: neo4j-memory
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      - NEO4J_AUTH=neo4j/password123
      - NEO4J_PLUGINS=["apoc"]
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs
    restart: unless-stopped

  ollama:
    image: ollama/ollama:latest
    container_name: ollama-ai
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    restart: unless-stopped
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  mcp-server:
    build: .
    container_name: mcp-server
    ports:
      - "8000:8000"
      - "8001:8001"
    environment:
      - NODE_ENV=production
      - NEO4J_URI=bolt://neo4j:7687
      - OLLAMA_URL=http://ollama:11434
    depends_on:
      - neo4j
      - ollama
    restart: unless-stopped
    volumes:
      - ./storage:/app/storage
      - ./logs:/app/logs

volumes:
  neo4j_data:
  neo4j_logs:
  ollama_data:
```

## 🧪 Testing Your Setup

### Health Check Script
```bash
#!/bin/bash
# health-check.sh

echo "🔍 Checking DWY Tool Calling LLM Agent Setup..."

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node --version)"
else
    echo "❌ Node.js not found"
fi

# Check Docker
if command -v docker &> /dev/null; then
    echo "✅ Docker $(docker --version | cut -d' ' -f3 | cut -d',' -f1)"
else
    echo "❌ Docker not found"
fi

# Check Neo4j
if curl -s http://localhost:7474 &> /dev/null; then
    echo "✅ Neo4j running on port 7474"
else
    echo "❌ Neo4j not accessible"
fi

# Check Ollama
if curl -s http://localhost:11434/api/tags &> /dev/null; then
    echo "✅ Ollama running on port 11434"
else
    echo "❌ Ollama not accessible"
fi

# Check environment file
if [ -f .env ]; then
    echo "✅ Environment file exists"
else
    echo "❌ .env file missing"
fi

echo "\n🎯 Setup verification complete!"
```

### Run Health Check
```bash
chmod +x health-check.sh
./health-check.sh
```

## 🚨 Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check what's running on required ports
lsof -i :7474  # Neo4j Browser
lsof -i :7687  # Neo4j Bolt
lsof -i :8000  # Main API
lsof -i :8001  # MCP Server
lsof -i :11434 # Ollama

# Kill processes if needed
sudo kill -9 $(lsof -ti:PORT_NUMBER)
```

#### Docker Issues
```bash
# Reset Docker containers
docker-compose down -v
docker system prune -f
docker-compose up -d

# Check container logs
docker-compose logs neo4j
docker-compose logs ollama
```

#### Memory Issues
```bash
# Check available memory
free -h

# Optimize Docker memory usage
docker update --memory="4g" neo4j-memory
docker update --memory="6g" ollama-ai
```

#### API Key Issues
```bash
# Test API connectivity
curl -H "Authorization: Bearer $DEEPINVENT_API_KEY" https://api.deepinvent.ai/health
curl -H "Authorization: Bearer $SINDARIN_API_KEY" https://api.sindarin.tech/health
curl -H "Authorization: Bearer $TEXEL_API_KEY" https://api.texel.ai/health
curl -H "Authorization: Bearer $TOOLHOUSE_API_KEY" https://api.toolhouse.ai/health
```

## 📚 Next Steps

Once your environment is set up:

1. **Start with Workshop 1**: Follow the project planning systems guide
2. **Progress sequentially**: Each workshop builds on the previous
3. **Test thoroughly**: Verify each component works before moving on
4. **Join the community**: Connect with other participants for support

## 🔗 Useful Links

- **Event Information**: [Organized AI // Vibe Coders Hackathon](https://lu.ma/Organizedai)
- **Documentation**: Each workshop folder contains detailed guides
- **Support**: GitHub Issues for technical problems
- **Community**: Discord/Slack channels for real-time help

---

**Ready to build your tool calling LLM agent? Start with Workshop 1!** 🚀