"use client"

import React from 'react'
import { 
  ReactFlow, 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button } from "@/components/ui/button"
import { Plus, Sparkles, Check, X } from 'lucide-react'
import { CanvasNavigation } from "@/components/canvas-navigation"
import { CanvasImageNode, ImageNodeData } from "@/components/canvas-image-node"
import { ConnectionDialog } from "@/components/connection-dialog"

// Sample template data
const sampleNodes: Node<ImageNodeData>[] = [
  {
    id: '1',
    type: 'imageNode',
    position: { x: 100, y: 100 },
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
    position: { x: 400, y: 200 },
    data: {
      id: '2',
      imageUrl: 'https://static0.moviewebimages.com/wordpress/wp-content/uploads/2024/05/35-all-time-best-cartoon-characters-ever-created-ranked.jpg',
      title: 'Cartoon Characters',
      template: 'Cartoon',
      width: 300,
      height: 400
    }
  }
]

const nodeTypes = {
  imageNode: CanvasImageNode,
}

interface CanvasPageProps {
  params: {
    slug: string
  }
}

function CanvasFlow({ params }: CanvasPageProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(sampleNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [showConnectionDialog, setShowConnectionDialog] = React.useState(false)
  const [connectionInProgress, setConnectionInProgress] = React.useState<Connection | null>(null)

  const onConnect = React.useCallback((params: Connection) => {
    // Don't add edge immediately, store the connection for confirmation
    setConnectionInProgress(params)
    setIsConnecting(true)
  }, [])

  const confirmConnection = () => {
    if (connectionInProgress) {
      setShowConnectionDialog(true)
      setIsConnecting(false)
      setConnectionInProgress(null)
    }
  }

  const cancelConnection = () => {
    setIsConnecting(false)
    setConnectionInProgress(null)
  }

  const handleGenerateFromConnection = (instructions: string) => {
    // Here you would typically make an API call
    // For now, we'll just add a new node
    const newNodeId = `node-${Date.now()}`
    const newNode: Node<ImageNodeData> = {
      id: newNodeId,
      type: 'imageNode',
      position: { x: 600, y: 300 },
      data: {
        id: newNodeId,
        imageUrl: 'https://i.insider.com/518946e46bb3f7f94b00000d?width=850&format=jpeg',
        title: 'Generated Image',
        template: 'Generated',
        width: 350,
        height: 350
      }
    }

    setNodes(prev => [...prev, newNode])
    
    // Add the connection edge
    if (connectionInProgress) {
      setEdges(prev => addEdge(connectionInProgress, prev))
    }
  }

  const handleUpload = () => {
    // Handle image upload logic
    console.log('Upload image')
  }

  const handleGenerate = () => {
    // Handle direct generation logic
    console.log('Generate new image')
  }

  const handleEditManually = () => {
    // Handle manual editing
    console.log('Edit manually')
    setShowConnectionDialog(false)
  }

  return (
    <div className="h-screen w-screen relative">
      <CanvasNavigation />
      
      <div className="ml-16 h-full w-[calc(100%-4rem)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-white"
        >
          <Background color="#000" gap={20} size={1} />
          <Controls />
          
          {/* Connection confirmation buttons */}
          {isConnecting && (
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <Button
                size="sm"
                onClick={confirmConnection}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={cancelConnection}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </ReactFlow>
      </div>

      {/* Bottom right buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Button
          size="lg"
          onClick={handleUpload}
          className="rounded-full w-14 h-14 p-0 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <Button
          size="lg"
          onClick={handleGenerate}
          className="rounded-full w-14 h-14 p-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>

      {/* Connection Dialog */}
      <ConnectionDialog
        open={showConnectionDialog}
        onOpenChange={setShowConnectionDialog}
        onGenerate={handleGenerateFromConnection}
        onEditManually={handleEditManually}
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
