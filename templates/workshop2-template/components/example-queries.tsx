'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Rocket, Brain, Network } from 'lucide-react'

interface ExampleQueriesProps {
  mode: 'vector' | 'graph' | 'hybrid'
  onSelectQuery: (query: string) => void
}

const QUERIES = {
  vector: {
    icon: Brain,
    title: 'Vector RAG Examples',
    description: 'Semantic search through documents',
    queries: [
      {
        query: "Tell me about Laika, the space dog",
        purpose: "Searches for specific content in documents"
      },
      {
        query: "What does the Starship spacecraft do?",
        purpose: "Finds information about space technology"
      },
      {
        query: "Tell me about the Apollo program and moon landing",
        purpose: "Retrieves historical space information"
      },
      {
        query: "How does the Artemis program work?",
        purpose: "Searches for program details"
      }
    ]
  },
  graph: {
    icon: Network,
    title: 'Graph RAG Examples',
    description: 'Navigate and build knowledge graphs',
    queries: [
      {
        query: "Show me how NASA connects to the ISS",
        purpose: "Traverses relationships in the graph"
      },
      {
        query: "Show me all connections from SpaceX",
        purpose: "Traverses the knowledge graph"
      },
      {
        query: "Show me how Elon Musk connects to Mars",
        purpose: "Explores multi-hop relationships"
      },
      {
        query: "Add Blue Origin to the graph and connect it to commercial space",
        purpose: "Extends the knowledge graph"
      }
    ]
  },
  hybrid: {
    icon: Rocket,
    title: 'Hybrid RAG Examples',
    description: 'Combines vector search with graph navigation',
    queries: [
      {
        query: "Find all documents about Mars and show how the concepts connect",
        purpose: "Search + graph visualization"
      },
      {
        query: "Find information about Laika and show related space history",
        purpose: "Document search + graph connections"
      },
      {
        query: "How do NASA and SpaceX both relate to the ISS, and what documents mention this?",
        purpose: "Graph traversal + document search"
      },
      {
        query: "Create a comprehensive view of the Artemis program using all available information",
        purpose: "Full hybrid capabilities"
      }
    ]
  }
}

export function ExampleQueries({ mode, onSelectQuery }: ExampleQueriesProps) {
  const examples = QUERIES[mode]
  const Icon = examples.icon

  return (
    <Card className="mb-6 border-2 border-dashed">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{examples.title}</CardTitle>
        </div>
        <CardDescription>{examples.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <Lightbulb className="h-4 w-4" />
          <span>Try these example queries:</span>
        </div>
        {examples.queries.map((example, index) => (
          <div key={index} className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-auto py-2 px-3"
              onClick={() => onSelectQuery(example.query)}
            >
              <div className="space-y-1">
                <div className="font-medium text-sm">{example.query}</div>
                <div className="text-xs text-muted-foreground">{example.purpose}</div>
              </div>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}