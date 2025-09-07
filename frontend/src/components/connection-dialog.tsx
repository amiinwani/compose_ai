"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit } from 'lucide-react'

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Generate Connected Image</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditManually}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instructions">Add Instructions</Label>
            <Input
              id="instructions"
              placeholder="Describe how these images should be connected..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleGenerate}
              disabled={!instructions.trim()}
            >
              Generate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
