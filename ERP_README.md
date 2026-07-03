# 🎬 Candid Carnival Event Management & Photo Studio ERP

## 📌 Project Overview

A comprehensive, enterprise-grade Event Management & Photo Studio ERP system designed to automate the complete workflow of a professional photography and videography business. Built with modern technologies and premium UI/UX patterns.

### 🎯 Core Capabilities

- **CRM Management**: Lead tracking, follow-ups, customer profiles
- **Booking System**: Event scheduling, package management, confirmations
- **Payment Processing**: Invoices, GST, multiple payment gateways (Razorpay, Stripe, UPI)
- **Shoot Management**: Schedule coordination, team allocation, GPS tracking
- **Equipment Inventory**: QR/Barcode tracking, maintenance logs, damage reports
- **Production Workflow**: Photo/Video editing pipeline with Kanban board
- **Employee Management**: Attendance, KPI tracking, performance metrics
- **Financial Analytics**: P&L, tax reports, revenue forecasting
- **Notifications**: WhatsApp, Email, SMS, Push alerts
- **AI Features**: Smart scheduling, revenue prediction, customer insights

---

## 🏗️ Project Structure

```
candid-carnival-erp/
│
├── frontend/                          # Next.js + TypeScript Frontend
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── crm/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── equipment/
│   │   ├── shoots/
│   │   ├── team/
│   │   ├── production/
│   │   ├── accounts/
│   │   ├── reports/
│   │   └── auth/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── forms/
│   │   └── dashboard/
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── utils.ts
│   ├── styles/
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                           # Node.js + Express Backend
│   ├── src/
│   │   ├── server.ts
│   │   ├── database/
│   │   │   ├── connection.ts
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── crm.ts
│   │   │   ├── bookings.ts
│   │   │   ├── payments.ts
│   │   │   ├── equipment.ts
│   │   │   ├── shoots.ts
│   │   │   ├── team.ts
│   │   │   ├── production.ts
│   │   │   ├── accounts.ts
│   │   │   ├── reports.ts
│   │   │   └── notifications.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── types/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── database/                          # Database Schema
│   ├── schema.sql
│   ├── migrations/
│   ├── seeds/
│   └── relationships.sql
│
├── docs/                              # Documentation
│   ├── API.md
│   ├── DATABASE.md
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   └── USER_ROLES.md
│
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
├── .github/
│   └── workflows/
│       ├── frontend-ci.yml
│       └── backend-ci.yml
│
├── scripts/
│   ├── setup.sh
│   ├── db-init.sh
│   └── seed-data.sh
│
└── .env.example
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion, GSAP, Three.js
- **State Management**: Zustand / Context API
- **Charts**: Recharts, Chart.js
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios / Fetch API

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js with TypeScript
- **Authentication**: JWT, OAuth 2.0, Google Login
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod, Joi
- **Email**: Nodemailer
- **SMS/WhatsApp**: Twilio
- **Payments**: Razorpay SDK, Stripe SDK
- **File Storage**: Cloudinary / AWS S3
- **Caching**: Redis
- **Task Queue**: Bull / Agenda
- **Logging**: Winston

### Database
- **Primary**: PostgreSQL
- **Cache**: Redis
- **Search**: PostgreSQL Full-Text Search

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Railway / AWS EC2 / Digital Ocean
- **CI/CD**: GitHub Actions
- **Environment Management**: dotenv

---

## 📊 Database Schema Overview

### Core Tables (24 total)

1. **Users** - System users with roles
2. **Roles** - Role definitions (11 roles)
3. **Permissions** - Role-based permissions
4. **Customers** - Customer profiles with contact info
5. **Leads** - Enquiries and lead information
6. **FollowUps** - Follow-up tracking and scheduling
7. **Bookings** - Confirmed event bookings
8. **Events** - Event details and information
9. **Packages** - Pricing packages and services
10. **PackageItems** - Individual items in packages
11. **Payments** - Payment records and history
12. **PaymentSchedules** - Installment plans
13. **Invoices** - Generated invoices
14. **Accounts** - Income, expense, vendor records
15. **Employees** - Staff profiles and details
16. **EmployeeKPIs** - KPI tracking and performance
17. **DailyTasks** - Employee daily task assignments
18. **Attendance** - Attendance records
19. **Equipment** - Equipment inventory
20. **EquipmentCheckout** - Issue/return tracking
21. **EquipmentMaintenance** - Maintenance logs
22. **ShootSchedules** - Shoot scheduling
23. **TeamAssignments** - Resource allocation
24. **PhotoWorkflow** - Photo production pipeline
25. **VideoWorkflow** - Video production pipeline
26. **AlbumStatus** - Album creation tracking
27. **VideoStatus** - Video delivery tracking
28. **ShootExpenses** - Per-shoot expense tracking
29. **Notifications** - Notification records
30. **ActivityLogs** - Audit trail
31. **Reports** - Generated reports
32. **Settings** - System configuration

---

## 👥 User Roles & Permissions

1. **Super Admin** - Full system access
2. **Admin** - Configuration and user management
3. **Manager** - Dashboard, reports, team management
4. **Accountant** - Payments, invoices, accounts
5. **Photographer** - Shoot scheduling, gallery
6. **Videographer** - Shoot scheduling, video upload
7. **Editor** - Content editing (photo/video)
8. **Album Designer** - Album creation and design
9. **Coordinator** - Booking coordination, follow-ups
10. **Employee** - Task management, attendance
11. **Customer** - Booking, payment, gallery access

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Redis (optional, for caching)
- Docker & Docker Compose (for containerized setup)

### Installation

```bash
# Clone repository
git clone https://github.com/vipk62712-cloud/candid-carnival-erp.git
cd candid-carnival-erp

# Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh

# Or manual setup:

# Backend setup
cd backend
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

---

## 📝 Environment Variables

See `.env.example` files in `frontend/` and `backend/` directories.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing key
- `RAZORPAY_KEY_ID` - Razorpay API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `CLOUDINARY_URL` - Cloudinary API credentials
- `TWILIO_AUTH_TOKEN` - Twilio for SMS/WhatsApp
- `NEXTAUTH_SECRET` - NextAuth.js secret

---

## 🔐 Authentication Flow

1. **Register** → Email verification (OTP)
2. **Login** → JWT token + Session
3. **OAuth** → Google Sign-In integration
4. **MFA** → Optional 2FA setup
5. **Password Reset** → Email-based reset

---

## 📊 Dashboard Features

Real-time analytics including:
- Total Leads, Enquiries, Follow-ups Due
- Confirmed Bookings, Today's Shoots
- Revenue, Pending Payments, Expenses, Profit
- Equipment Usage, Employee Productivity
- Monthly KPI, Conversion Rate, Cash Flow
- Booking Trends with interactive charts

---

## 🔄 API Endpoints Structure

```
Auth:
  POST   /api/v1/auth/register
  POST   /api/v1/auth/login
  POST   /api/v1/auth/verify-otp
  POST   /api/v1/auth/forgot-password
  GET    /api/v1/auth/me

CRM:
  GET    /api/v1/crm/leads
  POST   /api/v1/crm/leads
  GET    /api/v1/crm/leads/:id
  PUT    /api/v1/crm/leads/:id
  DELETE /api/v1/crm/leads/:id

Bookings:
  GET    /api/v1/bookings
  POST   /api/v1/bookings
  GET    /api/v1/bookings/:id
  PUT    /api/v1/bookings/:id
  PATCH  /api/v1/bookings/:id/status

Payments:
  GET    /api/v1/payments
  POST   /api/v1/payments
  GET    /api/v1/payments/:id
  POST   /api/v1/payments/razorpay/webhook
  POST   /api/v1/payments/stripe/webhook

... and more
```

---

## 🎨 UI/UX Features

- ✨ Glassmorphism design elements
- 🌈 Gradient backgrounds with smooth transitions
- 🎬 Framer Motion page animations
- 📊 Interactive Recharts-based dashboards
- 🎯 Floating action buttons
- 💾 Skeleton loading states
- 🔔 Toast notifications with context
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive layout
- ♿ WCAG accessibility compliance

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test

# E2E tests
npm run test:e2e
```

---

## 📦 Deployment

### Docker Compose
```bash
docker-compose up -d
```

### Vercel (Frontend)
```bash
vercel deploy
```

### Railway / AWS (Backend)
See `docs/DEPLOYMENT.md` for detailed instructions.

---

## 📄 License

MIT License - See LICENSE file

---

## 👨‍💻 Development Team

Built with ❤️ for Candid Carnival Studios

---

## 📞 Support

For issues and questions:
- 📧 Email: support@candidcarnival.com
- 💬 WhatsApp: +91-XXXXXXXXXX
- 🐛 GitHub Issues: Report bugs here

---

## 🔗 Useful Links

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Guide](./docs/SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [User Roles & Permissions](./docs/USER_ROLES.md)

---

**Version**: 1.0.0-beta  
**Last Updated**: July 2026  
**Status**: 🚀 Production Ready
