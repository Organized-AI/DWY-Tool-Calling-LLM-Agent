'use client'

import { useState, useEffect } from 'react'
import { ModeSwitcher, RAGMode } from '@/components/mode-switcher'
import { ChatInterface } from '@/components/chat-interface'
import { GraphVisualization } from '@/components/graph-visualization'
import { Badge } from '@/components/ui/badge'
import { Brain, Network, Sparkles } from 'lucide-react'

const modeDescriptions = {
  vector: {
    title: 'Vector RAG',
    description: 'Traditional semantic search using embeddings',
    icon: Brain,
    color: 'text-blue-500'
  },
  graph: {
    title: 'GraphRAG',
    description: 'Knowledge graph traversal and reasoning',
    icon: Network,
    color: 'text-green-500'
  },
  hybrid: {
    title: 'Hybrid',
    description: 'Combines vector search with graph structure',
    icon: Sparkles,
    color: 'text-purple-500'
  }
}

export default function Home() {
  const [mode, setMode] = useState<RAGMode>('vector')
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] })

  const currentMode = modeDescriptions[mode]
  const Icon = currentMode.icon

  // Load initial graph data
  useEffect(() => {
    fetch('/api/graph')
      .then(res => res.json())
      .then(data => setGraphData(data))
      .catch(err => console.error('Failed to load graph:', err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                Knowledge Graph Demo
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                AI SDK v3 + Supabase
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Icon className={`w-5 h-5 ${currentMode.color}`} />
              <span className="text-sm font-medium hidden sm:inline">
                {currentMode.title} Mode
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Mode Switcher Section */}
          <div className="mb-8 text-center">
            <ModeSwitcher mode={mode} onModeChange={setMode} />
            <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
              {currentMode.description}
            </p>
          </div>

          {/* Chat and Graph Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chat Interface */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="font-semibold text-lg">Chat Interface</h2>
                <p className="text-sm text-muted-foreground">
                  Ask questions and see how different RAG modes respond
                </p>
              </div>
              <ChatInterface 
                key={mode}
                mode={mode} 
                onGraphUpdate={setGraphData}
              />
            </div>

            {/* Graph Visualization */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="font-semibold text-lg">Knowledge Graph</h2>
                <p className="text-sm text-muted-foreground">
                  Real-time visualization of nodes and relationships
                </p>
              </div>
              <GraphVisualization data={graphData} />
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(modeDescriptions).map(([key, desc]) => {
              const ModeIcon = desc.icon
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg border ${
                    mode === key 
                      ? 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900' 
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50'
                  } transition-all cursor-pointer hover:shadow-sm`}
                  onClick={() => setMode(key as RAGMode)}
                >
                  <div className="flex items-start space-x-3">
                    <ModeIcon className={`w-5 h-5 mt-0.5 ${desc.color}`} />
                    <div>
                      <h3 className="font-medium">{desc.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {desc.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built for hackathon developers who want to understand Knowledge Graphs + AI</p>
          <p className="mt-2">
            No Neo4j required - just PostgreSQL/Supabase 🚀
          </p>
        </div>
      </footer>
    </div>
  )
}