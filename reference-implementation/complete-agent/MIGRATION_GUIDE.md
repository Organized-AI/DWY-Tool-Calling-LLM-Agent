# 🔄 Migration Guide: Legacy to Clean Architecture

## Overview

This guide helps you understand the migration from the original DWY Agent implementation to the new Clean Architecture version.

## Key Changes

### **File Structure Changes**

| Legacy | Clean Architecture | Purpose |
|--------|-------------------|---------|
| `src/agent.js` | `src/main.js` | Main entry point |
| `src/workshops/workshop1-planning.js` | `src/infrastructure/adapters/ProjectPlanningAdapter.js` | Workshop 1 integration |
| Direct class instantiation | Dependency injection | Proper layer separation |
| Monolithic class | Separated concerns | Better maintainability |

### **Architecture Changes**

#### **Before (Legacy)**
```javascript
// Everything in one class
class DWYAgent {
    constructor() {
        this.planning = new ProjectPlanning();
        this.memory = new KnowledgeGraph();
        // ... all workshops mixed together
    }
    
    async processMessage(message) {
        // Business logic mixed with infrastructure
    }
}
```

#### **After (Clean Architecture)**
```javascript
// Separated layers with dependency injection
class AgentOrchestrator {
    constructor(workshopServices, memoryService, aiService) {
        // Dependencies injected, not created
    }
}

// Main setup with proper DI
const orchestrator = new AgentOrchestrator(
    workshopServices,
    memoryService, 
    aiService
);
```

## Running Both Versions

### **Clean Architecture (Recommended)**
```bash
npm start        # New clean architecture version
npm run dev      # Development mode
```

### **Legacy Version**
```bash
npm run start:legacy    # Original implementation
npm run dev:legacy      # Legacy development mode
```

## API Compatibility

✅ **100% Backward Compatible** - All existing API endpoints work exactly the same:

- `POST /chat` - Same request/response format
- `POST /workshop1/plan` - Same functionality
- `GET /health` - Same health check
- All other endpoints unchanged

## Code Migration Examples

### **1. Message Processing**

#### Legacy
```javascript
// In agent.js
async processMessage(message, context) {
    // Mixed concerns
    await this.memory.store({...});
    const aiAnalysis = await this.ai.analyze(message);
    // Business logic mixed with infrastructure
}
```

#### Clean Architecture
```javascript
// In ProcessMessage use case
async execute(messageContent, context) {
    const response = await this.agentOrchestrator.processMessage(messageContent, context);
    return response;
}

// In AgentOrchestrator
async processMessage(messageContent, context) {
    // Pure orchestration logic
    const message = new Message(messageContent, 'user');
    // Clear separation of concerns
}
```

### **2. Workshop Integration**

#### Legacy
```javascript
// Direct instantiation in constructor
this.planning = new ProjectPlanning();
```

#### Clean Architecture
```javascript
// Dependency injection
class AgentOrchestrator {
    constructor(workshopServices, memoryService, aiService) {
        this.workshopServices = workshopServices;
    }
}

// Setup in main.js
const workshopServices = {
    planning: new ProjectPlanningAdapter()
};
```

### **3. HTTP Endpoints**

#### Legacy
```javascript
// Mixed in agent.js
this.app.post('/chat', async (req, res) => {
    const response = await this.processMessage(message, context);
    res.json(response);
});
```

#### Clean Architecture
```javascript
// Separated controller
class ChatController {
    async handleChat(req, res) {
        const response = await this.processMessageUseCase.execute(message, context);
        res.json(response.toJSON());
    }
}
```

## Benefits You Get

### **1. Better Testing**
```javascript
// Before: Hard to test (everything mixed)
// After: Easy to test each layer independently

// Test core logic without HTTP
const useCase = new ProcessMessage(mockOrchestrator);
const result = await useCase.execute("test message");
```

### **2. Easier Extension**
```javascript
// Before: Modify the monolithic DWYAgent class
// After: Add new use cases and adapters

// Add new workshop
const newWorkshop = new Workshop7Adapter();
workshopServices.workshop7 = newWorkshop;
```

### **3. Better Error Handling**
```javascript
// Before: Errors mixed throughout
// After: Centralized error handling per layer

// In controller
catch (error) {
    res.status(500).json({ error: 'Clean error response' });
}
```

## Development Workflow

### **1. Start with Interface Layer**
- Look at controllers in `src/interfaces/http/controllers/`
- Understand the HTTP API endpoints

### **2. Follow the Flow**
- Controller → Use Case → Orchestrator → Infrastructure
- Each layer has a clear responsibility

### **3. Add New Features**
- Create use case in `application/use-cases/`
- Add infrastructure adapter if needed
- Update controller to expose new endpoint

## Troubleshooting

### **If Clean Architecture Version Doesn't Work**
1. Check dependencies: `npm install`
2. Use legacy version: `npm run start:legacy`
3. Check logs for specific errors
4. Verify environment variables

### **Common Issues**
- **Module not found**: Check import paths in new structure
- **Service not initialized**: Check `main.js` initialization order
- **API differences**: Shouldn't happen - report if found

## Gradual Migration Strategy

1. **Phase 1**: Use both versions side by side
2. **Phase 2**: Understand clean architecture benefits
3. **Phase 3**: Develop new features using clean architecture
4. **Phase 4**: Gradually migrate legacy code

## Getting Help

- **Documentation**: Read `CLEAN_ARCHITECTURE_README.md`
- **Code Examples**: Check existing use cases and controllers
- **Legacy Reference**: Original code still available for comparison

---

**The clean architecture implementation provides the same functionality with better organization, testing, and maintainability!** 🚀