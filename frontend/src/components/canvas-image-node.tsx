"use client"

import React from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { Upload, Edit } from 'lucide-react'

export interface ImageNodeData {
  id: string
  imageUrl: string
  title: string
  template: string
  width: number
  height: number
}

export function CanvasImageNode({ data, selected }: NodeProps<ImageNodeData>) {
  const aspectRatio = data.width / data.height
  const nodeWidth = 200
  const nodeHeight = nodeWidth / aspectRatio
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg border-2 transition-all ${
        selected ? 'border-blue-400 shadow-xl' : 'border-gray-200'
      }`}
      style={{ width: nodeWidth, height: nodeHeight + 40 }}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2 border-gray-400 bg-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-gray-400 bg-white"
      />
      
      {/* Image Section */}
      <div 
        className="relative rounded-t-lg overflow-hidden"
        style={{ height: nodeHeight }}
      >
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Bottom Section */}
      <div className="h-10 px-3 py-2 flex items-center justify-between bg-gray-50 rounded-b-lg">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-700 truncate">
            {data.title}
          </p>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <Upload className="w-3 h-3 text-gray-500" />
          <Edit className="w-3 h-3 text-gray-500" />
        </div>
      </div>
    </div>
  )
}
