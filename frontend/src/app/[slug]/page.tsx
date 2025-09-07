"use client"

import React from 'react'
import { 
  ReactFlow, 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  Connection,
  Edge,
  Node,
  NodeProps,
  ReactFlowProvider
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button } from "@/components/ui/button"
import { Plus, Sparkles, Check, X } from 'lucide-react'
import { CanvasNavigation } from "@/components/canvas-navigation"
import { CanvasImageNode, ImageNodeData } from "@/components/canvas-image-node"
import { ConnectionDialog } from "@/components/connection-dialog"
import { NodeDetailsDialog } from "@/components/node-details-dialog"

// Get initial nodes from localStorage or use defaults
const getInitialNodes = (slug: string): Node<ImageNodeData>[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`canvas-nodes-${slug}`)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved nodes:', e)
      }
    }
  }
  
  // Default nodes with original image URLs
  return [
    {
      id: '1',
      type: 'imageNode',
      position: { x: 200, y: 150 },
      data: {
        id: '1',
        imageUrl: 'https://www.minecraft.net/content/dam/minecraftnet/franchise/component-library/redeemheroa/Redeem-Hero_Mobile_576x324.png',
        title: 'Minecraft Castle',
        template: 'Minecraft',
        width: 400,
        height: 300
      }
    },
    {
      id: '2', 
      type: 'imageNode',
      position: { x: 650, y: 150 },
      data: {
        id: '2',
        imageUrl: 'https://static0.moviewebimages.com/wordpress/wp-content/uploads/2024/05/35-all-time-best-cartoon-characters-ever-created-ranked.jpg',
        title: 'Cartoon Characters',
        template: 'Cartoon',
        width: 300,
        height: 400
      }
    },
    {
      id: '3',
      type: 'imageNode', 
      position: { x: 200, y: 450 },
      data: {
        id: '3',
        imageUrl: 'https://sm.ign.com/ign_ap/feature/t/the-top-25/the-top-25-greatest-anime-characters-of-all-time_ge1p.jpg',
        title: 'Anime Characters',
        template: 'Anime',
        width: 350,
        height: 280
      }
    },
    {
      id: '4',
      type: 'imageNode',
      position: { x: 650, y: 450 },
      data: {
        id: '4', 
        imageUrl: 'https://images.stockcake.com/public/0/5/e/05edba27-2ba8-4d40-b42c-8908c8b2758b_large/child-s-pencil-portrait-stockcake.jpg',
        title: 'Realistic Portrait',
        template: 'Realistic',
        width: 280,
        height: 350
      }
    }
  ]
}

// Get initial viewport from localStorage or use defaults
const getInitialViewport = (slug: string) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`canvas-viewport-${slug}`)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved viewport:', e)
      }
    }
  }
  return { x: -100, y: -50, zoom: 0.6 }
}


interface CanvasPageProps {
  params: Promise<{
    slug: string
  }>
}

function CanvasFlow({ params }: CanvasPageProps) {
  const [slug, setSlug] = React.useState<string | null>(null)
  
  React.useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug)
    })
  }, [params])
  
  const [initialNodes] = React.useState(() => slug ? getInitialNodes(slug) : [])
  const [initialViewport] = React.useState(() => slug ? getInitialViewport(slug) : { x: -100, y: -50, zoom: 0.6 })
  
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<ImageNodeData>>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [showConnectionDialog, setShowConnectionDialog] = React.useState(false)
  const [showNodeDialog, setShowNodeDialog] = React.useState(false)
  const [selectedNodeData, setSelectedNodeData] = React.useState<ImageNodeData | null>(null)
  const [connectionInProgress, setConnectionInProgress] = React.useState<Connection | null>(null)
  const [lastConnectedNodePosition, setLastConnectedNodePosition] = React.useState<{x: number, y: number} | null>(null)
  
  // Save state to localStorage whenever nodes or viewport changes
  React.useEffect(() => {
    if (typeof window !== 'undefined' && slug) {
      localStorage.setItem(`canvas-nodes-${slug}`, JSON.stringify(nodes))
    }
  }, [nodes, slug])
  
  const saveViewport = React.useCallback((viewport: { x: number; y: number; zoom: number }) => {
    if (typeof window !== 'undefined' && slug) {
      localStorage.setItem(`canvas-viewport-${slug}`, JSON.stringify(viewport))
    }
  }, [slug])

  // Check if adding this connection would create separate groups
  const wouldCreateSeparateGroups = (newSource: string, newTarget: string, currentEdges: Edge[]) => {
    if (currentEdges.length === 0) return false
    
    // Get all connected nodes in current group
    const connectedNodes = new Set<string>()
    const addConnectedNodes = (nodeId: string) => {
      if (connectedNodes.has(nodeId)) return
      connectedNodes.add(nodeId)
      currentEdges.forEach(edge => {
        if (edge.source === nodeId && !connectedNodes.has(edge.target)) {
          addConnectedNodes(edge.target)
        }
        if (edge.target === nodeId && !connectedNodes.has(edge.source)) {
          addConnectedNodes(edge.source)
        }
      })
    }
    
    // Start with first connected node
    if (currentEdges.length > 0) {
      addConnectedNodes(currentEdges[0].source)
    }
    
    // Check if new connection would connect to existing group
    const newConnectionConnectsToGroup = connectedNodes.has(newSource) || connectedNodes.has(newTarget)
    return currentEdges.length > 0 && !newConnectionConnectsToGroup
  }

  const onConnect = React.useCallback((params: Connection) => {
    // Check if this would create separate groups
    if (wouldCreateSeparateGroups(params.source!, params.target!, edges)) {
      console.log('Cannot create separate groups - connections must be interconnected')
      return
    }

    // Add edge immediately but mark as pending confirmation
    const pendingEdge: Edge = {
      id: `pending-${params.source}-${params.target}`,
      source: params.source!,
      target: params.target!,
      type: 'default',
      style: { 
        strokeWidth: 4, 
        strokeDasharray: '10,5', 
        stroke: '#6366f1'
      },
      animated: true
    }
    
    setEdges(prev => [...prev, pendingEdge])
    setConnectionInProgress(params)
    setIsConnecting(true)
    
    // Set position for tick/X buttons next to target node
    const targetNode = nodes.find(node => node.id === params.target)
    if (targetNode) {
      setLastConnectedNodePosition({
        x: targetNode.position.x + 220 + 20, // node width + margin
        y: targetNode.position.y + 20
      })
    }
  }, [edges, nodes, setEdges])

  const confirmConnection = () => {
    if (connectionInProgress) {
      setShowConnectionDialog(true)
      setIsConnecting(false)
    }
  }

  const cancelConnection = () => {
    // Remove the pending connection edge
    if (connectionInProgress) {
      const edgeId = `pending-${connectionInProgress.source}-${connectionInProgress.target}`
      setEdges(prev => prev.filter(edge => edge.id !== edgeId))
    }
    setIsConnecting(false)
    setConnectionInProgress(null)
    setLastConnectedNodePosition(null)
  }

  const handleNodeClick = React.useCallback((nodeData: ImageNodeData) => {
    setSelectedNodeData(nodeData)
    setShowNodeDialog(true)
  }, [])

  const handleGenerateFromConnection = (instructions: string) => {
    // Here you would typically make an API call
    // For now, we'll just add a new node - this is the 5th node generated from connections
    const newNodeId = `generated-${Date.now()}`
    const newNode: Node<ImageNodeData> = {
      id: newNodeId,
      type: 'imageNode',
      position: { x: 450, y: 280 },
      data: {
        id: newNodeId,
        imageUrl: 'https://i.insider.com/518946e46bb3f7f94b00000d?width=850&format=jpeg',
        title: 'Generated Fusion',
        template: 'Generated',
        width: 380,
        height: 320,
        prompt: instructions
      }
    }

    setNodes(prev => [...prev, newNode])
    
    // Replace pending edge with confirmed edge
    if (connectionInProgress) {
      const pendingEdgeId = `pending-${connectionInProgress.source}-${connectionInProgress.target}`
      const confirmedEdge: Edge = {
        id: `confirmed-${connectionInProgress.source}-${connectionInProgress.target}`,
        source: connectionInProgress.source!,
        target: connectionInProgress.target!,
        type: 'default',
        style: { 
          strokeWidth: 3, 
          stroke: '#10b981'
        },
        animated: false
      }
      
      setEdges(prev => prev.filter(edge => edge.id !== pendingEdgeId).concat([confirmedEdge]))
      setConnectionInProgress(null)
    }
    setLastConnectedNodePosition(null)
  }

  const handleUpload = () => {
    // Handle image upload logic
    console.log('Upload image')
  }

  const handleGenerate = () => {
    // Handle direct generation logic - add a new node
    const newNodeId = `direct-${Date.now()}`
    const newNode: Node<ImageNodeData> = {
      id: newNodeId,
      type: 'imageNode',
      position: { x: 100, y: 300 },
      data: {
        id: newNodeId,
        imageUrl: 'https://i.insider.com/518946e46bb3f7f94b00000d?width=850&format=jpeg',
        title: 'Direct Generation',
        template: 'Generated',
        width: 300,
        height: 300
      }
    }
    setNodes(prev => [...prev, newNode])
  }

  const handleEditManually = () => {
    // Handle manual editing
    console.log('Edit manually')
    setShowConnectionDialog(false)
  }

  // Create custom node types with click handler
  const nodeTypesWithHandlers = React.useMemo(() => ({
    imageNode: (props: NodeProps) => <CanvasImageNode {...props} onNodeClick={handleNodeClick} />
  }), [handleNodeClick])

  if (!slug) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen relative">
      <CanvasNavigation />
      
      <div className={`ml-16 h-full transition-all duration-300 ${
        showConnectionDialog ? 'w-[calc(100%-4rem-24rem)]' : 'w-[calc(100%-4rem)]'
      }`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypesWithHandlers}
          defaultViewport={initialViewport}
          onViewportChange={saveViewport}
          fitViewOptions={{ 
            padding: 0.2,
            includeHiddenNodes: false,
            minZoom: 0.3,
            maxZoom: 1.2
          }}
          className="bg-white"
        >
          <Background color="#000" gap={20} size={1} />
          <Controls />
          
          {/* Connection confirmation buttons - positioned next to last connected node */}
          {isConnecting && lastConnectedNodePosition && (
            <div 
              className="absolute flex gap-3 z-10"
              style={{
                left: `${lastConnectedNodePosition.x}px`,
                top: `${lastConnectedNodePosition.y}px`,
                transform: 'translate(0, 0)'
              }}
            >
              <Button
                size="lg"
                onClick={confirmConnection}
                className="bg-green-600 hover:bg-green-700 shadow-xl w-12 h-12 p-0 rounded-full"
              >
                <Check className="w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={cancelConnection}
                className="shadow-xl w-12 h-12 p-0 rounded-full border-2 border-red-300 hover:border-red-500 hover:bg-red-50"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          )}
        </ReactFlow>
      </div>

      {/* Bottom right buttons - adjust position when sidebar is open */}
      <div className={`fixed bottom-6 flex flex-col gap-3 transition-all duration-300 ${
        showConnectionDialog ? 'right-[25.5rem]' : 'right-6'
      }`}>
        <Button
          size="lg"
          onClick={handleUpload}
          className="rounded-full w-16 h-16 p-0 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-8 h-8" />
        </Button>
        <Button
          size="lg"
          onClick={handleGenerate}
          className="rounded-full w-16 h-16 p-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          <Sparkles className="w-8 h-8" />
        </Button>
      </div>

      {/* Connection Dialog - Right Sidebar */}
      <ConnectionDialog
        open={showConnectionDialog}
        onOpenChange={setShowConnectionDialog}
        onGenerate={handleGenerateFromConnection}
        onEditManually={handleEditManually}
      />

      {/* Node Details Dialog - Center */}
      <NodeDetailsDialog
        open={showNodeDialog}
        onOpenChange={setShowNodeDialog}
        nodeData={selectedNodeData}
      />
    </div>
  )
}

export default function CanvasPage({ params }: CanvasPageProps) {
  return (
    <ReactFlowProvider>
      <CanvasFlow params={params} />
    </ReactFlowProvider>
  )
}
