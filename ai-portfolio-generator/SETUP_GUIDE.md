# AI Portfolio Generator - Complete Setup Guide

This guide will walk you through setting up the AI Portfolio Generator from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **MongoDB**: v6.0 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git**: For version control
- **OpenAI API Key**: Sign up at [OpenAI Platform](https://platform.openai.com/)

## Step-by-Step Setup

### 1. MongoDB Setup

#### Option A: Local MongoDB
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0

# Linux
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# Windows
# Download and install from https://www.mongodb.com/try/download/community
# MongoDB will run as a service automatically
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free tier available)
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 2. Clone and Install

```bash
# Navigate to your projects directory
cd /workspace/ai-portfolio-generator

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Variables

#### Backend (.env)
Create `/workspace/ai-portfolio-generator/backend/.env`:

```env
# Server
PORT=5001
NODE_ENV=development

# Database
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/ai-portfolio
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-portfolio

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# AWS (Optional - for S3 hosting)
# AWS_ACCESS_KEY_ID=your-aws-access-key
# AWS_SECRET_ACCESS_KEY=your-aws-secret-key
# AWS_REGION=us-east-1
# AWS_S3_BUCKET=ai-portfolio-hosting

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
Already created at `/workspace/ai-portfolio-generator/frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 4. OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (it starts with `sk-`)
6. Paste it in your backend `.env` file as `OPENAI_API_KEY`

**Important**: Make sure you have credits in your OpenAI account. New accounts usually get free credits.

### 5. Verify Installation

```bash
# Check Node.js version
node --version  # Should be v18.0.0 or higher

# Check npm version
npm --version   # Should be v9.0.0 or higher

# Check MongoDB status
# Local:
mongosh         # Should connect successfully

# Atlas:
# Connection string should work in your .env
```

## Running the Application

### Option 1: Terminal Multiplexer (Recommended)

Using separate terminal windows:

**Terminal 1 - Backend**:
```bash
cd /workspace/ai-portfolio-generator/backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd /workspace/ai-portfolio-generator/frontend
npm run dev
```

**Terminal 3 - MongoDB** (if using local):
```bash
# MongoDB should already be running
# Check with: brew services list (macOS) or systemctl status mongod (Linux)
```

### Option 2: Using tmux

```bash
# Start tmux
tmux

# Split window horizontally
Ctrl+B then "

# Split window vertically
Ctrl+B then %

# Navigate between panes
Ctrl+B then arrow keys

# Run backend in one pane
cd /workspace/ai-portfolio-generator/backend && npm run dev

# Run frontend in another pane
cd /workspace/ai-portfolio-generator/frontend && npm run dev
```

## Verification Checklist

### Backend Health Check
```bash
curl http://localhost:5001/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "AI Portfolio Generator API is running"
}
```

### Frontend Access
Open browser to: http://localhost:3000

You should see the landing page with:
- Hero section "Generate Your Portfolio in Chat"
- Features cards
- Footer

### Database Connection
Check backend console for:
```
✅ MongoDB Connected: localhost:27017 (or your Atlas cluster)
```

### API Endpoints Test

**Test Chat Endpoint**:
```bash
curl -X POST http://localhost:5001/api/chat/respond \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello",
    "messages": []
  }'
```

**Test Templates Endpoint**:
```bash
curl http://localhost:5001/api/templates
```

## Common Issues & Solutions

### Issue 1: MongoDB Connection Failed
**Error**: `MongoServerError: connect ECONNREFUSED`

**Solutions**:
```bash
# Check if MongoDB is running
brew services list | grep mongodb     # macOS
sudo systemctl status mongod          # Linux
net start MongoDB                     # Windows

# Start MongoDB if not running
brew services start mongodb-community # macOS
sudo systemctl start mongod           # Linux
net start MongoDB                     # Windows
```

### Issue 2: Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3000`

**Solutions**:
```bash
# Find and kill process using the port
# macOS/Linux:
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue 3: OpenAI API Key Invalid
**Error**: `401 Unauthorized` or `Invalid API key`

**Solutions**:
- Verify key is correct (starts with `sk-`)
- Check for extra spaces in `.env` file
- Ensure you have credits in OpenAI account
- Try generating a new API key

### Issue 4: Module Not Found
**Error**: `Cannot find module 'xyz'`

**Solutions**:
```bash
# Delete node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install

cd ../backend
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: TypeScript Errors
**Error**: Type errors during build

**Solutions**:
```bash
# Check TypeScript version
npm list typescript

# Reinstall dependencies
npm install --save-dev typescript@5.3.3

# Clean Next.js cache
rm -rf .next
npm run build
```

### Issue 6: CORS Errors
**Error**: `Access-Control-Allow-Origin` error

**Solutions**:
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `backend/src/server.ts`
- Clear browser cache and cookies

## Development Workflow

### Making Changes

1. **Frontend Changes**:
   - Edit files in `frontend/src/`
   - Hot reload will update automatically
   - Check browser console for errors

2. **Backend Changes**:
   - Edit files in `backend/src/`
   - Nodemon will restart server automatically
   - Check terminal for errors

3. **Database Changes**:
   - Update models in `backend/src/models/`
   - Data will be migrated automatically

### Testing Features

1. **Test Chat Flow**:
   - Go to http://localhost:3000/chat
   - Send messages
   - Check responses

2. **Test Templates**:
   - Go to http://localhost:3000/templates
   - Browse templates
   - Select one

3. **Test Builder**:
   - Go to http://localhost:3000/builder
   - Test split view
   - Check live preview

4. **Test Publishing**:
   - Go to http://localhost:3000/settings
   - Fill in details
   - Click publish

## Production Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy --prod
```

### Backend (Railway/Heroku)
```bash
cd backend
npm run build
# Follow platform-specific deployment guide
```

### Environment Variables
Remember to set all production environment variables:
- `MONGODB_URI` (use MongoDB Atlas)
- `OPENAI_API_KEY`
- `JWT_SECRET` (generate new secure key)
- `FRONTEND_URL` (your production domain)

## Database Management

### View Data
```bash
# Connect to MongoDB
mongosh

# Switch to database
use ai-portfolio

# View collections
show collections

# View users
db.users.find()

# View portfolios
db.portfolios.find()

# View chat sessions
db.chatsessions.find()
```

### Backup Database
```bash
# Export database
mongodump --db ai-portfolio --out ./backup

# Restore database
mongorestore --db ai-portfolio ./backup/ai-portfolio
```

## Performance Optimization

### Frontend
```bash
# Analyze bundle size
cd frontend
npm run build
# Check .next/analyze output
```

### Backend
```bash
# Add MongoDB indexes
mongosh
use ai-portfolio
db.users.createIndex({ email: 1 })
db.portfolios.createIndex({ userId: 1 })
```

## Getting Help

- **Documentation**: Check README.md and ARCHITECTURE.md
- **Issues**: Create issue on GitHub
- **Email**: [your-email@example.com]
- **Discord**: [your-discord-server]

## Next Steps

Once everything is running:

1. ✅ Create your first portfolio through chat
2. ✅ Try different templates
3. ✅ Test the builder with live preview
4. ✅ Publish and view your portfolio
5. ✅ Check the analytics dashboard

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Need help?** Don't hesitate to reach out!

**Last Updated**: 2025-10-05
