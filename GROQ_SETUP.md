# 🚀 Groq Setup - 2 Minutes to FREE AI!

## Why Groq?
- ✅ **Completely FREE** (no credit card needed)
- ✅ **14,400 requests per day** (way more than you need)
- ✅ **Lightning fast** (fastest AI inference)
- ✅ **Works perfectly** with Argus

---

## Step 1: Get Your FREE Groq API Key

1. **Visit Groq Console**:
   - Go to: **https://console.groq.com**
   - Click "Sign Up" (top right)

2. **Create Account**:
   - Sign up with Google/GitHub (quickest)
   - OR use email (will need to verify)
   - **No credit card required!** 🎉

3. **Get API Key**:
   - After login, you'll see the dashboard
   - Click "API Keys" in left sidebar
   - Click "Create API Key"
   - Give it a name (e.g., "Argus")
   - Click "Submit"
   - **Copy your key** (starts with `gsk_...`)

---

## Step 2: Add Key to Argus

Open your `.env.local` file and add:

```bash
GROQ_API_KEY=gsk_your-actual-key-here
```

**Example:**
```bash
# Replace this with your actual key from Groq
GROQ_API_KEY=gsk_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

---

## Step 3: Restart & Test

```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev

# Open http://localhost:3000/documents/process
# Upload a PDF
# See real AI extraction! ✨
```

---

## What You'll See

### Before (without API key):
```json
{
  "fields": {
    "total": "$1",
    "date": "16-11-2025"
  },
  "processingNote": "⚠️ Basic pattern matching used..."
}
```

### After (with Groq):
```json
{
  "extractedData": {
    "billNumber": "PH/TNS/26CS32617",
    "billDate": "16-11-2025",
    "patientName": "Rupali Bhomkar",
    "items": [
      {
        "name": "INJ HUMOG HP[BHARATH] 75 I.U",
        "quantity": 2,
        "amount": 3046.79
      }
    ],
    "grossTotal": 2958.84,
    "taxAmount": 147.95,
    "invoiceValue": 3106.79
  },
  "metadata": {
    "provider": "Groq (FREE)",
    "model": "llama-3.3-70b-versatile",
    "confidence": 0.95
  },
  "processingNote": "✨ Processed with Groq (FREE)! Real data extracted from your document!"
}
```

---

## Rate Limits (FREE Tier)

- **30 requests per minute**
- **14,400 requests per day**
- **That's ~432,000 per month!**

Unless you're processing hundreds of documents per day, you'll NEVER hit the limit! 🚀

---

## Troubleshooting

### Issue: "API key not configured"
**Solution**: Make sure `.env.local` has the key and restart the server

### Issue: "Rate limit exceeded"
**Solution**: Wait 1 minute (you hit 30 req/min limit) - very rare!

### Issue: Key not working
**Solution**: 
1. Check you copied the full key (starts with `gsk_`)
2. No extra spaces before/after the key
3. Key is on its own line in `.env.local`

---

## FAQ

### Q: Does Groq cost anything?
**A:** No! Completely FREE forever with generous limits.

### Q: Is Groq as accurate as OpenAI?
**A:** Very close! It uses Llama 3.3 70B which is excellent for document extraction.

### Q: Can I use both Groq and OpenAI?
**A:** Yes! Argus will prefer Groq if both keys are present (since it's free).

### Q: What if I exceed the free limit?
**A:** You can create multiple accounts or upgrade (still very cheap).

---

## Next Steps

Once you have Groq working:

1. ✅ **Test with your PDFs** - See the amazing extraction!
2. 📊 **Try different datasets** - Invoice, Contract, Default
3. 💬 **Use the Chat feature** - Ask questions about your documents
4. 🚀 **Deploy to Vercel** - Add `GROQ_API_KEY` as environment variable

---

## Support

- Groq Docs: https://console.groq.com/docs
- Groq Discord: Join for help and updates
- Argus Issues: Report on GitHub

---

## 🎉 That's It!

You now have **FREE unlimited AI-powered document extraction**!

**Total cost: $0**
**Total time: 2 minutes**
**Total documents you can process: ~432,000 per month**

Enjoy! 🚀
