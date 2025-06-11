# DWY Tool Calling LLM Agent - Reference Implementation

This directory contains a complete reference implementation of the DWY Tool Calling LLM Agent, demonstrating how all six workshop components integrate into a production-ready system.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                        │
│                  Port 3000                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend (Express + MCP)                     │
│              Port 8000 (API) + 8001 (MCP)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    Neo4j        │  │     Ollama      │  │     Redis       │
│   Port 7474     │  │   Port 11434    │  │   Port 6379     │
│ Knowledge Graph │  │   Local AI      │  │    Cache        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- 8GB+ RAM
- 20GB+ free disk space

### Launch Complete System
```bash
# Clone the repository
git clone https://github.com/jhillbht/dwy-tool-calling-llm-agent.git
cd dwy-tool-calling-llm-agent/reference-implementation

# Copy environment configuration
cp .env.example .env
# Edit .env with your API keys

# Start all services
docker-compose up -d

# Wait for services to be ready (2-3 minutes)
docker-compose ps

# Check health status
curl http://localhost:8000/health
```

### Access Points
- **Frontend Application**: http://localhost:3000
- **API Documentation**: http://localhost:8000/docs
- **MCP Server**: http://localhost:8001
- **Neo4j Browser**: http://localhost:7474 (neo4j / password123)
- **Ollama API**: http://localhost:11434

## 📁 Directory Structure

```
reference-implementation/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API services
│   │   └── utils/             # Utility functions
│   ├── public/                # Static assets
│   ├── package.json           # Frontend dependencies
│   └── Dockerfile             # Frontend container
├── backend/                    # Express + MCP server
│   ├── src/
│   │   ├── mcp/              # MCP server implementation
│   │   ├── api/              # REST API routes
│   │   ├── services/         # Business logic
│   │   ├── models/           # Data models
│   │   ├── middleware/       # Express middleware
│   │   └── utils/            # Utility functions
│   ├── package.json          # Backend dependencies
│   └── Dockerfile            # Backend container
├── database/                  # Database scripts and config
│   ├── neo4j/               # Neo4j initialization
│   └── migrations/          # Database migrations
├── nginx/                    # Reverse proxy configuration
├── monitoring/              # Monitoring configuration
├── scripts/                 # Utility scripts
├── docker-compose.yml       # Main orchestration
├── .env.example            # Environment template
└── README.md               # This file
```

## 🎯 Workshop Integration Points

### Workshop 1: Project Planning Systems
**Location**: `backend/src/services/project-planning.js`
- DeepInvent.ai integration for patent analysis
- GitHub API integration for repository management
- Project optimization algorithms
- Resource allocation and timeline management

### Workshop 2: Knowledge Graph Implementation  
**Location**: `backend/src/services/knowledge-graph.js`
- Neo4j driver and connection management
- Penumbra.ai integration for thought organization
- Graph schema and relationship modeling
- Context retention and memory management

### Workshop 3: Marketing AI Services
**Location**: `backend/src/services/marketing-ai.js`
- Sindarin.tech voice AI integration
- Customer communication workflows
- Marketing strategy development
- Voice synthesis and processing

### Workshop 4: AI Video Generation
**Location**: `backend/src/services/video-generation.js`
- Texel.ai video creation integration
- Brand consistency validation
- Content automation workflows
- Video optimization and distribution

### Workshop 5: Tool Calling & MCP Integration
**Location**: `backend/src/mcp/`
- MCP server implementation
- Toolhouse.ai platform integration
- Tool registry and orchestration
- External API connectivity

### Workshop 6: Local AI Deployment
**Location**: `backend/src/services/local-ai.js`
- Ollama integration and model management
- Privacy-focused processing
- Performance optimization
- WebAI.com resource utilization

## 🔧 Configuration

### Environment Variables
The system uses environment variables for configuration. Key variables include:

```env
# Core Services
NODE_ENV=production
PORT=8000
MCP_PORT=8001

# Database
NEO4J_URI=bolt://neo4j:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password123

# Local AI
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=llama3.2:latest

# Platform API Keys
DEEPINVENT_API_KEY=your_key_here
PENUMBRA_API_KEY=your_key_here
SINDARIN_API_KEY=your_key_here
TEXEL_API_KEY=your_key_here
TOOLHOUSE_API_KEY=your_key_here

# Security
MCP_AUTH_SECRET=secure_random_string
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://claude.anthropic.com
```

### Docker Profiles
The docker-compose file includes optional profiles:

```bash
# Production with Nginx
docker-compose --profile production up -d

# With monitoring (Prometheus + Grafana)
docker-compose --profile monitoring up -d

# All services
docker-compose --profile production --profile monitoring up -d
```

## 🧪 Testing the Implementation

### Health Checks
```bash
# Check all services
curl http://localhost:8000/health
curl http://localhost:3000
curl http://localhost:7474
curl http://localhost:11434/api/tags

# MCP server tools
curl http://localhost:8001/tools
```

### API Testing
```bash
# Test project creation (Workshop 1)
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Project", "description": "Testing integration"}'

# Test knowledge graph (Workshop 2)  
curl -X POST http://localhost:8000/api/memory \
  -H "Content-Type: application/json" \
  -d '{"content": "Test memory", "context": "testing"}'

# Test voice AI (Workshop 3)
curl -X POST http://localhost:8000/api/voice/synthesize \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "voice": "professional"}'

# Test video generation (Workshop 4)
curl -X POST http://localhost:8000/api/video/generate \
  -H "Content-Type: application/json" \
  -d '{"script": "Welcome to our product", "style": "professional"}'

# Test tool calling (Workshop 5)
curl -X POST http://localhost:8001/rpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "tools/list", "id": 1}'

# Test local AI (Workshop 6)
curl -X POST http://localhost:8000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain the benefits of local AI"}'
```

### Claude Desktop Integration
1. Open Claude Desktop
2. Go to Settings > Advanced > MCP Servers
3. Add server: `http://localhost:8001`
4. API Key: Use the value from `MCP_AUTH_SECRET`
5. Test available tools

## 📊 Monitoring and Observability

### Built-in Monitoring
- Health check endpoints for all services
- Structured logging with Winston
- Performance metrics collection
- Error tracking and alerting

### Optional Monitoring Stack
```bash
# Start monitoring services
docker-compose --profile monitoring up -d

# Access Grafana dashboard
open http://localhost:3001  # admin / admin123

# Access Prometheus
open http://localhost:9090
```

### Log Analysis
```bash
# View logs from all services
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f neo4j
docker-compose logs -f ollama

# View application logs
tail -f logs/application.log
tail -f logs/error.log
```

## 🚀 Deployment Options

### Local Development
```bash
# Start with hot reload
docker-compose -f docker-compose.dev.yml up
```

### Production Deployment
```bash
# Production with Nginx and SSL
docker-compose --profile production up -d
```

### Cloud Deployment
See deployment guides for:
- DigitalOcean App Platform
- AWS ECS
- Google Cloud Run
- Azure Container Instances

## 🔒 Security Considerations

### API Security
- JWT authentication for API endpoints
- API key authentication for MCP server
- Rate limiting on all endpoints
- CORS configuration for browser security

### Data Security
- Neo4j authentication and encryption
- Local AI processing (no data leaves system)
- Secure environment variable management
- Regular security updates

### Privacy Features
- Local-only AI processing
- Encrypted data storage
- Audit logging
- GDPR compliance features

## 🛠️ Development

### Running in Development Mode
```bash
# Backend development
cd backend
npm install
npm run dev

# Frontend development
cd frontend
npm install
npm start

# Start dependencies only
docker-compose up -d neo4j ollama redis
```

### Adding New Features
1. Implement in appropriate service module
2. Add API endpoints if needed
3. Register MCP tools if applicable
4. Update frontend components
5. Add tests and documentation

### Testing
```bash
# Run backend tests
cd backend && npm test

# Run frontend tests  
cd frontend && npm test

# Run integration tests
npm run test:integration
```

## 📚 Additional Resources

- **API Documentation**: Available at `/docs` when running
- **Workshop Guides**: Complete setup instructions in `/workshops`
- **Troubleshooting**: Common issues and solutions in `/docs/troubleshooting.md`
- **Platform Integration**: Partner platform setup in `/docs/platform-integrations.md`

## 🤝 Contributing

This reference implementation serves as:
1. **Learning Resource**: Understand how all workshops integrate
2. **Starting Point**: Fork and customize for your needs
3. **Best Practices**: Production-ready patterns and configurations
4. **Testing Environment**: Validate workshop implementations

## 📞 Support

For issues with the reference implementation:
- Check the troubleshooting guide
- Review individual workshop documentation
- Open an issue on GitHub
- Join the community discussion

---

**This reference implementation demonstrates the complete DWY Tool Calling LLM Agent in action, showcasing how all six workshops combine to create a powerful, privacy-focused AI system.** 🚀