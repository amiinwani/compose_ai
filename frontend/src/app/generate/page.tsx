"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Upload, Plus, Minus, Image, PenTool } from "lucide-react"

const templates = [
  { id: "minecraft", name: "Minecraft", description: "Blocky, pixelated style" },
  { id: "cartoon", name: "Cartoon", description: "Animated, colorful style" },
  { id: "anime", name: "Anime", description: "Japanese animation style" },
  { id: "realistic", name: "Realistic", description: "Photo-realistic style" },
  { id: "abstract", name: "Abstract", description: "Abstract artistic style" },
]

export default function Page() {
  const [imageCount, setImageCount] = React.useState(1)
  const [selectedTemplates, setSelectedTemplates] = React.useState<Record<number, string>>({})
  const [customPrompts, setCustomPrompts] = React.useState<Record<number, string>>({})

  const incrementImages = () => {
    if (imageCount < 10) {
      setImageCount(imageCount + 1)
    }
  }

  const decrementImages = () => {
    if (imageCount > 1) {
      setImageCount(imageCount - 1)
      // Remove template selections for removed images
      const newSelectedTemplates = { ...selectedTemplates }
      const newCustomPrompts = { ...customPrompts }
      delete newSelectedTemplates[imageCount]
      delete newCustomPrompts[imageCount]
      setSelectedTemplates(newSelectedTemplates)
      setCustomPrompts(newCustomPrompts)
    }
  }

  const selectTemplate = (imageIndex: number, templateId: string) => {
    setSelectedTemplates({ ...selectedTemplates, [imageIndex]: templateId })
    if (templateId !== 'custom') {
      const newCustomPrompts = { ...customPrompts }
      delete newCustomPrompts[imageIndex]
      setCustomPrompts(newCustomPrompts)
    }
  }

  const updateCustomPrompt = (imageIndex: number, prompt: string) => {
    setCustomPrompts({ ...customPrompts, [imageIndex]: prompt })
  }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Generate</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-8 p-8 w-full max-w-none">
          {/* Upload Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="h-32 w-64 border-dashed border-2 flex flex-col gap-2 hover:bg-muted/50"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <div className="font-medium">Upload Images</div>
                <div className="text-sm text-muted-foreground">
                  Click to select or drag & drop
                </div>
              </div>
            </Button>
          </div>

          {/* Number of Images Control */}
          <div className="flex items-center justify-center gap-4">
            <Label className="text-lg font-medium">Number of images:</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementImages}
                disabled={imageCount <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-bold w-8 text-center">{imageCount}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={incrementImages}
                disabled={imageCount >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Template Selection for Each Image */}
          <div className="space-y-8">
            {Array.from({ length: imageCount }, (_, index) => (
              <div key={index} className="space-y-4">
                <div className="mx-[15%] flex flex-col gap-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <Image className="h-5 w-5" aria-label="Image icon" />
                    Image {index + 1} Template
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {templates.map((template) => {
                    const backgroundImages = {
                      minecraft: "https://www.minecraft.net/content/dam/minecraftnet/franchise/component-library/redeemheroa/Redeem-Hero_Mobile_576x324.png",
                      cartoon: "https://static0.moviewebimages.com/wordpress/wp-content/uploads/2024/05/35-all-time-best-cartoon-characters-ever-created-ranked.jpg",
                      anime: "https://sm.ign.com/ign_ap/feature/t/the-top-25/the-top-25-greatest-anime-characters-of-all-time_ge1p.jpg",
                      realistic: "https://images.stockcake.com/public/0/5/e/05edba27-2ba8-4d40-b42c-8908c8b2758b_large/child-s-pencil-portrait-stockcake.jpg",
                      abstract: "https://i.insider.com/518946e46bb3f7f94b00000d?width=850&format=jpeg"
                    };
                    
                    return (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-md relative overflow-hidden h-28 ${
                          selectedTemplates[index + 1] === template.id
                            ? 'ring-2 ring-blue-400 bg-blue-50 shadow-lg scale-105'
                            : 'hover:scale-102'
                        }`}
                        onClick={() => selectTemplate(index + 1, template.id)}
                        style={{
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${backgroundImages[template.id as keyof typeof backgroundImages]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <CardHeader className="pb-3 relative z-10 text-white h-full flex flex-col justify-center">
                          <CardTitle className="text-base text-white font-bold drop-shadow-lg">{template.name}</CardTitle>
                          <CardDescription className="text-sm text-gray-200 drop-shadow-md">
                            {template.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    );
                  })}
                  
                  {/* Custom Prompt Option */}
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md relative overflow-hidden h-28 flex flex-col justify-center items-center ${
                      selectedTemplates[index + 1] === 'custom'
                        ? 'bg-blue-100 border-2 border-blue-400'
                        : 'bg-gradient-to-br from-purple-50 to-indigo-100 border border-gray-200'
                    }`}
                    onClick={() => selectTemplate(index + 1, 'custom')}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <PenTool className={`h-8 w-8 mb-2 ${
                        selectedTemplates[index + 1] === 'custom' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                      <CardTitle className={`text-base font-bold text-center ${
                        selectedTemplates[index + 1] === 'custom' ? 'text-blue-800' : 'text-gray-800'
                      }`}>Custom Prompt</CardTitle>
                      <CardDescription className={`text-sm text-center ${
                        selectedTemplates[index + 1] === 'custom' ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        Write your own description
                      </CardDescription>
                    </div>
                  </Card>
                  </div>
                </div>

                {/* Custom Prompt Input */}
                {selectedTemplates[index + 1] === 'custom' && (
                  <div className="mt-4 mx-[15%]">
                    <Label htmlFor={`custom-prompt-${index}`} className="text-sm font-medium">
                      Custom Prompt for Image {index + 1}
                    </Label>
                    <Input
                      id={`custom-prompt-${index}`}
                      placeholder="Describe what you want to generate..."
                      value={customPrompts[index + 1] || ''}
                      onChange={(e) => updateCustomPrompt(index + 1, e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Generate Canvas Button */}
          <div className="flex justify-center pt-4">
            <Button size="lg" className="px-12 py-3 text-lg">
              Generate Canvas
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
