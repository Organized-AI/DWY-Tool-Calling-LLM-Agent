# Platform Integrations Guide
**Partner Platform Setup and Configuration**

## Overview

This guide provides detailed setup instructions for all six partner platforms used in the DWY Tool Calling LLM Agent workshops. Each platform contributes unique capabilities to the final agent.

---

## 🔧 Workshop 1: DeepInvent.ai Integration

### Platform Overview
**DeepInvent.ai** provides AI-powered patent analysis and application services, enabling rapid innovation protection and intellectual property management.

### Setup Instructions

#### 1. Account Creation
1. Visit [DeepInvent.ai](https://deepinvent.ai/)
2. Click "Sign Up" and create an account
3. Verify your email address
4. Complete the onboarding process

#### 2. API Key Generation
1. Navigate to your dashboard
2. Go to "API Keys" section
3. Click "Generate New Key"
4. Copy the API key and store securely

#### 3. Integration Code
```javascript
// DeepInvent.ai Integration
class DeepInventIntegration {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.deepinvent.ai/v1';
  }
  
  async analyzePatentability(innovation) {
    const response = await fetch(`${this.baseURL}/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: innovation.title,
        description: innovation.description,
        category: innovation.category,
        analysis_type: 'comprehensive'
      })
    });
    
    return await response.json();
  }
  
  async generatePatentApplication(innovation) {
    const response = await fetch(`${this.baseURL}/generate-application`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(innovation)
    });
    
    return await response.json();
  }
}
```

#### 4. Environment Configuration
```env
DEEPINVENT_API_KEY=your_api_key_here
DEEPINVENT_ENDPOINT=https://api.deepinvent.ai/v1
DEEPINVENT_TIMEOUT=30000
```

---

## 🧠 Workshop 2: Penumbra.ai Integration

### Platform Overview
**Penumbra.ai** specializes in connecting and organizing thoughts, providing advanced knowledge organization and relationship mapping capabilities.

### Setup Instructions

#### 1. Account Setup
1. Visit [Penumbra.ai](https://www.getpenumbra.ai/)
2. Request access (currently in beta)
3. Complete the application process
4. Await approval and setup instructions

#### 2. API Configuration
```javascript
// Penumbra.ai Integration
class PenumbraIntegration {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.getpenumbra.ai/v1';
  }
  
  async analyzeConnections(thought, context = []) {
    const response = await fetch(`${this.baseURL}/analyze-connections`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: thought,
        context: context,
        analysis_depth: 'comprehensive',
        find_relationships: true
      })
    });
    
    return await response.json();
  }
  
  async organizeThoughts(thoughts) {
    const response = await fetch(`${this.baseURL}/organize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        thoughts: thoughts,
        organization_type: 'knowledge_graph',
        include_suggestions: true
      })
    });
    
    return await response.json();
  }
}
```

#### 3. Environment Configuration
```env
PENUMBRA_API_KEY=your_api_key_here
PENUMBRA_ENDPOINT=https://api.getpenumbra.ai/v1
PENUMBRA_MODEL=thought_organizer_v2
```

---

## 🗣️ Workshop 3: Sindarin.tech Integration

### Platform Overview
**Sindarin.tech** provides advanced voice AI capabilities for natural customer communication and engagement.

### Setup Instructions

#### 1. Platform Access
1. Visit [Sindarin.tech](https://www.sindarin.tech/)
2. Sign up for a developer account
3. Complete voice AI training modules
4. Generate API credentials

#### 2. Voice AI Implementation
```javascript
// Sindarin.tech Voice AI Integration
class SindarinVoiceAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.sindarin.tech/v1';
    this.websocket = null;
  }
  
  async createVoiceAgent(config) {
    const response = await fetch(`${this.baseURL}/agents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personality: config.personality || 'professional',
        voice_model: config.voice || 'natural_conversational',
        language: config.language || 'en-US',
        specialization: config.specialization || 'business_communication'
      })
    });
    
    return await response.json();
  }
  
  async processVoiceInteraction(audioData, context) {
    const formData = new FormData();
    formData.append('audio', audioData);
    formData.append('context', JSON.stringify(context));
    
    const response = await fetch(`${this.baseURL}/process-voice`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: formData
    });
    
    return await response.json();
  }
  
  async generateVoiceResponse(text, voiceConfig) {
    const response = await fetch(`${this.baseURL}/synthesize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        voice: voiceConfig.voice,
        emotion: voiceConfig.emotion || 'neutral',
        speed: voiceConfig.speed || 1.0
      })
    });
    
    return await response.arrayBuffer();
  }
}
```

#### 3. Environment Configuration
```env
SINDARIN_API_KEY=your_api_key_here
SINDARIN_ENDPOINT=https://api.sindarin.tech/v1
SINDARIN_VOICE_MODEL=natural_conversational
SINDARIN_LANGUAGE=en-US
```

---

## 🎬 Workshop 4: Texel.ai Integration

### Platform Overview
**Texel.ai** provides advanced AI video generation capabilities for marketing and business communication.

### Setup Instructions

#### 1. Platform Registration
1. Visit [Texel.ai](https://texel.ai/)
2. Create a developer account
3. Complete the verification process
4. Access the API dashboard

#### 2. Video Generation Implementation
```javascript
// Texel.ai Video Generation Integration
class TexelVideoGenerator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.texel.ai/v1';
  }
  
  async generateVideo(videoConfig) {
    const response = await fetch(`${this.baseURL}/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        script: videoConfig.script,
        style: videoConfig.style || 'professional',
        duration: videoConfig.duration || 60,
        resolution: videoConfig.resolution || '1080p',
        brand_assets: videoConfig.brandAssets,
        target_audience: videoConfig.targetAudience
      })
    });
    
    return await response.json();
  }
  
  async getVideoStatus(videoId) {
    const response = await fetch(`${this.baseURL}/videos/${videoId}/status`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
    
    return await response.json();
  }
  
  async downloadVideo(videoId) {
    const response = await fetch(`${this.baseURL}/videos/${videoId}/download`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
    
    return await response.arrayBuffer();
  }
  
  async optimizeForChannel(videoId, channel) {
    const response = await fetch(`${this.baseURL}/videos/${videoId}/optimize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: channel,
        optimization_type: 'automatic'
      })
    });
    
    return await response.json();
  }
}
```

#### 3. Environment Configuration
```env
TEXEL_API_KEY=your_api_key_here
TEXEL_ENDPOINT=https://api.texel.ai/v1
TEXEL_DEFAULT_QUALITY=1080p
TEXEL_MAX_DURATION=300
```

---

## 🔧 Workshop 5: Toolhouse.ai Integration

### Platform Overview
**Toolhouse.ai** provides a comprehensive platform for tool calling and AI agent orchestration.

### Setup Instructions

#### 1. Account Setup
1. Visit [Toolhouse.ai](https://toolhouse.ai/)
2. Sign up for a developer account
3. Complete the platform onboarding
4. Generate API credentials

#### 2. Tool Calling Implementation
```javascript
// Toolhouse.ai Integration
class ToolhouseIntegration {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.toolhouse.ai/v1';
  }
  
  async discoverTools() {
    const response = await fetch(`${this.baseURL}/tools`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });
    
    return await response.json();
  }
  
  async executeTool(toolName, parameters) {
    const response = await fetch(`${this.baseURL}/tools/${toolName}/execute`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parameters: parameters,
        execution_mode: 'synchronous'
      })
    });
    
    return await response.json();
  }
  
  async createToolChain(tools, context) {
    const response = await fetch(`${this.baseURL}/chains`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tools: tools,
        context: context,
        optimization: 'speed'
      })
    });
    
    return await response.json();
  }
  
  async registerCustomTool(toolDefinition) {
    const response = await fetch(`${this.baseURL}/tools/custom`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toolDefinition)
    });
    
    return await response.json();
  }
}
```

#### 3. Environment Configuration
```env
TOOLHOUSE_API_KEY=your_api_key_here
TOOLHOUSE_ENDPOINT=https://api.toolhouse.ai/v1
TOOLHOUSE_TIMEOUT=30000
TOOLHOUSE_MAX_TOOLS=50
```

---

## 🏠 Workshop 6: WebAI.com Integration

### Platform Overview
**WebAI.com** provides comprehensive resources and tools for local AI deployment and optimization.

### Setup Instructions

#### 1. Resource Access
1. Visit [WebAI.com](https://www.webai.com/)
2. Create an account for resource access
3. Download recommended tools and guides
4. Access the community forum

#### 2. Local AI Management
```javascript
// WebAI.com Resource Integration
class WebAIIntegration {
  constructor() {
    this.resourcesURL = 'https://resources.webai.com';
    this.toolsURL = 'https://tools.webai.com';
  }
  
  async getOptimalModelRecommendations(useCase, hardware) {
    const response = await fetch(`${this.resourcesURL}/model-recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        use_case: useCase,
        hardware_specs: hardware,
        optimization_goal: 'balanced'
      })
    });
    
    return await response.json();
  }
  
  async downloadOptimizationTools() {
    const response = await fetch(`${this.toolsURL}/optimization-suite`);
    return await response.arrayBuffer();
  }
  
  async getDeploymentGuide(platform) {
    const response = await fetch(`${this.resourcesURL}/guides/${platform}`);
    return await response.json();
  }
  
  async benchmarkLocalSetup(systemSpecs) {
    const response = await fetch(`${this.toolsURL}/benchmark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(systemSpecs)
    });
    
    return await response.json();
  }
}
```

#### 3. Environment Configuration
```env
WEBAI_RESOURCES_ENABLED=true
WEBAI_OPTIMIZATION_LEVEL=maximum
WEBAI_TELEMETRY=anonymous
LOCAL_AI_PRIVACY_MODE=strict
```

---

## 🔄 Cross-Platform Integration

### Unified Configuration Manager
```javascript
// Unified Platform Integration Manager
class PlatformIntegrationManager {
  constructor(config) {
    this.platforms = {
      deepinvent: new DeepInventIntegration(config.deepinvent.apiKey),
      penumbra: new PenumbraIntegration(config.penumbra.apiKey),
      sindarin: new SindarinVoiceAI(config.sindarin.apiKey),
      texel: new TexelVideoGenerator(config.texel.apiKey),
      toolhouse: new ToolhouseIntegration(config.toolhouse.apiKey),
      webai: new WebAIIntegration()
    };
  }
  
  async initializeAllPlatforms() {
    const results = {};
    
    for (const [name, platform] of Object.entries(this.platforms)) {
      try {
        if (platform.initialize) {
          results[name] = await platform.initialize();
        } else {
          results[name] = { status: 'ready' };
        }
      } catch (error) {
        results[name] = { status: 'error', error: error.message };
      }
    }
    
    return results;
  }
  
  async executeWorkflow(workflow) {
    const results = [];
    
    for (const step of workflow.steps) {
      const platform = this.platforms[step.platform];
      const result = await platform[step.method](step.parameters);
      results.push({
        step: step.name,
        platform: step.platform,
        result: result
      });
    }
    
    return results;
  }
}
```

### Environment Variables Summary
```env
# All Platform API Keys
DEEPINVENT_API_KEY=your_deepinvent_key
PENUMBRA_API_KEY=your_penumbra_key
SINDARIN_API_KEY=your_sindarin_key
TEXEL_API_KEY=your_texel_key
TOOLHOUSE_API_KEY=your_toolhouse_key

# Platform Endpoints
DEEPINVENT_ENDPOINT=https://api.deepinvent.ai/v1
PENUMBRA_ENDPOINT=https://api.getpenumbra.ai/v1
SINDARIN_ENDPOINT=https://api.sindarin.tech/v1
TEXEL_ENDPOINT=https://api.texel.ai/v1
TOOLHOUSE_ENDPOINT=https://api.toolhouse.ai/v1

# Feature Flags
ENABLE_PATENT_ANALYSIS=true
ENABLE_THOUGHT_ORGANIZATION=true
ENABLE_VOICE_AI=true
ENABLE_VIDEO_GENERATION=true
ENABLE_TOOL_CALLING=true
ENABLE_LOCAL_AI=true

# Integration Settings
PLATFORM_TIMEOUT=30000
MAX_RETRIES=3
ENABLE_CACHING=true
CACHE_TTL=3600
```

## 🧪 Testing Platform Integrations

### Integration Test Script
```bash
#!/bin/bash
# test-integrations.sh

echo "🧪 Testing Platform Integrations..."

# Test DeepInvent.ai
echo "Testing DeepInvent.ai..."
curl -H "Authorization: Bearer $DEEPINVENT_API_KEY" \
     "$DEEPINVENT_ENDPOINT/health" && echo "✅ DeepInvent.ai" || echo "❌ DeepInvent.ai"

# Test Sindarin.tech
echo "Testing Sindarin.tech..."
curl -H "Authorization: Bearer $SINDARIN_API_KEY" \
     "$SINDARIN_ENDPOINT/health" && echo "✅ Sindarin.tech" || echo "❌ Sindarin.tech"

# Test Texel.ai
echo "Testing Texel.ai..."
curl -H "Authorization: Bearer $TEXEL_API_KEY" \
     "$TEXEL_ENDPOINT/health" && echo "✅ Texel.ai" || echo "❌ Texel.ai"

# Test Toolhouse.ai
echo "Testing Toolhouse.ai..."
curl -H "Authorization: Bearer $TOOLHOUSE_API_KEY" \
     "$TOOLHOUSE_ENDPOINT/health" && echo "✅ Toolhouse.ai" || echo "❌ Toolhouse.ai"

echo "\n🎯 Platform integration testing complete!"
```

---

**All platforms are now configured and ready for use in your DWY Tool Calling LLM Agent!** 🚀