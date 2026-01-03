"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Zap, 
  Download, 
  Palette, 
  Sparkles, 
  ArrowRight, 
  Play,
  Image as ImageIcon,
  Wand2,
  Layers,
  Clock,
  CheckCircle
} from "lucide-react";

// Template data extracted for better maintainability
const TEMPLATES = [
  { 
    id: "minecraft", 
    name: "Minecraft", 
    description: "Blocky, pixelated style",
    image: "https://www.minecraft.net/content/dam/minecraftnet/franchise/component-library/redeemheroa/Redeem-Hero_Mobile_576x324.png"
  },
  { 
    id: "cartoon", 
    name: "Cartoon", 
    description: "Animated, colorful style",
    image: "https://static0.moviewebimages.com/wordpress/wp-content/uploads/2024/05/35-all-time-best-cartoon-characters-ever-created-ranked.jpg"
  },
  { 
    id: "anime", 
    name: "Anime", 
    description: "Japanese animation style",
    image: "https://sm.ign.com/ign_ap/feature/t/the-top-25/the-top-25-greatest-anime-characters-of-all-time_ge1p.jpg"
  },
  { 
    id: "realistic", 
    name: "Realistic", 
    description: "Photo-realistic style",
    image: "https://images.stockcake.com/public/0/5/e/05edba27-2ba8-4d40-b42c-8908c8b2758b_large/child-s-pencil-portrait-stockcake.jpg"
  },
  { 
    id: "abstract", 
    name: "Abstract", 
    description: "Abstract artistic style",
    image: "https://i.insider.com/518946e46bb3f7f94b00000d?width=850&format=jpeg"
  }
] as const;

const WORKFLOW_STEPS = [
  { step: "1", title: "Upload", desc: "Images to GCP", icon: Upload },
  { step: "2", title: "Choose Style", desc: "Select template", icon: Palette },
  { step: "3", title: "AI Generate", desc: "Prompt processing", icon: Sparkles },
  { step: "4", title: "Canvas Edit", desc: "Node interface", icon: Wand2 },
  { step: "5", title: "Export", desc: "Download ready", icon: Download }
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header>
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="navigation" aria-label="Main navigation">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" aria-hidden="true">
                <Wand2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Compose AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">Demo</a>
              <Link href="/generate" className="text-sm font-medium hover:text-primary transition-colors">Generate</Link>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/generate">Try Demo</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="container mx-auto px-4 py-20 text-center" aria-labelledby="hero-heading">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              🚀 Hackathon Innovation
            </Badge>
            <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Compose, Edit & Export
              <br />
              <span className="text-primary">Social Media Posts</span>
              <br />
              in Seconds
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform the tedious process of social media content creation into a magical, 
              instant experience through live image editing, intelligent prompt-based generation, 
              and seamless workflow automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/generate">
                  <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                  Start Creating
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                <a href="#demo">See How It Works</a>
              </Button>
            </div>
          </div>
        </section>

      {/* Problem Statement */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Content Creation Struggle</h2>
            <p className="text-lg text-muted-foreground">
              Current social media content creation is fragmented, time-consuming, and requires multiple tools
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Time-Consuming</h3>
                <p className="text-sm text-muted-foreground">
                  Hours spent switching between design tools, editing software, and platforms
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Palette className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Design Skills Barrier</h3>
                <p className="text-sm text-muted-foreground">
                  Complex interfaces and steep learning curves prevent quick content creation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Layers className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Inconsistent Branding</h3>
                <p className="text-sm text-muted-foreground">
                  Manual formatting leads to inconsistent visual identity across platforms
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Demo */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Compose AI Solution</h2>
            <p className="text-lg text-muted-foreground">
              Revolutionary node-based editing with AI-powered generation and live preview
            </p>
          </div>
          
          {/* Template Gallery */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Choose Your Style</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {TEMPLATES.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 relative overflow-hidden h-32 group"
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${template.name} template - ${template.description}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      // Handle template selection
                    }
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={template.image}
                      alt={`${template.name} style template showing ${template.description}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
                  </div>
                  <CardContent className="p-4 h-full flex flex-col justify-center text-white relative z-10">
                    <h4 className="font-bold text-sm drop-shadow-lg">{template.name}</h4>
                    <p className="text-xs text-gray-200 drop-shadow-md mt-1">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Interactive Demo Area */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Upload & Generate
                  </CardTitle>
                  <CardDescription>
                    Drag and drop images or use AI prompts to create content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    role="button"
                    tabIndex={0}
                    aria-label="Upload images by clicking or dragging and dropping files"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        // Handle file upload
                      }
                    }}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
                    <div className="text-center">
                      <div className="font-medium">Upload Images</div>
                      <div className="text-sm text-muted-foreground">
                        Click to select or drag & drop
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-sm font-medium">Number of images:</span>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        aria-label="Decrease number of images"
                        disabled
                      >
                        -
                      </Button>
                      <span className="text-sm font-bold w-6 text-center" aria-live="polite">1</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        aria-label="Increase number of images"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    placeholder="Describe your social media post... (e.g., 'Modern tech startup announcement with blue gradient background')"
                    className="min-h-[100px]"
                    aria-label="Describe your social media post"
                  />
                  <Button className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                    Generate Canvas
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wand2 className="w-5 h-5 mr-2" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>
                    Real-time editing with instant visual feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
                    <div className="bg-white/20 rounded-lg p-4 mb-4">
                      <h3 className="font-bold text-lg">Your Brand</h3>
                      <p className="text-sm opacity-90">Revolutionary AI-powered content creation</p>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">#AI</Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white">#Innovation</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Technical Innovation</h2>
            <p className="text-lg text-muted-foreground">
              Cutting-edge AI and workflow automation for instant content creation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Live Image Editing
                </CardTitle>
                <CardDescription>
                  Real-time binding and manipulation of images on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Instant visual feedback
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Node-based connections
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Multi-image combining
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  AI Generation
                </CardTitle>
                <CardDescription>
                  Prompt-to-creation pipeline with intelligent content generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Multiple style templates (Minecraft, Cartoon, Anime, Realistic, Abstract)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom prompt input system
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Multi-image generation (up to 10 images)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Background removal & processing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2 text-primary" />
                  Multi-Format Export
                </CardTitle>
                <CardDescription>
                  Export optimized content for different social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Platform-specific sizing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Template library
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Batch processing
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workflow Visualization */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              From upload to export in 5 simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {WORKFLOW_STEPS.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  {index < 4 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground mx-auto mt-4 hidden md:block" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Content Creation?</h2>
            <p className="text-lg mb-8 opacity-90">
              Experience the magic of AI-powered social media content creation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/generate">Try the Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/generate">Export Your First Post</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" aria-hidden="true">
                <Wand2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Compose AI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built with ❤️ for the hackathon innovation showcase
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}