import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, Database, Moon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Welcome to <span className="text-primary">Argus</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            A modern Next.js application with authentication, database, and beautiful UI
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
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Secure authentication with NextAuth.js
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Database className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Database</CardTitle>
              <CardDescription>
                Prisma ORM with PostgreSQL support
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Fast Performance</CardTitle>
              <CardDescription>
                Built on Next.js 14 with App Router
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Moon className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Dark Mode</CardTitle>
              <CardDescription>
                Beautiful UI with dark mode support
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to get started?</h2>
            <p className="text-lg opacity-90">
              Join thousands of users already using Argus
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard">Start Now</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
