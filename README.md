# Argus

A modern Next.js application with authentication, database, and beautiful UI.

## Features

- ⚡ Next.js 14+ with App Router
- 🎨 Tailwind CSS for styling
- 🎭 Dark mode support
- 🔐 Authentication with NextAuth.js
- 🗄️ Database with Prisma ORM
- 📱 Fully responsive design
- 🎯 TypeScript for type safety
- 🎪 shadcn/ui components

## Getting Started

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
cp .env.example .env.local
```

Edit `.env.local` and add your database URL and other secrets.

4. Run database migrations (if using Prisma):
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
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
├── app/                  # Next.js App Router pages
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard pages
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── theme-provider.tsx
├── lib/                 # Utility functions
├── prisma/             # Database schema
├── public/             # Static files
└── .github/            # GitHub configuration
```

## Deployment

### Deploy to Vercel

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/argus"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Add other environment variables as needed
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Prisma](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org)

## License

MIT
