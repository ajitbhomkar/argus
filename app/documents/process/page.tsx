"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, CheckCircle, XCircle, Clock } from "lucide-react"

export default function ProcessDocumentsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedDataset, setSelectedDataset] = useState("default-dataset")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)

  const datasets = [
    { id: "default-dataset", name: "Default Dataset" },
    { id: "invoice-dataset", name: "Invoice Processing" },
    { id: "contract-dataset", name: "Contract Analysis" },
  ]

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setUploadResult(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadResult(null)

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('datasetId', selectedDataset)

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      setUploadResult(result)
    } catch (error) {
      setUploadResult({
        success: false,
        error: 'Failed to upload document'
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">📄 Process Documents</h1>
        <p className="text-muted-foreground mb-8">
          Upload documents for AI-powered extraction and analysis
        </p>

        <div className="grid gap-6">
          {/* Dataset Selection */}
          <Card>
            <CardHeader>
              <CardTitle>1. Select Dataset</CardTitle>
              <CardDescription>
                Choose the processing configuration for your document type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <select
                className="w-full p-3 border rounded-lg bg-background"
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
              >
                {datasets.map((dataset) => (
                  <option key={dataset.id} value={dataset.id}>
                    {dataset.name}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>2. Upload Document</CardTitle>
              <CardDescription>
                Supported formats: PDF, JPEG, PNG, WebP (max 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, PNG, JPG, or WebP
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    onChange={handleFileSelect}
                  />
                </label>

                {selectedFile && (
                  <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
                    <File className="w-8 h-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upload Button */}
          <Button
            size="lg"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Clock className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload and Process
              </>
            )}
          </Button>

          {/* Results */}
          {uploadResult && (
            <Card className={uploadResult.success ? "border-green-500" : "border-red-500"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {uploadResult.success ? (
                    <>
                      <CheckCircle className="text-green-500" />
                      Processing Started
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-500" />
                      Upload Failed
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadResult.success ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Document ID: <code className="bg-accent px-2 py-1 rounded">{uploadResult.documentId}</code>
                    </p>
                    <p>{uploadResult.message}</p>
                    {uploadResult.data && (
                      <div className="mt-4 p-4 bg-accent rounded-lg">
                        <p className="font-semibold mb-2">Extracted Data Preview:</p>
                        <pre className="text-xs overflow-auto">
                          {JSON.stringify(uploadResult.data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-red-500">{uploadResult.error}</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
