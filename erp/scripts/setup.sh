#!/bin/bash

set -e

echo "🚀 Setting up Candid Carnival ERP..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You can still run the project locally."
else
    echo "✅ Docker is installed: $(docker -v)"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env files if they don't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file. Please update it with your configuration."
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "📝 Created backend/.env file. Please update it with your configuration."
fi

if [ ! -f frontend/.env.local ]; then
    cp frontend/.env.example frontend/.env.local
    echo "📝 Created frontend/.env.local file. Please update it with your configuration."
fi

# Initialize database
echo "🗄️  Initializing database..."
cd backend
npm run db:init
npm run db:migrate
npm run db:seed
cd ..

echo ""
echo "✨ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Update .env files with your configuration"
echo "2. Run 'npm run dev' to start development servers"
echo "3. Or run 'npm run docker:up' to start with Docker"
echo ""
echo "🎯 Frontend will be available at: http://localhost:3000"
echo "🔌 API will be available at: http://localhost:4000"
echo ""