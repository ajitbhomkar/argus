// Types for document processing
export interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  status: 'pending' | 'processing' | 'completed' | 'failed'
  datasetId: string
  extractedData?: Record<string, any>
  ocrText?: string
  url?: string
}

export interface Dataset {
  id: string
  name: string
  description: string
  systemPrompt: string
  outputSchema?: Record<string, any>
  createdAt: Date
  documentCount: number
}

export interface ProcessingResult {
  documentId: string
  status: 'success' | 'failed'
  extractedData: Record<string, any>
  confidence: number
  processingTime: number
  error?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  documentId?: string
}

export interface UploadResponse {
  documentId: string
  uploadUrl?: string
  message: string
}
