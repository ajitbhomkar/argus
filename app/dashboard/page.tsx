import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Database, Upload, TrendingUp, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  // Mock stats - in production, fetch from database
  const stats = [
    { label: "Total Documents", value: "237", icon: FileText, change: "+12% this month" },
    { label: "Documents Processed", value: "189", icon: CheckCircle, change: "80% success rate" },
    { label: "Active Datasets", value: "3", icon: Database, change: "2 new this week" },
    { label: "Chat Sessions", value: "42", icon: MessageSquare, change: "+8 this week" },
  ]

  const quickActions = [
    {
      title: "Process Documents",
      description: "Upload and process new documents with AI",
      icon: Upload,
      href: "/documents/process",
      color: "text-blue-500"
    },
    {
      title: "Chat with Documents",
      description: "Ask questions about your documents",
      icon: MessageSquare,
      href: "/documents/chat",
      color: "text-green-500"
    },
    {
      title: "Manage Datasets",
      description: "Configure extraction schemas",
      icon: Database,
      href: "/documents/datasets",
      color: "text-purple-500"
    },
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">📊 Dashboard</h1>
          <p className="text-muted-foreground">
            Document Intelligence Platform - AI-powered document processing and analysis
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <action.icon className={`h-12 w-12 mb-2 ${action.color}`} />
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={action.href}>Open</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest document processing and interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Document processed", file: "invoice-2024-001.pdf", time: "2 minutes ago", dataset: "Invoice Processing" },
                { action: "Chat session started", file: "contract-abc.pdf", time: "15 minutes ago", dataset: "Contract Analysis" },
                { action: "Document uploaded", file: "receipt-scan.jpg", time: "1 hour ago", dataset: "Default Dataset" },
                { action: "Dataset created", file: "medical-dataset", time: "2 hours ago", dataset: "Medical Records" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.file}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.dataset}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
