"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Image as ImageIcon, Palette, Wand2 } from 'lucide-react'
import Image from 'next/image'
import { ImageNodeData } from "./canvas-image-node"

interface NodeDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nodeData: ImageNodeData | null
}

export function NodeDetailsDialog({ open, onOpenChange, nodeData }: NodeDetailsDialogProps) {
  if (!nodeData) return null

  const handleDownload = () => {
    // Create a download link for the image
    const link = document.createElement('a')
    link.href = nodeData.imageUrl
    link.download = `${nodeData.title}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getTemplateIcon = (template: string) => {
    switch (template.toLowerCase()) {
      case 'minecraft':
        return <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">M</div>
      case 'cartoon':
        return <Palette className="w-6 h-6 text-purple-500" />
      case 'anime':
        return <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
      case 'realistic':
        return <ImageIcon className="w-6 h-6 text-blue-500" />
      case 'generated':
        return <Wand2 className="w-6 h-6 text-orange-500" />
      default:
        return <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs">?</div>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTemplateIcon(nodeData.template)}
            {nodeData.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Image Preview */}
          <div className="relative rounded-lg overflow-hidden border">
            <Image
              src={nodeData.imageUrl}
              alt={nodeData.title}
              width={400}
              height={256}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Metadata */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Template:</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                {getTemplateIcon(nodeData.template)}
                {nodeData.template}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Dimensions:</span>
              <span className="text-sm text-gray-600">{nodeData.width} x {nodeData.height}</span>
            </div>

            {/* Show prompt if it's a custom or generated image */}
            {(nodeData.template === 'Generated' || nodeData.template === 'Custom') && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Prompt:</span>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {nodeData.template === 'Generated' 
                      ? "Generated from connected nodes with custom instructions"
                      : "Custom prompt description would appear here"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="flex-1">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Similar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
