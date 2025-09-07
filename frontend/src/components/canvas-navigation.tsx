"use client"

import React from 'react'
import { Command, History, User, Smartphone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { HistoryDialog } from "./history-dialog"
import { NavUser } from "./nav-user"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'

const sampleGenerations = [
  {
    id: "gen-1",
    title: "Minecraft Castle Scene",
    date: "2 hours ago",
    template: "Minecraft",
    imageCount: 3,
    status: "completed",
  },
  {
    id: "gen-2", 
    title: "Cartoon Character Art",
    date: "Yesterday",
    template: "Cartoon", 
    imageCount: 1,
    status: "completed",
  },
  {
    id: "gen-3",
    title: "Custom Landscape",
    date: "2 days ago", 
    template: "Custom",
    imageCount: 5,
    status: "completed",
  },
]

const userData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function CanvasNavigation() {
  const [showHistory, setShowHistory] = React.useState(false)

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center justify-between border-r bg-white py-4">
        {/* Logo */}
        <Link href="/generate" className="mb-4">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
            <div className="bg-blue-600 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
              <Command className="size-4" />
            </div>
          </Button>
        </Link>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0"
            onClick={() => setShowHistory(true)}
          >
            <History className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0"
            onClick={() => console.log('Device button clicked - placeholder')}
          >
            <Smartphone className="size-5" />
          </Button>
        </div>

        {/* User Profile */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full">
              <div className="bg-gray-200 flex aspect-square size-8 items-center justify-center rounded-full">
                <User className="size-4" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <NavUser user={userData} />
          </DialogContent>
        </Dialog>
      </div>

      {/* History Dialog */}
      <HistoryDialog
        open={showHistory}
        onOpenChange={setShowHistory}
        generations={sampleGenerations}
      />
    </>
  )
}
