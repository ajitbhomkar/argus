# Deployment Guide for Argus

This guide will help you deploy the Argus application to Vercel.

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier available at https://vercel.com)

## Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign in with your GitHub account

2. **Import Project**: 
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `ajitbhomkar/argus`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

4. **Environment Variables** (Optional - for database and auth):
   ```
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your_generated_secret
   ```
   
   To generate NEXTAUTH_SECRET, run:
   ```bash
   openssl rand -base64 32
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (usually 2-3 minutes)
   - Your app will be live at: `https://argus-[random-string].vercel.app`

6. **Custom Domain** (Optional):
   - Go to Project Settings → Domains
   - Add your custom domain

### Option 2: Deploy via Vercel CLI

1. **Login to Vercel**:
   ```bash
   npx vercel login
   ```

2. **Deploy**:
   ```bash
   npx vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - Project name? argus
   - Directory? ./
   - Override settings? No

3. **Deploy to Production**:
   ```bash
   npx vercel --prod
   ```

## Post-Deployment Setup

### 1. Database Setup (if using Prisma)

If you're using a PostgreSQL database:

1. **Create a database** on a hosting service:
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - [Supabase](https://supabase.com/)
   - [Railway](https://railway.app/)
   - [Neon](https://neon.tech/)

2. **Add DATABASE_URL** to Vercel environment variables:
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` with your connection string

3. **Run migrations**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### 2. Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
# Required for production
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_secret_here

# Optional - Database
DATABASE_URL=postgresql://...

# Optional - Add any other API keys or secrets
```

### 3. Redeploy

After adding environment variables:
- Go to Deployments
- Click the three dots menu on the latest deployment
- Select "Redeploy"

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Monitoring and Analytics

1. **View Deployments**: https://vercel.com/dashboard
2. **Check Logs**: Project → Deployments → Click on a deployment → Logs
3. **Analytics**: Project → Analytics (shows visitor stats, performance)
4. **Speed Insights**: Enable in Project Settings → Speed Insights

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Ensure all dependencies are in package.json
4. Check Node version compatibility

### Environment Variables Not Working

1. Make sure to redeploy after adding variables
2. Check variable names match exactly (case-sensitive)
3. Don't use quotes around values in Vercel dashboard

### Database Connection Issues

1. Verify DATABASE_URL is correct
2. Check if database allows connections from Vercel IPs
3. Ensure Prisma schema is up to date

## Quick Deploy Button

Add this to your README.md for one-click deployment:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ajitbhomkar/argus)
```

## Useful Commands

```bash
# View deployment URL
npx vercel ls

# Check deployment status
npx vercel inspect [deployment-url]

# Pull environment variables locally
npx vercel env pull

# View logs
npx vercel logs [deployment-url]
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

**Your Argus application is now live! 🚀**

Repository: https://github.com/ajitbhomkar/argus
