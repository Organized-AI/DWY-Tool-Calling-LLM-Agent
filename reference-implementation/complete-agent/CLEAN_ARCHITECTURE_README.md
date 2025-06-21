# 🏗️ DWY Tool-Calling LLM Agent - Clean Architecture Implementation

## 🎯 Overview

This is a **Clean Architecture** implementation of the DWY Tool-Calling LLM Agent, designed for the Organized AI // Vibe Coders Hackathon. The codebase has been completely restructured to follow clean architecture principles while maintaining all original functionality.

## 🚀 Quick Start

### Running the Clean Architecture Version

```bash
# Install dependencies
npm install

# Start the clean architecture implementation
npm start

# Or for development with auto-reload
npm run dev
```

### Running the Legacy Version (Original)

```bash
# Start the original implementation
npm run start:legacy

# Or for development
npm run dev:legacy
```

## 🏗️ Architecture Overview

The project follows **Clean Architecture** principles with clear separation of concerns:

```
📁 src/
├── 📁 core/                    # 🎯 Core Domain Layer
│   ├── 📁 entities/            # Business entities (Agent, Conversation, Project)
│   ├── 📁 value-objects/       # Immutable value objects (Message, Response)
│   ├── 📁 repositories/        # Abstract repository interfaces
│   └── 📁 services/            # Domain services
├── 📁 application/             # 🔧 Application Layer
│   ├── 📁 use-cases/           # Application use cases
│   │   ├── 📁 orchestration/   # Main orchestration logic
│   │   ├── 📁 workshop1-planning/  # Workshop 1 use cases
│   │   ├── 📁 workshop2-memory/    # Workshop 2 use cases
│   │   └── ...                 # Other workshop use cases
│   ├── 📁 services/            # Application services (AgentOrchestrator)
│   ├── 📁 dto/                 # Data Transfer Objects
│   └── 📁 ports/               # Application ports (interfaces)
├── 📁 infrastructure/          # 🌐 Infrastructure Layer
│   ├── 📁 external-apis/       # External API integrations
│   │   ├── 📁 deepinvent/      # DeepInvent.ai integration
│   │   ├── 📁 penumbra/        # Penumbra.ai integration
│   │   ├── 📁 sindarin/        # Sindarin.tech integration
│   │   ├── 📁 texel/           # Texel.ai integration
│   │   ├── 📁 toolhouse/       # Toolhouse.ai integration
│   │   └── 📁 ollama/          # Local AI integration
│   ├── 📁 database/            # Database implementations
│   ├── 📁 adapters/            # Infrastructure adapters
│   └── 📁 monitoring/          # Monitoring and logging
├── 📁 interfaces/              # 🔌 Interface Layer
│   ├── 📁 http/                # HTTP interface
│   │   ├── 📁 controllers/     # HTTP controllers
│   │   ├── 📁 middleware/      # HTTP middleware
│   │   ├── 📁 routes/          # Route definitions
│   │   └── 📄 server.js        # Express server setup
│   ├── 📁 websocket/           # WebSocket interface
│   └── 📁 validation/          # Request/response validation
└── 📁 shared/                  # 🔄 Shared Layer
    ├── 📁 constants/           # Application constants
    ├── 📁 utils/               # Utility functions
    ├── 📁 exceptions/          # Custom exceptions
    └── 📁 types/               # Type definitions
```

## 🎓 Key Benefits of Clean Architecture

### ✅ **Dependency Inversion**
- Core business logic doesn't depend on external frameworks
- Easy to swap out external services without affecting core logic
- Database and API implementations can be changed without core changes

### ✅ **Separation of Concerns**
- Each layer has a specific responsibility
- Business rules are isolated in the core layer
- External concerns (HTTP, databases) are in outer layers

### ✅ **Testability**
- Easy to unit test core business logic
- Mock external dependencies for testing
- Clear interfaces for test doubles

### ✅ **Maintainability**
- Changes in one layer don't affect others
- New features can be added with minimal impact
- Code is more readable and organized

## 🔧 Workshop Integration

Each of the 6 workshops is properly integrated into the clean architecture:

### **Workshop 1: Project Planning (DeepInvent.ai)**
- **Use Case**: `CreateProjectPlan` in `application/use-cases/workshop1-planning/`
- **Entity**: `Project` in `core/entities/`
- **Infrastructure**: `ProjectPlanningAdapter` adapts the existing service

### **Workshop 2: Knowledge Graph (Penumbra.ai)**
- **Service**: Memory management in `MemoryAdapter`
- **Value Objects**: `Message` and `Response` objects
- **Repository**: Abstract interfaces for data persistence

### **Workshop 3-6: Marketing, Content, Tools, AI**
- **Placeholder Implementation**: Currently using adapters with placeholder logic
- **Extension Points**: Clear interfaces for real implementations
- **Workshop Structure**: Organized for easy implementation

## 📡 API Endpoints

The clean architecture implementation maintains the same API endpoints:

### **Core Endpoints**
- `GET /health` - Health check
- `POST /chat` - Main chat interface
- `GET /workshops` - List available workshops

### **Workshop Endpoints**
- `POST /workshop1/plan` - Project Planning
- `POST /workshop2/remember` - Knowledge Graph
- `POST /workshop3/market` - Marketing AI
- `POST /workshop4/create` - Content Generation
- `POST /workshop5/tools` - Tool Calling
- `POST /workshop6/think` - Local AI

## 🔄 Migration from Legacy

The clean architecture implementation maintains **full backward compatibility**:

1. **Same API**: All endpoints work exactly the same
2. **Same Functionality**: All workshop features are preserved
3. **Enhanced Structure**: Better organized, more maintainable code
4. **Legacy Support**: Original implementation still available via `npm run start:legacy`

## 🛠️ Development Guide

### **Adding New Features**

1. **Core Logic**: Add entities/value objects in `core/`
2. **Use Cases**: Create use cases in `application/use-cases/`
3. **Infrastructure**: Implement external integrations in `infrastructure/`
4. **Interface**: Add HTTP endpoints in `interfaces/http/`

### **Testing Strategy**

```bash
# Unit tests for core logic
tests/unit/core/

# Integration tests for use cases
tests/integration/application/

# End-to-end tests for full workflows
tests/e2e/
```

### **Workshop Implementation**

To implement a new workshop:

1. Create use cases in `application/use-cases/workshop-name/`
2. Add infrastructure adapters in `infrastructure/external-apis/`
3. Update the orchestrator to include the new workshop
4. Add controller endpoints in `interfaces/http/controllers/`

## 🎯 For Hackathon Participants

### **Beginner-Friendly**
- Clear separation makes it easy to understand
- Each layer is documented and explained
- Examples show how everything connects

### **AI-Assisted Development**
- Clean folder structure works great with Cursor AI
- Well-organized code for better AI context
- Clear interfaces for AI to understand relationships

### **Progressive Learning**
- Start with the interface layer (controllers)
- Understand use cases and orchestration
- Dive into core business logic when ready

### **Real-World Patterns**
- Industry-standard clean architecture
- Patterns used in production systems
- Scalable design for growing applications

## 🚀 Getting Started for Contributors

1. **Explore the Structure**: Start with `src/main.js` to see how everything connects
2. **Review Controllers**: Check `src/interfaces/http/controllers/` for API handling
3. **Understand Orchestration**: Look at `src/application/services/AgentOrchestrator.js`
4. **Core Business Logic**: Explore entities and value objects in `src/core/`

## 📚 Resources

- **Clean Architecture**: [Original concepts by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- **Domain-Driven Design**: Core entities and value objects
- **Dependency Injection**: Proper service orchestration
- **SOLID Principles**: Applied throughout the codebase

---

**Ready to build the future of AI-powered development with clean, maintainable architecture!** 🎉