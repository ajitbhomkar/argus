import { NextRequest, NextResponse } from 'next/server'

// Dataset management endpoints
export async function GET(request: NextRequest) {
  // In production, fetch from database
  const mockDatasets = [
    {
      id: 'default-dataset',
      name: 'Default Dataset',
      description: 'General purpose document processing',
      systemPrompt: 'Extract all relevant information from the document including dates, amounts, parties involved, and key terms.',
      outputSchema: {
        documentType: 'string',
        date: 'string',
        total: 'string',
        vendor: 'string',
        items: 'array'
      },
      createdAt: new Date('2024-01-01').toISOString(),
      documentCount: 42
    },
    {
      id: 'invoice-dataset',
      name: 'Invoice Processing',
      description: 'Specialized invoice and receipt processing',
      systemPrompt: 'Extract invoice number, date, vendor details, line items, subtotal, tax, and total amount. Categorize each line item.',
      outputSchema: {
        invoiceNumber: 'string',
        date: 'string',
        vendor: 'object',
        lineItems: 'array',
        subtotal: 'number',
        tax: 'number',
        total: 'number'
      },
      createdAt: new Date('2024-02-15').toISOString(),
      documentCount: 128
    },
    {
      id: 'contract-dataset',
      name: 'Contract Analysis',
      description: 'Legal document and contract processing',
      systemPrompt: 'Extract parties involved, contract terms, effective dates, termination clauses, payment terms, and key obligations.',
      outputSchema: {
        parties: 'array',
        effectiveDate: 'string',
        expirationDate: 'string',
        terms: 'array',
        obligations: 'array'
      },
      createdAt: new Date('2024-03-10').toISOString(),
      documentCount: 67
    }
  ]

  return NextResponse.json({
    success: true,
    datasets: mockDatasets,
    total: mockDatasets.length
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, systemPrompt, outputSchema } = body

    if (!name || !systemPrompt) {
      return NextResponse.json(
        { error: 'Name and system prompt are required' },
        { status: 400 }
      )
    }

    // In production, save to database
    const newDataset = {
      id: `dataset_${Date.now()}`,
      name,
      description: description || '',
      systemPrompt,
      outputSchema: outputSchema || {},
      createdAt: new Date().toISOString(),
      documentCount: 0
    }

    return NextResponse.json({
      success: true,
      message: 'Dataset created successfully',
      dataset: newDataset
    }, { status: 201 })

  } catch (error) {
    console.error('Dataset creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create dataset' },
      { status: 500 }
    )
  }
}
