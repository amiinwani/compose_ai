"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

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

  if (!open) return null

  return (
    <div className="fixed left-16 top-0 z-50 w-80 h-full bg-white border-r shadow-lg flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Generation History</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Input
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
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
  )
}
