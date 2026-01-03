"use client"

import React from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { Wand2, Palette, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export interface ImageNodeData extends Record<string, unknown> {
  id: string
  imageUrl: string
  title: string
  template: string
  width: number
  height: number
  prompt?: string
}

interface CanvasImageNodeProps extends NodeProps {
  data: ImageNodeData
  onNodeClick?: (data: ImageNodeData) => void
}

export function CanvasImageNode({ data, selected, onNodeClick }: CanvasImageNodeProps) {
  const aspectRatio = data.width / data.height
  const nodeWidth = 220
  const nodeHeight = nodeWidth / aspectRatio
  
  const getTemplateIcons = (template: string) => {
    switch (template.toLowerCase()) {
      case 'minecraft':
        return [
          <div key="minecraft" className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">M</div>,
          <div key="block" className="w-4 h-4 bg-amber-600 rounded-sm"></div>
        ]
      case 'cartoon':
        return [
          <Palette key="palette" className="w-4 h-4 text-purple-500" />,
          <div key="smile" className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-orange-400"></div>
        ]
      case 'anime':
        return [
          <div key="anime" className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>,
          <div key="star" className="w-4 h-4 bg-blue-400 rounded-sm transform rotate-45"></div>
        ]
      case 'realistic':
        return [
          <ImageIcon key="image" className="w-4 h-4 text-blue-500" />,
          <div key="lens" className="w-4 h-4 bg-gray-600 rounded-full border-2 border-gray-400"></div>
        ]
      case 'generated':
        return [
          <Wand2 key="wand" className="w-4 h-4 text-orange-500" />,
          <div key="spark" className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
        ]
      default:
        return [
          <div key="default1" className="w-4 h-4 bg-indigo-400 rounded"></div>,
          <div key="default2" className="w-4 h-4 bg-emerald-400 rounded-full"></div>
        ]
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onNodeClick) {
      onNodeClick(data)
    }
  }
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
        selected ? 'border-blue-400 shadow-xl scale-105' : 'border-gray-200 hover:border-gray-300'
      }`}
      style={{ width: nodeWidth, height: nodeHeight + 35 }}
      onClick={handleClick}
    >
      {/* Connection Handles - Much more visible and easier to click */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-6 h-6 border-3 border-blue-500 bg-blue-100 hover:bg-blue-200 shadow-lg transition-all duration-200 hover:scale-110"
        style={{ left: -12 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-6 h-6 border-3 border-blue-500 bg-blue-100 hover:bg-blue-200 shadow-lg transition-all duration-200 hover:scale-110"
        style={{ right: -12 }}
      />
      
      {/* Bottom Connection Handle - Large and prominent */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-8 h-8 border-4 border-emerald-500 bg-emerald-100 hover:bg-emerald-200 shadow-xl rounded-full transition-all duration-200 hover:scale-110"
        style={{ bottom: -16, left: '50%', transform: 'translateX(-50%)' }}
      />
      
      {/* Image Section */}
      <div 
        className="relative rounded-t-lg overflow-hidden bg-gray-100"
        style={{ height: nodeHeight }}
      >
        <Image
          src={data.imageUrl}
          alt={data.title}
          width={nodeWidth}
          height={nodeHeight}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onLoad={() => {
            console.log('Image loaded successfully:', data.imageUrl)
          }}
          onError={(e) => {
            console.error('Image failed to load:', data.imageUrl)
            const target = e.target as HTMLImageElement
            target.style.backgroundColor = '#f3f4f6'
            target.style.display = 'block'
          }}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200"></div>
      </div>
      
      {/* Bottom Section - Colorful icons on the right end */}
      <div className="h-9 px-3 py-2 flex items-center justify-end bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-lg">
        <div className="flex items-center gap-2">
          {getTemplateIcons(data.template)}
        </div>
      </div>
    </div>
  )
}
