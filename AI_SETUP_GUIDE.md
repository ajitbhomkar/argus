# 🤖 AI-Powered Extraction Setup Guide

## Overview

Argus now features **real AI-powered document extraction** using OpenAI's GPT-4 models. This replaces the previous mock/pattern-matching approach with intelligent, context-aware data extraction.

## ✨ What's New

### Before (Pattern Matching)
- Basic regex patterns for common fields
- Limited accuracy on complex documents
- No understanding of context
- Worked only on specific formats

### After (AI-Powered)
- **GPT-4o-mini** for text-based PDFs
- **GPT-4 Vision** for images and scanned documents
- Context-aware extraction
- Works with any document format
- Structured JSON output
- Confidence scores and metadata

## 🚀 Quick Start

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy your key (starts with `sk-proj-...`)

### 2. Configure Environment

Create a `.env.local` file in your project root:

```bash
cp .env.local.example .env.local
```

Add your API key:

```env
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

### 3. Test the Setup

```bash
# Start development server
npm run dev

# Open http://localhost:3000/documents/process
# Upload a PDF or image
# Check the extraction results!
```

## 📋 Processing Methods

### Method 1: PDF Text Extraction (GPT-4o-mini)

**Best for**: Invoices, contracts, forms, reports

**How it works**:
1. Extracts text from PDF using `pdf-parse`
2. Sends text to GPT-4o-mini with dataset-specific prompt
3. Returns structured JSON with extracted fields

**Example Response**:
```json
{
  "fileName": "invoice-2024.pdf",
  "fileType": "application/pdf",
  "extractedData": {
    "invoiceNumber": "INV-2024-001",
    "date": "2024-01-15",
    "vendor": "Acme Corp",
    "total": 1250.00,
    "items": [...]
  },
  "metadata": {
    "processingMethod": "AI-powered extraction",
    "model": "gpt-4o-mini-2024-07-18",
    "tokensUsed": 1523,
    "confidence": 0.95
  },
  "processingNote": "✨ Processed with AI (OpenAI GPT-4). Real data extracted from your document!"
}
```

### Method 2: Image OCR (GPT-4 Vision)

**Best for**: Scanned documents, photos of documents, images

**How it works**:
1. Converts image to base64
2. Sends to GPT-4 Vision with extraction instructions
3. Returns structured JSON with OCR + extraction

**Example Response**:
```json
{
  "fileName": "scanned-receipt.jpg",
  "fileType": "image/jpeg",
  "extractedData": {
    "merchant": "Coffee Shop",
    "date": "2024-01-20",
    "total": 12.50,
    "items": [
      { "name": "Latte", "price": 5.50 },
      { "name": "Croissant", "price": 4.00 }
    ]
  },
  "metadata": {
    "processingMethod": "AI Vision OCR",
    "model": "gpt-4o-mini",
    "tokensUsed": 2847,
    "confidence": 0.9
  },
  "processingNote": "✨ Processed with GPT-4 Vision. Real data extracted from your image!"
}
```

### Method 3: Fallback Pattern Matching

**When it's used**: No API key configured or API error

**What you see**:
```json
{
  "processingNote": "⚠️ AI processing unavailable: API key not configured. Using basic pattern matching. Add OPENAI_API_KEY to environment for AI-powered extraction."
}
```

## 🎯 Dataset-Specific Prompts

The system uses custom prompts based on your dataset:

### Invoice Dataset
```
You are an expert at extracting invoice information. Extract:
- Invoice number, date, due date
- Vendor name, address, contact
- Bill-to information
- Line items with descriptions, quantities, prices
- Subtotal, tax, total amounts
- Payment terms and methods
```

### Contract Dataset
```
You are an expert at extracting contract information. Extract:
- Contract title and number
- Parties involved (names, addresses)
- Effective date, expiration date
- Terms and conditions
- Obligations and deliverables
- Payment terms
- Signatures and dates
```

### Default Dataset
```
You are an expert at extracting information from documents. 
Analyze the document and extract all relevant structured data.
```

## 💰 Cost Information

### Pricing
- **GPT-4o-mini**: 
  - Input: $0.150 per 1M tokens
  - Output: $0.600 per 1M tokens
  
- **GPT-4 Vision**:
  - Input: $2.50 per 1M tokens
  - Output: $10.00 per 1M tokens

### Estimated Costs Per Document
- Simple text PDF (1-2 pages): $0.001 - $0.01
- Complex contract (10+ pages): $0.02 - $0.05
- Image OCR: $0.01 - $0.03

### Monitoring Usage
Check the `metadata.tokensUsed` field in responses to track token consumption.

## 🔧 Configuration Options

### Custom Dataset Prompts

When creating datasets via `/documents/datasets`, you can customize the system prompt:

```typescript
const dataset = {
  id: 'custom-dataset',
  name: 'Custom Dataset',
  systemPrompt: 'You are an expert at extracting medical record information...',
  description: 'For medical documents'
}
```

The system prompt will be used by the AI for extraction.

## 🐛 Troubleshooting

### API Key Issues

**Problem**: "AI processing unavailable: API key not configured"

**Solution**:
1. Check `.env.local` file exists
2. Verify `OPENAI_API_KEY` is set correctly
3. Restart development server (`Ctrl+C`, then `npm run dev`)
4. Check for typos in key (should start with `sk-proj-`)

### Rate Limits

**Problem**: "AI processing unavailable: Rate limit exceeded"

**Solution**:
1. You've hit OpenAI's rate limit
2. Wait a few minutes and try again
3. Consider upgrading your OpenAI plan
4. The system will fall back to pattern matching automatically

### Quota Exceeded

**Problem**: "AI processing unavailable: You exceeded your current quota"

**Solution**:
1. Add credits to your OpenAI account
2. Check billing at https://platform.openai.com/account/billing
3. System falls back to basic pattern matching

### Poor Extraction Quality

**Problem**: AI is not extracting data correctly

**Solution**:
1. Check if document is too low quality (try better scan)
2. Customize the dataset system prompt for your use case
3. Ensure document text is clear and readable
4. For images, ensure good lighting and resolution

## 🚀 Deployment to Vercel

### Add Environment Variable

```bash
# Using Vercel CLI
vercel env add OPENAI_API_KEY

# Or via Vercel Dashboard
# 1. Go to your project settings
# 2. Navigate to Environment Variables
# 3. Add OPENAI_API_KEY with your key
# 4. Redeploy
```

### Verify Deployment

```bash
# Push changes to GitHub
git add .
git commit -m "Add AI-powered extraction"
git push origin main

# Vercel will automatically deploy
# Test at your production URL
```

## 📊 Example Workflows

### Workflow 1: Invoice Processing

```bash
1. Upload invoice PDF at /documents/process
2. Select "Invoice Dataset"
3. Click "Upload and Process"
4. Get extracted data:
   - Invoice number
   - Dates
   - Vendor info
   - Line items
   - Total amount
5. Data ready for accounting system integration
```

### Workflow 2: Contract Analysis

```bash
1. Upload contract PDF at /documents/process
2. Select "Contract Dataset"
3. Get extracted data:
   - Parties
   - Dates
   - Terms
   - Obligations
4. Ask questions via chat interface:
   - "What is the termination clause?"
   - "When does this contract expire?"
   - "What are the payment terms?"
```

### Workflow 3: Receipt OCR

```bash
1. Take photo of receipt
2. Upload at /documents/process
3. Select appropriate dataset
4. Get structured data from image:
   - Merchant
   - Items
   - Prices
   - Total
5. Ready for expense tracking
```

## 🎓 Best Practices

1. **Choose the Right Dataset**: Use invoice dataset for invoices, contract for contracts
2. **Quality Documents**: Better quality = better extraction
3. **Custom Prompts**: Tailor system prompts for your specific needs
4. **Monitor Costs**: Check token usage in responses
5. **Fallback Awareness**: System works without API key (basic mode)
6. **Error Handling**: API errors automatically fall back to pattern matching

## 🔮 Future Enhancements

- [ ] Azure Document Intelligence integration (OCR alternative)
- [ ] Batch processing for multiple documents
- [ ] Database persistence for extracted data
- [ ] API endpoint for programmatic access
- [ ] Webhook notifications for completed processing
- [ ] Custom model fine-tuning
- [ ] Multi-language support
- [ ] Confidence score thresholds
- [ ] Human-in-the-loop validation

## 📞 Support

Having issues? Check:
1. [OpenAI API Status](https://status.openai.com/)
2. [OpenAI Documentation](https://platform.openai.com/docs)
3. Project issues on GitHub
4. `.env.local` configuration

## 🎉 Success!

You now have a production-ready AI-powered document extraction system! Upload a document and see the magic happen. ✨
