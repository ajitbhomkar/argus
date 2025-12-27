import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import Groq from 'groq-sdk'
import { AzureKeyCredential, DocumentAnalysisClient } from '@azure/ai-form-recognizer'

// Initialize AI clients (priority: Groq > OpenAI > None)
const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

// Use Groq if available, otherwise OpenAI
const aiClient = groq || openai

// Initialize Azure Document Intelligence client (if credentials provided)
const azureClient = process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT && process.env.AZURE_DOCUMENT_INTELLIGENCE_KEY
  ? new DocumentAnalysisClient(
      process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT,
      new AzureKeyCredential(process.env.AZURE_DOCUMENT_INTELLIGENCE_KEY)
    )
  : null

// Extract text from PDF using pdf-parse-fork
async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import to avoid build issues
    // @ts-ignore - no types available
    const pdfParse = (await import('pdf-parse-fork')).default
    const data = await pdfParse(buffer)
    return data.text || ''
  } catch (error) {
    console.error('PDF extraction error:', error)
    return ''
  }
}

// Extract text and data using Azure Document Intelligence
async function extractWithAzure(buffer: Buffer, fileName: string): Promise<any> {
  if (!azureClient) {
    return { success: false, error: 'Azure Document Intelligence not configured' }
  }

  try {
    // Analyze document with prebuilt-document model (general purpose)
    const poller = await azureClient.beginAnalyzeDocument('prebuilt-document', buffer)
    const result = await poller.pollUntilDone()

    // Extract all text content
    let fullText = ''
    if (result.content) {
      fullText = result.content
    }

    // Extract key-value pairs
    const extractedFields: any = {}
    if (result.keyValuePairs) {
      for (const { key, value } of result.keyValuePairs) {
        if (key && value) {
          const keyText = key.content || ''
          const valueText = value.content || ''
          if (keyText && valueText) {
            extractedFields[keyText] = valueText
          }
        }
      }
    }

    // Extract tables
    const tables: any[] = []
    if (result.tables) {
      for (const table of result.tables) {
        const tableData: any = {
          rowCount: table.rowCount,
          columnCount: table.columnCount,
          cells: []
        }
        for (const cell of table.cells) {
          tableData.cells.push({
            content: cell.content,
            rowIndex: cell.rowIndex,
            columnIndex: cell.columnIndex
          })
        }
        tables.push(tableData)
      }
    }

    return {
      success: true,
      text: fullText,
      fields: extractedFields,
      tables: tables,
      confidence: 0.9,
      method: 'Azure Document Intelligence'
    }
  } catch (error: any) {
    console.error('Azure extraction error:', error)
    return {
      success: false,
      error: error.message || 'Azure extraction failed'
    }
  }
}

// Fallback: Use OpenAI to process PDF if text extraction fails
async function extractPdfWithAI(buffer: Buffer, fileName: string): Promise<string> {
  if (!openai) {
    return ''
  }
  
  try {
    // For PDFs that can't be parsed, we could convert to images
    // For now, return empty - this would need pdf-to-image conversion
    console.log('PDF text extraction failed, AI fallback would require image conversion')
    return ''
  } catch (error) {
    console.error('PDF AI extraction error:', error)
    return ''
  }
}

// AI-powered document analysis using Groq or OpenAI
async function analyzeWithAI(text: string, datasetId: string, fileName: string): Promise<any> {
  if (!aiClient) {
    return {
      error: 'No AI API key configured. Add GROQ_API_KEY or OPENAI_API_KEY to environment.',
      usingFallback: true
    }
  }

  try {
    // Get dataset-specific prompt
    const systemPrompts: Record<string, string> = {
      'invoice-dataset': `You are an expert invoice data extractor. Extract ALL relevant information from this invoice including:
- Invoice number
- Date (invoice date, due date if present)
- Vendor/Company name and details
- Customer/Bill to information
- All line items with descriptions, quantities, and amounts
- Subtotal, tax, discounts, and total amount
- Payment terms and methods
- Any other relevant details

Return the data as a well-structured JSON object.`,
      
      'contract-dataset': `You are an expert contract analyst. Extract ALL key information from this contract including:
- Contract parties (all involved entities)
- Effective date and expiration date
- Contract value/payment terms
- Key terms and conditions
- Obligations for each party
- Termination clauses
- Important deadlines
- Governing law and jurisdiction
- Any other critical contract details

Return the data as a well-structured JSON object.`,
      
      'default-dataset': `You are an expert document analyzer. Extract ALL relevant information from this document including:
- Document type and purpose
- Key dates
- Names and entities mentioned
- Important numbers, amounts, or values
- Main topics and subjects
- Any structured data present
- Key points and conclusions

Return the data as a well-structured JSON object.`
    }

    const systemPrompt = systemPrompts[datasetId] || systemPrompts['default-dataset']

    // Determine which model to use
    const model = groq ? "llama-3.3-70b-versatile" : "gpt-4o-mini"
    const provider = groq ? "Groq (FREE)" : "OpenAI"

    // Create completion using the available client
    const completion = groq 
      ? await groq.chat.completions.create({
          model: model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: `Document filename: ${fileName}\n\nDocument content:\n\n${text}`
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1,
        })
      : await openai!.chat.completions.create({
          model: model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: `Document filename: ${fileName}\n\nDocument content:\n\n${text}`
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1,
        })

    const extractedData = JSON.parse(completion.choices[0].message.content || '{}')
    
    return {
      success: true,
      extractedData,
      model: completion.model,
      provider: provider,
      tokensUsed: completion.usage?.total_tokens || 0,
      confidence: 0.95
    }
  } catch (error: any) {
    console.error('OpenAI analysis error:', error)
    return {
      error: error.message,
      usingFallback: true
    }
  }
}

// Basic text analysis to extract invoice-like data
function analyzeText(text: string, datasetId: string) {
  const analysis: any = {
    documentType: 'unknown',
    confidence: 0.5,
  }
  
  const fields: any = {}
  
  // Simple pattern matching for common fields
  const totalPattern = /(?:total|amount|sum|balance|grand total)[\s:$]*(\$?[\d,]+\.?\d*)/i
  const datePattern = /\b(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2})\b/
  const vendorPattern = /(?:from|vendor|company|seller|billed by)[\s:]*([A-Z][A-Za-z\s&.,Inc]+?)(?:\n|$)/i
  const invoicePattern = /invoice\s*(?:number|#|no\.?)[\s:]*([A-Z0-9-]+)/i
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  
  const totalMatch = text.match(totalPattern)
  if (totalMatch) {
    fields.total = totalMatch[1].includes('$') ? totalMatch[1] : `$${totalMatch[1]}`
  }
  
  const dateMatches = text.match(new RegExp(datePattern, 'g'))
  if (dateMatches && dateMatches.length > 0) {
    fields.date = dateMatches[0]
    if (dateMatches.length > 1) {
      fields.additionalDates = dateMatches.slice(1, 3)
    }
  }
  
  const vendorMatch = text.match(vendorPattern)
  if (vendorMatch) {
    fields.vendor = vendorMatch[1].trim()
  }
  
  const invoiceMatch = text.match(invoicePattern)
  if (invoiceMatch) {
    fields.invoiceNumber = invoiceMatch[1]
  }
  
  const emailMatch = text.match(emailPattern)
  if (emailMatch) {
    fields.email = emailMatch[0]
  }
  
  // Determine document type based on dataset and content
  if (datasetId === 'invoice-dataset' || text.toLowerCase().includes('invoice')) {
    analysis.documentType = 'invoice'
    analysis.confidence = 0.8
  } else if (datasetId === 'contract-dataset' || text.toLowerCase().includes('contract') || text.toLowerCase().includes('agreement')) {
    analysis.documentType = 'contract'
    analysis.confidence = 0.75
  }
  
  // Add statistics
  analysis.wordCount = text.split(/\s+/).filter(w => w.length > 0).length
  analysis.charCount = text.length
  analysis.hasNumbers = /\d/.test(text)
  analysis.hasCurrency = /\$|USD|EUR|GBP/.test(text)
  
  return { analysis, fields }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const datasetId = formData.get('datasetId') as string || 'default-dataset'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and images are supported.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Generate document ID
    const documentId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    let extractedText = ''
    let processedData: any = {}
    
    // Process PDF files
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      // Try Azure Document Intelligence first if available
      if (azureClient) {
        const azureResult = await extractWithAzure(buffer, file.name)
        
        if (azureResult.success) {
          // Azure extraction successful - most reliable!
          processedData = {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            processedAt: new Date().toISOString(),
            datasetId: datasetId,
            extractedText: azureResult.text.substring(0, 500) + (azureResult.text.length > 500 ? '...' : ''),
            fullTextLength: azureResult.text.length,
            extractedData: azureResult.fields,
            tables: azureResult.tables,
            metadata: {
              processingMethod: azureResult.method,
              confidence: azureResult.confidence,
            },
            processingNote: '✨ Processed with Azure Document Intelligence. Most accurate OCR and extraction!'
          }
        } else {
          // Azure failed, fall back to basic extraction
          extractedText = await extractPdfText(buffer)
        }
      } else {
        // No Azure, use basic extraction
        extractedText = await extractPdfText(buffer)
      }
      
      // If we still don't have processed data and have extracted text
      if (!processedData.fileName && extractedText) {
        // Use AI for extraction if available
        const aiResult = await analyzeWithAI(extractedText, datasetId, file.name)
        
        if (aiResult.success) {
          // AI extraction successful
          processedData = {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            processedAt: new Date().toISOString(),
            datasetId: datasetId,
            extractedText: extractedText.substring(0, 500) + (extractedText.length > 500 ? '...' : ''),
            fullTextLength: extractedText.length,
            extractedData: aiResult.extractedData,
            metadata: {
              processingMethod: 'AI-powered extraction',
              provider: aiResult.provider || 'AI',
              model: aiResult.model,
              tokensUsed: aiResult.tokensUsed,
              confidence: aiResult.confidence,
            },
            processingNote: `✨ Processed with ${aiResult.provider || 'AI'}! Real data extracted from your document!`
          }
        } else {
          // Fallback to basic pattern matching
          const { analysis, fields } = analyzeText(extractedText, datasetId)
          processedData = {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            processedAt: new Date().toISOString(),
            datasetId: datasetId,
            text: extractedText.substring(0, 1000) + (extractedText.length > 1000 ? '...' : ''),
            fullTextLength: extractedText.length,
            metadata: analysis,
            fields: fields,
            processingNote: aiResult.error 
              ? `⚠️ AI processing unavailable: ${aiResult.error}. Using basic pattern matching.`
              : 'Basic pattern matching used. Add GROQ_API_KEY or OPENAI_API_KEY for AI-powered extraction.'
          }
        }
      } else {
        processedData = {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          processedAt: new Date().toISOString(),
          datasetId: datasetId,
          text: 'Unable to extract text from PDF. This might be a scanned document requiring OCR.',
          metadata: {
            documentType: 'unknown',
            confidence: 0,
          },
          fields: {},
          processingNote: '⚠️ No text extracted. For scanned documents, integrate Azure Document Intelligence OCR or similar service.'
        }
      }
    } else if (file.type.startsWith('image/')) {
      // For images, we can use GPT-4 Vision (Groq doesn't support vision yet)
      if (openai) {
        try {
          const base64Image = Buffer.from(await file.arrayBuffer()).toString('base64')
          const imageUrl = `data:${file.type};base64,${base64Image}`
          
          const systemPrompts: Record<string, string> = {
            'invoice-dataset': 'Extract all invoice information including numbers, dates, items, amounts, vendor details, etc.',
            'contract-dataset': 'Extract all contract information including parties, dates, terms, obligations, etc.',
            'default-dataset': 'Extract all relevant information from this document image.'
          }
          
          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: [
                  { 
                    type: "text", 
                    text: systemPrompts[datasetId] || systemPrompts['default-dataset'] + "\n\nReturn the extracted data as a JSON object."
                  },
                  {
                    type: "image_url",
                    image_url: { url: imageUrl }
                  }
                ]
              }
            ],
            response_format: { type: "json_object" },
            max_tokens: 4096
          })
          
          const extractedData = JSON.parse(completion.choices[0].message.content || '{}')
          
          processedData = {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            processedAt: new Date().toISOString(),
            datasetId: datasetId,
            extractedData: extractedData,
            metadata: {
              processingMethod: 'AI Vision OCR',
              provider: 'OpenAI GPT-4 Vision',
              model: completion.model,
              tokensUsed: completion.usage?.total_tokens || 0,
              confidence: 0.9,
            },
            processingNote: '✨ Processed with OpenAI GPT-4 Vision. Real data extracted from your image!'
          }
        } catch (error: any) {
          processedData = {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            processedAt: new Date().toISOString(),
            datasetId: datasetId,
            text: 'Image processing failed',
            error: error.message,
            processingNote: '⚠️ GPT-4 Vision processing failed. Check your API key and quota.'
          }
        }
      } else {
        processedData = {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          processedAt: new Date().toISOString(),
          datasetId: datasetId,
          text: 'Image processing requires OpenAI API (for GPT-4 Vision) or Azure Document Intelligence.',
          processingNote: groq 
            ? '⚠️ Groq does not support vision yet. For images, add OPENAI_API_KEY or use Azure Document Intelligence.'
            : '⚠️ Add OPENAI_API_KEY for AI-powered image OCR with GPT-4 Vision, or use Azure Document Intelligence.'
        }
      }
    } else {
      processedData = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        processedAt: new Date().toISOString(),
        datasetId: datasetId,
        error: 'Unsupported file type',
        processingNote: 'Only PDF and image files are currently supported.'
      }
    }

    return NextResponse.json({
      success: true,
      documentId: documentId,
      message: 'Document processed successfully',
      data: processedData,
      status: 'completed'
    }, { status: 200 })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to process upload', details: String(error) },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve document status
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const documentId = searchParams.get('id')

  if (!documentId) {
    return NextResponse.json(
      { error: 'Document ID required' },
      { status: 400 }
    )
  }

  // In production, fetch from database
  const mockDocument = {
    id: documentId,
    name: 'sample-document.pdf',
    status: 'completed',
    uploadedAt: new Date().toISOString(),
    extractedData: {
      text: 'Sample extracted content',
      fields: {
        total: '$1,234.56',
        date: '2024-12-26',
      }
    }
  }

  return NextResponse.json(mockDocument)
}
