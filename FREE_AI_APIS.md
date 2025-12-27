# 🆓 Free AI APIs for Document Processing

## Overview

Here are the best **FREE** AI API alternatives to OpenAI for document processing. These services offer generous free tiers or completely unlimited access.

---

## 🚀 Recommended: Groq (BEST FREE OPTION)

### Why Groq?
- ✅ **Completely FREE** (no credit card required)
- ✅ **Lightning fast** (fastest inference speeds)
- ✅ **Generous limits**: 30 requests/minute, 14,400/day
- ✅ **Compatible with OpenAI API** (drop-in replacement)
- ✅ Models: Llama 3.1, Mixtral, Gemma

### Setup Steps:

1. **Get API Key**:
   - Visit: https://console.groq.com
   - Sign up (free, no credit card)
   - Go to API Keys section
   - Create new key

2. **Configure Argus**:
   ```bash
   # Add to .env.local
   GROQ_API_KEY=gsk_your-key-here
   ```

3. **Rate Limits** (FREE):
   - 30 requests per minute
   - 14,400 requests per day
   - More than enough for personal/small business use!

### Supported Models:
- `llama-3.3-70b-versatile` (Best for document analysis)
- `llama-3.1-8b-instant` (Fastest)
- `mixtral-8x7b-32768` (Long context)

**Cost**: $0 Forever! 🎉

---

## 🤗 Hugging Face Inference API

### Why Hugging Face?
- ✅ **FREE** tier available
- ✅ **1,000+ models** to choose from
- ✅ **Open source** models
- ✅ Great for specialized tasks

### Setup Steps:

1. **Get Token**:
   - Visit: https://huggingface.co/settings/tokens
   - Create account (free)
   - Generate access token

2. **Configure**:
   ```bash
   # Add to .env.local
   HUGGINGFACE_API_KEY=hf_your-key-here
   ```

3. **Rate Limits** (FREE):
   - 30,000 requests per month
   - ~1,000 requests per day
   - Throttled to 1 req/sec

### Best Models for Documents:
- `microsoft/layoutlm-document-qa`
- `naver-clova-ix/donut-base`
- `impira/layoutlm-document-qa`

**Cost**: Free tier, then ~$0.006 per 1K tokens

---

## 🤖 Together AI

### Why Together?
- ✅ **$25 FREE credits** on signup
- ✅ Open source models
- ✅ Fast inference
- ✅ Good for production

### Setup Steps:

1. **Get API Key**:
   - Visit: https://api.together.xyz
   - Sign up for free credits
   - Get API key from dashboard

2. **Configure**:
   ```bash
   # Add to .env.local
   TOGETHER_API_KEY=your-key-here
   ```

3. **Free Credits**:
   - $25 on signup
   - Processes ~50,000 documents
   - After credits: ~$0.20 per 1M tokens

### Recommended Models:
- `mistralai/Mixtral-8x7B-Instruct-v0.1`
- `meta-llama/Llama-3-70b-chat-hf`

**Cost**: $25 free, then very cheap

---

## 🔷 Azure Document Intelligence

### Why Azure?
- ✅ **500 pages FREE** per month
- ✅ **Most accurate** OCR available
- ✅ **Prebuilt models** for invoices, receipts, IDs
- ✅ Works on scanned/image PDFs

### Setup Steps:

1. **Create Azure Account**:
   - Visit: https://portal.azure.com
   - Sign up (requires credit card but won't charge for free tier)
   - Get $200 free credits

2. **Create Resource**:
   ```
   - Search "Document Intelligence"
   - Create new resource
   - Select Free F0 tier
   - Copy endpoint and key
   ```

3. **Configure**:
   ```bash
   # Add to .env.local
   AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=https://your-name.cognitiveservices.azure.com/
   AZURE_DOCUMENT_INTELLIGENCE_KEY=your-key-here
   ```

4. **Free Tier**:
   - 500 pages per month
   - All features included
   - No credit card charges

**Cost**: 500 pages/month FREE, then $1.50 per 1,000 pages

---

## 🆓 Ollama (100% Local & FREE)

### Why Ollama?
- ✅ **Completely FREE forever**
- ✅ **No API limits**
- ✅ **Privacy** (runs on your machine)
- ✅ **No internet required**

### Setup Steps:

1. **Install Ollama**:
   ```bash
   # macOS
   brew install ollama
   
   # Or download from: https://ollama.ai
   ```

2. **Download Model**:
   ```bash
   ollama pull llama3.1:8b
   ```

3. **Run Ollama Server**:
   ```bash
   ollama serve
   ```

4. **Configure Argus**:
   ```bash
   # Add to .env.local
   OLLAMA_URL=http://localhost:11434
   ```

### Pros:
- Unlimited usage
- Complete privacy
- No API costs

### Cons:
- Requires decent hardware (8GB+ RAM)
- Slower than cloud APIs
- Need to download models

**Cost**: $0 (but uses your computer)

---

## 📊 Comparison Table

| Service | Free Tier | Speed | Accuracy | Best For |
|---------|-----------|-------|----------|----------|
| **Groq** 🏆 | 14,400/day | ⚡⚡⚡ Fast | ⭐⭐⭐⭐ Good | General docs |
| **Azure DI** | 500 pages/mo | ⚡⚡ Medium | ⭐⭐⭐⭐⭐ Best | Invoices, receipts |
| **HuggingFace** | 30,000/mo | ⚡ Slow | ⭐⭐⭐ OK | Experimentation |
| **Together** | $25 credits | ⚡⚡ Fast | ⭐⭐⭐⭐ Good | Production |
| **Ollama** | Unlimited | ⚡ Variable | ⭐⭐⭐ OK | Privacy, offline |
| **OpenAI** | None | ⚡⚡ Fast | ⭐⭐⭐⭐⭐ Best | Best quality |

---

## 💡 Recommendations by Use Case

### 🏠 Personal Use / Testing
**Use Groq** - Free, fast, no limits for your needs
```bash
GROQ_API_KEY=gsk_your-key-here
```

### 💼 Small Business (< 500 docs/month)
**Use Azure Document Intelligence** - Most accurate
```bash
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=...
AZURE_DOCUMENT_INTELLIGENCE_KEY=...
```

### 🚀 Startup / Growing Business
**Use Together AI** - $25 free, then cheap
```bash
TOGETHER_API_KEY=your-key-here
```

### 🔒 Privacy-Critical / Offline
**Use Ollama** - 100% local, unlimited
```bash
OLLAMA_URL=http://localhost:11434
```

### 💰 Production / High Volume
**Use OpenAI** - Best quality, predictable pricing
```bash
OPENAI_API_KEY=sk-proj-...
```

---

## 🛠️ How to Switch APIs in Argus

Currently, Argus supports:
1. ✅ **OpenAI** (configured)
2. ✅ **Azure Document Intelligence** (just added!)
3. 🔄 **Groq** (coming soon - easy to add)
4. 🔄 **Others** (can be integrated)

### To Add Groq Support:

Groq is OpenAI-compatible, so minimal code changes needed:

```typescript
// In app/api/documents/upload/route.ts
const aiClient = process.env.GROQ_API_KEY
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1'
    })
  : process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null
```

---

## 🎯 Quick Setup Guide

### For Groq (Recommended):

```bash
# 1. Get key from https://console.groq.com
# 2. Add to .env.local
echo "GROQ_API_KEY=gsk_your-key-here" >> .env.local

# 3. Restart server
npm run dev
```

### For Azure (Most Accurate):

```bash
# 1. Create resource at https://portal.azure.com
# 2. Copy endpoint and key
# 3. Add to .env.local
echo "AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=https://..." >> .env.local
echo "AZURE_DOCUMENT_INTELLIGENCE_KEY=..." >> .env.local

# 4. Restart server
npm run dev
```

---

## 📞 Support Resources

- **Groq**: https://console.groq.com/docs
- **Azure DI**: https://learn.microsoft.com/azure/ai-services/document-intelligence/
- **HuggingFace**: https://huggingface.co/docs/api-inference
- **Together**: https://docs.together.ai
- **Ollama**: https://github.com/ollama/ollama

---

## 🎉 Bottom Line

**For Argus users wanting FREE unlimited processing:**

1. **Start with Groq** (FREE, fast, 14K requests/day)
2. **Add Azure** for complex documents (500 pages/month FREE)
3. **Upgrade to OpenAI** only if you need absolute best quality

**Cost per 1,000 documents:**
- Groq: **$0** 
- Azure: **$0-3** (depending on volume)
- OpenAI: **$10-50** (depending on complexity)

Choose based on your needs! 🚀
