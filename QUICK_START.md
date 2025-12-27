# 🚀 Quick Start - AI-Powered Extraction

## ⚡ 3 Steps to Real AI Extraction

### 1️⃣ Get API Key
Visit: https://platform.openai.com/api-keys
Create a new secret key (starts with `sk-proj-...`)

### 2️⃣ Configure
```bash
# Create environment file
cp .env.local.example .env.local

# Add your key
echo "OPENAI_API_KEY=sk-proj-your-key-here" > .env.local
```

### 3️⃣ Test
```bash
npm run dev
# Open http://localhost:3000/documents/process
# Upload a PDF or image
# See real AI extraction! ✨
```

---

## 📊 What You'll Get

### ✅ With API Key (AI-Powered)
- Real data extracted from your documents
- Context-aware understanding
- Works with any format (PDF, images, scans)
- Structured JSON output
- Confidence scores

**Example Output:**
```json
{
  "extractedData": {
    "invoiceNumber": "INV-2024-001",
    "date": "2024-01-15",
    "vendor": "Acme Corp",
    "total": 1250.00
  },
  "metadata": {
    "processingMethod": "AI-powered extraction",
    "model": "gpt-4o-mini",
    "confidence": 0.95
  },
  "processingNote": "✨ Processed with AI (OpenAI GPT-4). Real data extracted!"
}
```

### ⚠️ Without API Key (Fallback)
- Basic pattern matching
- Limited to common fields
- Less accurate
- Message: "Add OPENAI_API_KEY for AI-powered extraction"

---

## 💰 Cost Estimate

- Simple invoice/receipt: **$0.001 - $0.01** per document
- Complex contract: **$0.02 - $0.05** per document
- Image OCR: **$0.01 - $0.03** per image

Most documents cost **less than 1 cent** to process!

---

## 🎯 Supported Formats

### PDFs
- Invoices ✅
- Contracts ✅
- Forms ✅
- Reports ✅
- Any text-based PDF ✅

### Images
- Scanned documents ✅
- Photos of receipts ✅
- Screenshots ✅
- PNG, JPG, JPEG, WEBP ✅

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not configured" | Add `OPENAI_API_KEY` to `.env.local` |
| "Rate limit exceeded" | Wait a few minutes, system uses fallback |
| "Quota exceeded" | Add credits at platform.openai.com/account/billing |
| Poor quality extraction | Use better quality scans/images |

---

## 📚 More Info

- Full setup guide: `AI_SETUP_GUIDE.md`
- Features documentation: `ARGUS_FEATURES.md`
- API reference: `README.md`

---

## 🎉 That's It!

You now have **real AI-powered document extraction**! 

No more dummy data - just intelligent, accurate extraction from any document format.

**Next Steps:**
1. Add your API key
2. Upload a test document
3. See the magic happen ✨

For production deployment, add the API key to Vercel environment variables!
