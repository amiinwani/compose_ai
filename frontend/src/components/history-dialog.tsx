"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Generation {
  id: string
  title: string
  date: string
  template: string
  imageCount: number
  status: string
}

interface HistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  generations: Generation[]
}

export function HistoryDialog({ open, onOpenChange, generations }: HistoryDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredGenerations = generations.filter(gen =>
    gen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gen.template.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Generation History</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col gap-4">
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {filteredGenerations.map((generation) => (
                <a
                  href={`/${generation.id}`}
                  key={generation.id}
                  className="block hover:bg-gray-50 p-3 rounded-lg border cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{generation.title}</span>
                    <span className="text-xs text-gray-500">{generation.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>Template: {generation.template}</span>
                    <span>•</span>
                    <span>{generation.imageCount} images</span>
                  </div>
                  <span className={`inline-block text-xs px-2 py-1 rounded mt-2 ${
                    generation.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {generation.status}
                  </span>
                </a>
              ))}
              
              {filteredGenerations.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No generations found
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
