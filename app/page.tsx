import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Eye, FileText, MessageSquare, Database, Zap, Brain } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Eye className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            👁️ <span className="text-primary">ARGUS</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            The All-Seeing Document Intelligence Platform
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform document processing with AI-powered extraction, understanding, and analysis
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">🌟 Key Capabilities</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Enterprise-grade document intelligence powered by AI
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-10 w-10 mb-2 text-blue-500" />
              <CardTitle>Intelligent Document Processing</CardTitle>
              <CardDescription>
                AI-powered OCR and data extraction from PDFs, images, forms, and invoices with context-aware understanding
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="h-10 w-10 mb-2 text-green-500" />
              <CardTitle>Interactive Document Chat</CardTitle>
              <CardDescription>
                Ask questions about your documents using natural language and get intelligent, contextual answers
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Database className="h-10 w-10 mb-2 text-purple-500" />
              <CardTitle>Custom Datasets</CardTitle>
              <CardDescription>
                Configure specialized extraction schemas for invoices, contracts, medical records, and more
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-10 w-10 mb-2 text-orange-500" />
              <CardTitle>Real-Time Processing</CardTitle>
              <CardDescription>
                Cloud-native architecture with API-driven workflows for immediate document processing results
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="h-10 w-10 mb-2 text-pink-500" />
              <CardTitle>AI-Powered Extraction</CardTitle>
              <CardDescription>
                Combines OCR precision with LLM reasoning for superior document understanding
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Eye className="h-10 w-10 mb-2 text-cyan-500" />
              <CardTitle>Zero-Shot Learning</CardTitle>
              <CardDescription>
                Works on new document types without training, adapting to your specific needs
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-20 bg-accent/50">
        <h2 className="text-3xl font-bold text-center mb-12">Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center space-y-2">
            <div className="text-4xl mb-2">📄</div>
            <h3 className="font-bold">Invoice Processing</h3>
            <p className="text-sm text-muted-foreground">
              Automatically extract amounts, dates, vendors, and line items from invoices
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="font-bold">Contract Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Extract key terms, parties, dates, and obligations from legal documents
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl mb-2">🏥</div>
            <h3 className="font-bold">Medical Records</h3>
            <p className="text-sm text-muted-foreground">
              Process patient information, diagnoses, and treatment plans from medical documents
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to Transform Your Document Processing?</h2>
            <p className="text-lg opacity-90">
              Start extracting intelligence from your documents today
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/documents/process">Process Documents</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
