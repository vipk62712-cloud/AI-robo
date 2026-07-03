#!/bin/bash

set -e

echo "🗄️  Initializing Candid Carnival Database..."

DATABASE_URL=${DATABASE_URL:-"postgresql://postgres:postgres@localhost:5432/candid_carnival"}

# Install PostgreSQL client if not present
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL client is not installed. Please install it."
    exit 1
fi

# Run migrations
echo "🔄 Running database migrations..."
cd backend
npm run db:migrate
cd ..

# Seed database
echo "🌱 Seeding database..."
cd backend
npm run db:seed
cd ..

echo "✅ Database initialization complete!"