'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type RAGMode = 'vector' | 'graph' | 'hybrid'

interface ModeSwitcherProps {
  mode: RAGMode
  onModeChange: (mode: RAGMode) => void
}

export function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-sm font-medium text-muted-foreground">RAG Mode</h2>
      <Tabs value={mode} onValueChange={(value) => onModeChange(value as RAGMode)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vector">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium">Vector RAG</span>
              <span className="text-[10px] text-muted-foreground">Traditional</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="graph">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium">GraphRAG</span>
              <span className="text-[10px] text-muted-foreground">Knowledge Graph</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="hybrid">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium">Hybrid</span>
              <span className="text-[10px] text-muted-foreground">Combined</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}