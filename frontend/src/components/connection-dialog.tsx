"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Edit, Wand2 } from 'lucide-react'

interface ConnectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: (instructions: string) => void
  onEditManually: () => void
}

export function ConnectionDialog({ 
  open, 
  onOpenChange, 
  onGenerate, 
  onEditManually 
}: ConnectionDialogProps) {
  const [instructions, setInstructions] = React.useState('')

  const handleGenerate = () => {
    onGenerate(instructions)
    setInstructions('')
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed right-0 top-0 z-50 w-96 h-full bg-white border-l shadow-xl flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Generate Connected Image</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditManually}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-6">
          Describe how the connected images should be combined or what should be generated from them.
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="instructions" className="text-base font-medium">
              Generation Instructions
            </Label>
            <Textarea
              id="instructions"
              placeholder="Describe how these images should be connected or what you want to generate from them..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-32 resize-none"
              rows={6}
            />
          </div>

          {/* Quick prompt suggestions */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-600">Quick Suggestions:</Label>
            <div className="space-y-2">
              {[
                "Combine both images into a single scene",
                "Create a character that fits both art styles", 
                "Generate a bridge connecting these environments",
                "Merge the color palettes of both images"
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline" 
                  size="sm"
                  className="w-full justify-start text-left text-xs h-auto py-2 px-3"
                  onClick={() => setInstructions(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t">
        <Button 
          onClick={handleGenerate}
          disabled={!instructions.trim()}
          className="w-full h-12 text-lg"
          size="lg"
        >
          <Wand2 className="w-5 h-5 mr-2" />
          Generate Image
        </Button>
      </div>
    </div>
  )
}
