#!/usr/bin/env node

/**
 * Workshop 2: Knowledge Graph Implementation
 * AI memory system with Neo4j and Penumbra.ai integration
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');
const WebSocket = require('ws');
const http = require('http');

const { KnowledgeGraph } = require('./src/knowledge-graph');
const { MemoryManager } = require('./src/memory-manager');
const { PenumbraClient } = require('./src/penumbra-client');
const { RelationshipMapper } = require('./src/relationship-mapper');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3002;
const DEMO_MODE = process.env.DEMO_MODE === 'true';

// WebSocket server for real-time graph updates
const wss = new WebSocket.Server({ server });

// Initialize services
let knowledgeGraph;
let memoryManager;
let penumbraClient;
let relationshipMapper;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"]
    }
  }
}));
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize knowledge graph system
async function initializeServices() {
  try {
    console.log(chalk.blue('🧠 Initializing Knowledge Graph System...'));
    
    // Initialize Neo4j Knowledge Graph
    knowledgeGraph = new KnowledgeGraph({
      neo4j: {
        uri: process.env.NEO4J_URI || 'bolt://localhost:7687',
        username: process.env.NEO4J_USERNAME || 'neo4j',
        password: process.env.NEO4J_PASSWORD || 'password123',
        database: process.env.NEO4J_DATABASE || 'neo4j'
      },
      demoMode: DEMO_MODE
    });
    
    await knowledgeGraph.initialize();
    console.log(chalk.green('✅ Neo4j Knowledge Graph connected'));
    
    // Initialize Memory Manager
    memoryManager = new MemoryManager(knowledgeGraph, {
      demoMode: DEMO_MODE
    });
    console.log(chalk.green('✅ Memory Manager initialized'));
    
    // Initialize Penumbra Client
    penumbraClient = new PenumbraClient(process.env.PENUMBRA_API_KEY, {
      demoMode: DEMO_MODE
    });
    console.log(chalk.green('✅ Penumbra.ai client ready'));
    
    // Initialize Relationship Mapper
    relationshipMapper = new RelationshipMapper(knowledgeGraph, {
      demoMode: DEMO_MODE
    });
    console.log(chalk.green('✅ Relationship Mapper initialized'));
    
    // Load demo data if in demo mode
    if (DEMO_MODE) {
      await knowledgeGraph.loadDemoData();
      console.log(chalk.cyan('📊 Demo data loaded'));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Failed to initialize services:'), error);
    process.exit(1);
  }
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const neo4jHealth = await knowledgeGraph.checkHealth();
    
    res.json({
      status: 'ok',
      service: 'Knowledge Graph Implementation',
      workshop: 2,
      demoMode: DEMO_MODE,
      components: {
        neo4j: neo4jHealth ? 'connected' : 'disconnected',
        memory_manager: memoryManager ? 'ready' : 'not_initialized',
        penumbra: penumbraClient ? 'ready' : 'not_initialized',
        relationship_mapper: relationshipMapper ? 'ready' : 'not_initialized'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      demoMode: DEMO_MODE
    });
  }
});

// Knowledge Graph API Routes

// Get graph statistics
app.get('/api/graph/stats', async (req, res) => {
  try {
    const stats = await knowledgeGraph.getStatistics();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching graph stats:', error);
    res.status(500).json({ error: 'Failed to fetch graph statistics' });
  }
});

// Get graph data for visualization
app.get('/api/graph/data', async (req, res) => {
  try {
    const { limit = 50, node_types = '', relationship_types = '' } = req.query;
    
    const graphData = await knowledgeGraph.getGraphData({
      limit: parseInt(limit),
      nodeTypes: node_types ? node_types.split(',') : [],
      relationshipTypes: relationship_types ? relationship_types.split(',') : []
    });
    
    res.json(graphData);
  } catch (error) {
    console.error('Error fetching graph data:', error);
    res.status(500).json({ error: 'Failed to fetch graph data' });
  }
});

// Create entity
app.post('/api/graph/entities', async (req, res) => {
  try {
    const { type, properties } = req.body;
    const entity = await knowledgeGraph.createEntity(type, properties);
    
    // Broadcast update to WebSocket clients
    broadcastGraphUpdate('entity_created', { entity });
    
    res.json(entity);
  } catch (error) {
    console.error('Error creating entity:', error);
    res.status(500).json({ error: 'Failed to create entity' });
  }
});

// Create relationship
app.post('/api/graph/relationships', async (req, res) => {
  try {
    const { fromId, toId, type, properties } = req.body;
    const relationship = await knowledgeGraph.createRelationship(fromId, toId, type, properties);
    
    // Broadcast update to WebSocket clients
    broadcastGraphUpdate('relationship_created', { relationship });
    
    res.json(relationship);
  } catch (error) {
    console.error('Error creating relationship:', error);
    res.status(500).json({ error: 'Failed to create relationship' });
  }
});

// Search entities
app.get('/api/graph/search', async (req, res) => {
  try {
    const { query, type, limit = 20 } = req.query;
    const results = await knowledgeGraph.searchEntities(query, {
      type,
      limit: parseInt(limit)
    });
    res.json(results);
  } catch (error) {
    console.error('Error searching entities:', error);
    res.status(500).json({ error: 'Failed to search entities' });
  }
});

// Get entity with relationships
app.get('/api/graph/entities/:id', async (req, res) => {
  try {
    const entity = await knowledgeGraph.getEntityWithRelationships(req.params.id);
    if (!entity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.json(entity);
  } catch (error) {
    console.error('Error fetching entity:', error);
    res.status(500).json({ error: 'Failed to fetch entity' });
  }
});

// Memory Management API Routes

// Store conversation memory
app.post('/api/memory/conversations', async (req, res) => {
  try {
    const conversationData = req.body;
    const memory = await memoryManager.storeConversation(conversationData);
    
    // Broadcast memory update
    broadcastGraphUpdate('memory_stored', { memory });
    
    res.json(memory);
  } catch (error) {
    console.error('Error storing conversation:', error);
    res.status(500).json({ error: 'Failed to store conversation' });
  }
});

// Get relevant context
app.post('/api/memory/context', async (req, res) => {
  try {
    const { query, limit = 5, include_relationships = true } = req.body;
    const context = await memoryManager.getRelevantContext({
      query,
      limit,
      include_relationships
    });
    res.json(context);
  } catch (error) {
    console.error('Error retrieving context:', error);
    res.status(500).json({ error: 'Failed to retrieve context' });
  }
});

// Get memory patterns
app.get('/api/memory/patterns', async (req, res) => {
  try {
    const patterns = await memoryManager.analyzePatterns();
    res.json(patterns);
  } catch (error) {
    console.error('Error analyzing patterns:', error);
    res.status(500).json({ error: 'Failed to analyze patterns' });
  }
});

// Penumbra.ai Integration API Routes

// Organize thoughts
app.post('/api/penumbra/organize', async (req, res) => {
  try {
    const { thoughts, context } = req.body;
    const organization = await penumbraClient.organizeThoughts({
      thoughts,
      context
    });
    
    // Store organized thoughts in knowledge graph
    if (organization && organization.connections) {
      await knowledgeGraph.storeThoughtConnections(organization);
      broadcastGraphUpdate('thoughts_organized', { organization });
    }
    
    res.json(organization);
  } catch (error) {
    console.error('Error organizing thoughts:', error);
    res.status(500).json({ error: 'Failed to organize thoughts' });
  }
});

// Generate insights
app.post('/api/penumbra/insights', async (req, res) => {
  try {
    const { domain, entities } = req.body;
    const insights = await penumbraClient.generateInsights({
      domain,
      entities,
      graph_context: await knowledgeGraph.getContext(entities)
    });
    res.json(insights);
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Relationship Mapping API Routes

// Analyze relationships
app.post('/api/relationships/analyze', async (req, res) => {
  try {
    const { entity_id, depth = 2 } = req.body;
    const analysis = await relationshipMapper.analyzeRelationships(entity_id, depth);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing relationships:', error);
    res.status(500).json({ error: 'Failed to analyze relationships' });
  }
});

// Find shortest path
app.post('/api/relationships/path', async (req, res) => {
  try {
    const { from_id, to_id, max_depth = 5 } = req.body;
    const path = await relationshipMapper.findShortestPath(from_id, to_id, max_depth);
    res.json(path);
  } catch (error) {
    console.error('Error finding path:', error);
    res.status(500).json({ error: 'Failed to find path' });
  }
});

// Get relationship recommendations
app.get('/api/relationships/recommendations/:entity_id', async (req, res) => {
  try {
    const recommendations = await relationshipMapper.getRecommendations(req.params.entity_id);
    res.json(recommendations);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Cypher Query Interface (for advanced users)
app.post('/api/graph/cypher', async (req, res) => {
  try {
    const { query, parameters = {} } = req.body;
    
    // Security: Only allow read operations in demo/workshop mode
    if (!query.toUpperCase().startsWith('MATCH') && !query.toUpperCase().startsWith('CALL')) {
      return res.status(400).json({ error: 'Only read operations are allowed' });
    }
    
    const result = await knowledgeGraph.executeCypher(query, parameters);
    res.json(result);
  } catch (error) {
    console.error('Error executing Cypher query:', error);
    res.status(500).json({ error: 'Failed to execute query' });
  }
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('📡 WebSocket client connected');
  
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'subscribe_updates':
          ws.isSubscribed = true;
          break;
        case 'graph_query':
          const result = await knowledgeGraph.executeCypher(data.query, data.parameters);
          ws.send(JSON.stringify({
            type: 'query_result',
            id: data.id,
            result
          }));
          break;
      }
    } catch (error) {
      ws.send(JSON.stringify({
        type: 'error',
        message: error.message
      }));
    }
  });
  
  ws.on('close', () => {
    console.log('📡 WebSocket client disconnected');
  });
});

// Broadcast graph updates to connected clients
function broadcastGraphUpdate(type, data) {
  const message = JSON.stringify({
    type: 'graph_update',
    updateType: type,
    data,
    timestamp: new Date().toISOString()
  });
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.isSubscribed) {
      client.send(message);
    }
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message,
    demoMode: DEMO_MODE
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Initialize and start server
async function startServer() {
  try {
    await initializeServices();
    
    server.listen(PORT, () => {
      console.log(chalk.green('🧠 Workshop 2: Knowledge Graph Implementation'));
      console.log(chalk.blue(`📡 Server running on http://localhost:${PORT}`));
      console.log(chalk.blue(`🌐 Neo4j Browser: http://localhost:7474`));
      console.log(chalk.yellow(`🎯 Demo Mode: ${DEMO_MODE ? 'ON' : 'OFF'}`));
      
      if (DEMO_MODE) {
        console.log(chalk.cyan('💡 Demo mode is active - sample data loaded!'));
        console.log(chalk.cyan('🔧 Set DEMO_MODE=false to use real integrations'));
      } else {
        console.log(chalk.magenta('🔑 Real integrations active'));
        console.log(chalk.magenta('📝 Make sure your .env file is configured'));
      }
      
      console.log(chalk.green('\\n✨ Ready to explore knowledge graphs and AI memory!'));
      console.log(chalk.white(`\\n🌐 Open http://localhost:${PORT} to get started`));
      console.log(chalk.white(`🗃️  Neo4j Browser: http://localhost:7474 (neo4j/password123)`));
    });
  } catch (error) {
    console.error(chalk.red('❌ Failed to start server:'), error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log(chalk.yellow('\\n🛑 Shutting down gracefully...'));
  
  try {
    if (knowledgeGraph) {
      await knowledgeGraph.close();
      console.log(chalk.blue('📊 Neo4j connection closed'));
    }
    
    wss.close(() => {
      console.log(chalk.blue('📡 WebSocket server closed'));
    });
    
    server.close(() => {
      console.log(chalk.blue('🌐 HTTP server closed'));
      process.exit(0);
    });
  } catch (error) {
    console.error(chalk.red('Error during shutdown:'), error);
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start the application
startServer();

module.exports = app;
