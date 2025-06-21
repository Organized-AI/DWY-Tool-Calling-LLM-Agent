'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Connection,
  NodeTypes,
  Handle,
  Position,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from 'dagre'

// Custom node component with hover tooltip
const CustomNode = ({ data }: { data: any }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Handle type="target" position={Position.Top} />
      <div className={`
        px-4 py-2 rounded-full border-2 min-w-[80px] text-center
        ${data.type === 'concept' ? 'bg-blue-100 border-blue-400 dark:bg-blue-900/20' : ''}
        ${data.type === 'person' ? 'bg-green-100 border-green-400 dark:bg-green-900/20' : ''}
        ${data.type === 'technology' ? 'bg-purple-100 border-purple-400 dark:bg-purple-900/20' : ''}
        ${!data.type ? 'bg-gray-100 border-gray-400 dark:bg-gray-900/20' : ''}
        transition-all hover:shadow-lg cursor-pointer
      `}>
        <p className="text-sm font-medium">{data.label}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
      
      {showTooltip && data.description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            {data.description}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        </div>
      )}
    </div>
  )
}

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

interface GraphVisualizationProps {
  data?: {
    nodes: Array<{ id: string; label: string; type?: string; description?: string }>
    edges?: Array<{ source: string; target: string; label?: string }>
  }
}

export function GraphVisualization({ data }: GraphVisualizationProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  // Auto-layout function using dagre
  const getLayoutedElements = useCallback((nodes: Node[], edges: Edge[]) => {
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: 'TB', ranksep: 100, nodesep: 100 })

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 150, height: 50 })
    })

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - 75,
          y: nodeWithPosition.y - 25,
        },
      }
    })

    return { nodes: layoutedNodes, edges }
  }, [])

  // Update graph when data changes
  useEffect(() => {
    if (data && data.nodes && data.nodes.length > 0) {
      const flowNodes: Node[] = data.nodes.map((node) => ({
        id: node.id,
        type: 'custom',
        data: { 
          label: node.label, 
          type: node.type,
          description: node.description 
        },
        position: { x: 0, y: 0 },
      }))

      const flowEdges: Edge[] = (data.edges || []).map((edge, idx) => ({
        id: `edge-${idx}-${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }))

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        flowNodes,
        flowEdges
      )

      setNodes(layoutedNodes)
      setEdges(layoutedEdges)
    }
  }, [data, setNodes, setEdges, getLayoutedElements])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  // Sample data for initial display
  useEffect(() => {
    if (!data || data.nodes.length === 0) {
      const sampleNodes = [
        { id: '1', label: 'Knowledge Graph', type: 'concept', description: 'A structured representation of information' },
        { id: '2', label: 'LLM', type: 'technology', description: 'Large Language Model' },
        { id: '3', label: 'RAG', type: 'concept', description: 'Retrieval-Augmented Generation' },
        { id: '4', label: 'Supabase', type: 'technology', description: 'Open source Firebase alternative' },
        { id: '5', label: 'PostgreSQL', type: 'technology', description: 'Relational database' },
      ]

      const sampleEdges = [
        { source: '1', target: '3', label: 'enhances' },
        { source: '2', target: '3', label: 'powers' },
        { source: '4', target: '5', label: 'built on' },
        { source: '1', target: '5', label: 'stored in' },
      ]

      const flowNodes: Node[] = sampleNodes.map((node) => ({
        id: node.id,
        type: 'custom',
        data: node,
        position: { x: 0, y: 0 },
      }))

      const flowEdges: Edge[] = sampleEdges.map((edge) => ({
        id: `e${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        type: 'smoothstep',
        animated: true,
      }))

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        flowNodes,
        flowEdges
      )

      setNodes(layoutedNodes)
      setEdges(layoutedEdges)
    }
  }, [data, setNodes, setEdges, getLayoutedElements])

  return (
    <div className="h-[600px] bg-neutral-50 dark:bg-neutral-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-neutral-50 dark:bg-neutral-950"
      >
        <Background color="#a0a0a0" gap={20} />
        <Controls className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg" />
      </ReactFlow>
    </div>
  )
}