# 🚀 Setup Guide - Candid Carnival ERP

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **PostgreSQL**: v12 or higher
- **Redis**: (optional, for caching)
- **Docker & Docker Compose**: (optional, for containerized setup)

## Installation Methods

### Method 1: Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/vipk62712-cloud/AI-robo.git
cd AI-robo/erp

# 2. Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# 3. Start development servers
npm run dev
```

### Method 2: Docker Setup (Recommended for Production)

```bash
# 1. Navigate to project directory
cd erp

# 2. Create .env file
cp .env.example .env

# 3. Update environment variables in .env

# 4. Start all services
npm run docker:up

# 5. Access the application
# Frontend: http://localhost:3000
# API: http://localhost:4000
```

### Method 3: Manual Setup

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database and API keys

# Initialize database
npm run db:init
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

#### Frontend Setup (in another terminal)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update .env.local with API URL

# Start development server
npm run dev
```

## Environment Variables

See `.env.example` in the root directory for all available variables.

### Critical Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/candid_carnival

# JWT
JWT_SECRET=your_super_secret_key

# Payment Gateways
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET_KEY=your_secret
STRIPE_SECRET_KEY=your_stripe_key

# File Storage
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key

# Notifications
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
```

## Database Setup

### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE candid_carnival;

# Exit
\q
```

### Run Migrations

```bash
cd backend
npm run db:migrate
```

### Seed Initial Data

```bash
npm run db:seed
```

## Verification

Once setup is complete:

1. **Frontend**: Visit http://localhost:3000
   - You should see the landing page
   - Login with seeded credentials: `admin@example.com` / `password123`

2. **API**: Visit http://localhost:4000/api/v1/health
   - Should return: `{"status": "ok"}`

3. **Database**: Check tables created
   ```bash
   psql -U postgres -d candid_carnival -c "\dt"
   ```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000 (Backend)
lsof -ti:4000 | xargs kill -9

# Kill process on port 5432 (Database)
lsof -ti:5432 | xargs kill -9
```

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Check credentials in .env
# Verify DATABASE_URL format: postgresql://user:password@host:port/database
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues

```bash
# Stop all containers
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# Rebuild containers
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

## Next Steps

1. Read [API Documentation](./API.md)
2. Review [Database Schema](./DATABASE.md)
3. Check [Deployment Guide](./DEPLOYMENT.md)
4. Explore [User Roles & Permissions](./USER_ROLES.md)

---

**Need help?** Create an issue or contact support@candidcarnival.com