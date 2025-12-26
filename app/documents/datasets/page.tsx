"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Database, FileText, Calendar } from "lucide-react"

interface Dataset {
  id: string
  name: string
  description: string
  systemPrompt: string
  outputSchema?: Record<string, any>
  createdAt: string
  documentCount: number
}

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newDataset, setNewDataset] = useState({
    name: '',
    description: '',
    systemPrompt: '',
    outputSchema: '{}'
  })

  useEffect(() => {
    fetchDatasets()
  }, [])

  const fetchDatasets = async () => {
    try {
      const response = await fetch('/api/datasets')
      const result = await response.json()
      if (result.success) {
        setDatasets(result.datasets)
      }
    } catch (error) {
      console.error('Failed to fetch datasets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateDataset = async () => {
    try {
      const response = await fetch('/api/datasets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newDataset,
          outputSchema: newDataset.outputSchema ? JSON.parse(newDataset.outputSchema) : {}
        })
      })

      const result = await response.json()
      if (result.success) {
        setDatasets(prev => [...prev, result.dataset])
        setShowCreateForm(false)
        setNewDataset({ name: '', description: '', systemPrompt: '', outputSchema: '{}' })
      }
    } catch (error) {
      console.error('Failed to create dataset:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">🗂️ Datasets</h1>
            <p className="text-muted-foreground">
              Manage document processing configurations and extraction schemas
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="mr-2 h-4 w-4" />
            New Dataset
          </Button>
        </div>

        {/* Create Dataset Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Dataset</CardTitle>
              <CardDescription>
                Define how documents should be processed and what data to extract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Dataset Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-background"
                  placeholder="e.g., Medical Records Dataset"
                  value={newDataset.name}
                  onChange={(e) => setNewDataset({ ...newDataset, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-background"
                  placeholder="Brief description of this dataset"
                  value={newDataset.description}
                  onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">System Prompt</label>
                <textarea
                  className="w-full p-3 border rounded-lg bg-background"
                  rows={4}
                  placeholder="Instructions for AI on how to extract data from documents..."
                  value={newDataset.systemPrompt}
                  onChange={(e) => setNewDataset({ ...newDataset, systemPrompt: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Output Schema (JSON)</label>
                <textarea
                  className="w-full p-3 border rounded-lg bg-background font-mono text-sm"
                  rows={6}
                  placeholder='{"field1": "string", "field2": "number"}'
                  value={newDataset.outputSchema}
                  onChange={(e) => setNewDataset({ ...newDataset, outputSchema: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateDataset}>Create Dataset</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Datasets List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading datasets...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <Card key={dataset.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Database className="w-10 h-10 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">
                      {dataset.documentCount} docs
                    </span>
                  </div>
                  <CardTitle>{dataset.name}</CardTitle>
                  <CardDescription>{dataset.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium mb-1">System Prompt:</p>
                    <p className="text-muted-foreground line-clamp-3">
                      {dataset.systemPrompt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Created {new Date(dataset.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
