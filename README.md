# 👁️ Argus - Document Intelligence Platform

A modern AI-powered document processing platform inspired by Azure ARGUS, built with Next.js 14+, TypeScript, and intelligent document understanding capabilities.

## 🚀 Transform Document Processing with AI

Argus revolutionizes how organizations extract, understand, and act on document data. By combining OCR precision with AI reasoning, Argus doesn't just read documents—it understands them.

## Features

### 🔍 Intelligent Document Understanding
- ⚡ **AI-Powered Extraction**: Extract structured data from PDFs, images, forms, and invoices
- 🧠 **Context-Aware Processing**: Understands document context, not just text
- � **Zero-Shot Learning**: Works on new document types without training
- 📄 **Multi-Format Support**: PDFs, images, forms, invoices, contracts, medical records

### 💬 Interactive Document Chat
- **Natural Language Q&A**: Ask questions about your documents
- **Contextual Understanding**: AI-powered responses based on document content
- **Conversation History**: Maintain context across multiple questions
- **Multi-Document Support**: Query across your entire document library

### � Dataset Management
- **Custom Schemas**: Define extraction templates for specific document types
- **Configurable Prompts**: Customize AI behavior for different use cases
- **Pre-Built Templates**: Invoice, contract, and medical record processing
- **Dynamic Configuration**: Runtime settings without redeployment

### 🎨 Modern UI/UX
- ⚡ Next.js 14+ with App Router
- 🎭 Dark mode support
- 📱 Fully responsive design
- 🎪 Beautiful shadcn/ui components
- 🔐 Authentication ready (NextAuth.js)
- 🗄️ Database integration (Prisma ORM)

## Tech Stack

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (optional, for full functionality)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd argus
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. **Add AI API key** (Choose ONE - Groq is recommended for FREE unlimited use):

**Option A: Groq (FREE - Recommended)** ⭐
```env
GROQ_API_KEY=gsk_your-api-key-here
```
- Get FREE key from: https://console.groq.com
- 14,400 requests per day FREE
- Lightning fast inference
- No credit card required

**Option B: OpenAI (Paid)**
```env
OPENAI_API_KEY=sk-proj-your-api-key-here
```
- Get key from: https://platform.openai.com/api-keys
- Best quality but has quotas/costs

**Option C: Azure Document Intelligence (FREE tier: 500 pages/month)**
```env
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT=https://your-name.cognitiveservices.azure.com/
AZURE_DOCUMENT_INTELLIGENCE_KEY=your-key-here
```
- Most accurate for invoices/receipts
- Get from: https://portal.azure.com

See `FREE_AI_APIS.md` for more free options!

**Note**: The application will work without an API key, but will fall back to basic pattern matching instead of AI-powered extraction.

5. (Optional) Set up database for persistence:
```bash
# Edit .env.local and add your database URL
# DATABASE_URL=postgresql://user:password@localhost:5432/argus

npx prisma generate
npx prisma db push
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
argus/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── dashboard/         # Dashboard with analytics
│   ├── documents/         # Document intelligence features
│   │   ├── process/      # Upload and process documents
│   │   ├── chat/         # Chat with documents
│   │   └── datasets/     # Dataset management
│   └── api/               # API routes
│       ├── hello/        # Example endpoint
│       ├── documents/    # Document processing APIs
│       │   ├── upload/   # File upload endpoint
│       │   └── chat/     # Document chat endpoint
│       └── datasets/     # Dataset management API
├── components/
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Dark mode provider
├── lib/
│   ├── utils.ts          # Utility functions
│   ├── types.ts          # TypeScript types
│   └── prisma.ts         # Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## 🤖 AI-Powered Extraction

Argus uses OpenAI's GPT-4 models for intelligent document extraction:

### Capabilities

- **Text Documents (PDFs)**: Uses GPT-4o-mini to extract structured data from text-based PDFs
- **Images & Scanned Documents**: Uses GPT-4 Vision for OCR and data extraction from images
- **Context-Aware**: Understands document structure and relationships between fields
- **Dataset-Specific**: Custom extraction prompts for invoices, contracts, and other document types
- **Fallback Support**: Basic pattern matching when API key is not configured

### Processing Methods

The application automatically selects the best processing method:

1. **AI-Powered** (when `OPENAI_API_KEY` is set):
   - PDF text documents → GPT-4o-mini with extracted text
   - Images (PNG, JPG, etc.) → GPT-4 Vision with image analysis
   - Structured JSON output with confidence scores
   - Token usage and cost tracking

2. **Pattern Matching Fallback** (no API key):
   - Basic regex patterns for common fields
   - Invoice numbers, dates, totals, emails
   - Works without external API but less accurate

### Cost Considerations

- **GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **GPT-4 Vision**: ~$2.50 per 1M input tokens, ~$10 per 1M output tokens
- Average cost per document: $0.01-0.05 depending on size
- See usage data in extraction responses (`metadata.tokensUsed`)

## 🎮 Usage Examples

### Upload and Process Documents

1. Navigate to `/documents/process`
2. Select a dataset (default, invoice, or contract)
3. Upload your document (PDF, PNG, JPG, WebP)
4. View extracted data and OCR results

### Chat with Documents

1. Go to `/documents/chat`
2. Enter a document ID
3. Ask questions about the document
4. Get AI-powered contextual answers

### Manage Datasets

1. Visit `/documents/datasets`
2. View existing extraction configurations
3. Create custom datasets with specific prompts
4. Define output schemas for structured data

## API Reference

### Document Processing

**Upload Document**
```bash
POST /api/documents/upload
Content-Type: multipart/form-data

file: [PDF or image file]
datasetId: "default-dataset"
```

**Chat with Document**
```bash
POST /api/documents/chat
Content-Type: application/json

{
  "documentId": "doc_12345",
  "question": "What is the total amount on this invoice?",
  "conversationHistory": []
}
```

### Dataset Management

**List Datasets**
```bash
GET /api/datasets
```

**Create Dataset**
```bash
POST /api/datasets
Content-Type: application/json

{
  "name": "Medical Records",
  "description": "Healthcare document processing",
  "systemPrompt": "Extract patient info, diagnosis, and treatment...",
  "outputSchema": {
    "patientName": "string",
    "diagnosis": "string",
    "treatment": "array"
  }
}
```

## Project Structure

## Deployment

### Deploy to Vercel

The easiest way to deploy is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ajitbhomkar/argus)

**Quick Steps:**
1. Click the "Deploy with Vercel" button above
2. Sign in with your GitHub account
3. Configure environment variables (optional)
4. Click "Deploy"

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

**Live Demo**: Your app will be deployed at a URL like `https://argus-xxx.vercel.app`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/argus"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Optional: For production AI features
# AZURE_OPENAI_API_KEY="your-key"
# AZURE_OPENAI_ENDPOINT="your-endpoint"
# AZURE_DOCUMENT_INTELLIGENCE_KEY="your-key"
# AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT="your-endpoint"
```

## 🎯 Use Cases

### Invoice Processing
- Extract invoice numbers, dates, vendors, line items
- Calculate totals and tax amounts
- Categorize expenses automatically

### Contract Analysis  
- Identify parties, terms, and effective dates
- Extract key obligations and termination clauses
- Highlight important legal provisions

### Medical Records
- Process patient information and medical history
- Extract diagnoses, treatments, and medications
- Organize clinical data for analysis

## 🔮 Future Enhancements

- [ ] Real Azure Document Intelligence integration
- [ ] Azure OpenAI GPT-4 Vision integration
- [ ] Blob Storage for document management
- [ ] Cosmos DB / PostgreSQL for data persistence
- [ ] Batch document processing
- [ ] Document comparison and analysis
- [ ] Export to multiple formats (JSON, CSV, Excel)
- [ ] Advanced search and filtering
- [ ] Role-based access control
- [ ] Audit logging and compliance features

## Environment Variables

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Prisma](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org)

## License

MIT
