# JM DATA TALENT - Deployment Guide

## Vercel Deployment Instructions

### Prerequisites
- Vercel account (https://vercel.com)
- MongoDB Atlas account (for production database)

### Step 1: Prepare Backend for Deployment
The backend can be deployed separately on platforms like:
- **Railway** (recommended for FastAPI)
- **Render**
- **Fly.io**

#### Deploy Backend to Railway:
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `/backend`
5. Add environment variables:
   ```
   MONGO_URL=your_mongodb_atlas_connection_string
   DB_NAME=jm_data_talent_prod
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```
6. Railway will auto-detect FastAPI and deploy
7. Note your backend URL (e.g., `https://your-app.up.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Via Vercel Dashboard**:
   - Go to https://vercel.com/new
   - Import your Git repository
   - Set root directory: `/frontend`
   - Set build command: `yarn build`
   - Set output directory: `build`
   - Add environment variable:
     ```
     REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
     ```
   - Click "Deploy"

3. **Via Vercel CLI**:
   ```bash
   cd /app/frontend
   vercel
   # Follow prompts
   # Set environment variable when prompted:
   # REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
   ```

### Step 3: Update CORS in Backend
After deploying frontend, update backend CORS_ORIGINS environment variable:
```
CORS_ORIGINS=https://your-frontend.vercel.app
```

### Step 4: Set Up MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Create a new cluster (free tier available)
3. Create database user and whitelist IP (0.0.0.0/0 for all)
4. Get connection string and update backend MONGO_URL

## Environment Variables Summary

### Backend (.env)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net
DB_NAME=jm_data_talent_prod
CORS_ORIGINS=https://your-frontend.vercel.app
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-backend.railway.app
```

## Testing Deployment
1. Visit your Vercel URL
2. Test all interactions:
   - Book Demo form
   - View Jobs modal
   - Job application form
   - All navigation links
3. Check browser console for errors
4. Verify API calls in Network tab

## Custom Domain (Optional)
1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (e.g., jmdatatalent.ie)
3. Update DNS records as instructed
4. Update backend CORS_ORIGINS with new domain

## Troubleshooting
- **API calls failing**: Check REACT_APP_BACKEND_URL is correct
- **CORS errors**: Verify CORS_ORIGINS in backend includes frontend domain
- **Database errors**: Check MongoDB Atlas whitelist and connection string
- **Build errors**: Check all dependencies in package.json

## Support
For deployment issues:
- Vercel docs: https://vercel.com/docs
- Railway docs: https://docs.railway.app
- MongoDB Atlas docs: https://docs.atlas.mongodb.com
