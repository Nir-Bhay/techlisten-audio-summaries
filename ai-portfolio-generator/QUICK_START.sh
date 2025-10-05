#!/bin/bash

# AI Portfolio Generator - Quick Start Script
# This script helps you set up and run the application quickly

set -e  # Exit on error

echo "🚀 AI Portfolio Generator - Quick Start"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm found: $(npm --version)"

# Check if MongoDB is running
echo ""
echo "Checking MongoDB..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.version()" --quiet &> /dev/null; then
        echo -e "${GREEN}✓${NC} MongoDB is running"
    else
        echo -e "${YELLOW}⚠${NC}  MongoDB is installed but not running"
        echo "Please start MongoDB with:"
        echo "  macOS: brew services start mongodb-community"
        echo "  Linux: sudo systemctl start mongod"
    fi
else
    echo -e "${YELLOW}⚠${NC}  MongoDB not found locally"
    echo "You can use MongoDB Atlas instead"
fi

# Check for backend .env file
echo ""
echo "Checking environment configuration..."
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠${NC}  Backend .env file not found"
    echo "Creating from .env.example..."
    cp backend/.env.example backend/.env
    echo -e "${YELLOW}⚠${NC}  Please edit backend/.env and add your:"
    echo "  - OPENAI_API_KEY"
    echo "  - MONGODB_URI (if using Atlas)"
    echo "  - JWT_SECRET"
    echo ""
    read -p "Press Enter after updating backend/.env to continue..."
else
    echo -e "${GREEN}✓${NC} Backend .env file found"
fi

# Check for frontend .env.local file
if [ ! -f "frontend/.env.local" ]; then
    echo -e "${YELLOW}⚠${NC}  Frontend .env.local file not found"
    echo "Creating default..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5001" > frontend/.env.local
    echo -e "${GREEN}✓${NC} Created frontend/.env.local"
else
    echo -e "${GREEN}✓${NC} Frontend .env.local file found"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
echo ""

echo "Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${GREEN}✓${NC} Backend dependencies already installed"
fi

cd ..

echo ""
echo "Installing frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${GREEN}✓${NC} Frontend dependencies already installed"
fi

cd ..

# Ask if user wants to start the application
echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "To start the application, you need to run:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""

read -p "Would you like to start the backend now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}Starting backend server...${NC}"
    echo "Opening a new terminal window for the backend..."
    echo ""
    echo -e "${YELLOW}Note:${NC} You'll need to start the frontend in a separate terminal:"
    echo "  cd frontend && npm run dev"
    echo ""
    cd backend
    npm run dev
else
    echo ""
    echo "No problem! Start when you're ready with:"
    echo "  cd backend && npm run dev"
fi
