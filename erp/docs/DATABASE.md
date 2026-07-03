# 🗄️ Database Schema - Candid Carnival ERP

## Overview

PostgreSQL database with 32+ normalized tables supporting all ERP modules.

## Core Tables

### Authentication & Authorization

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  role_id UUID REFERENCES roles(id),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);
```

#### Roles
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Customer Management

#### Customers
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  alternate_phone VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  pincode VARCHAR(10),
  address TEXT,
  bride_name VARCHAR(100),
  groom_name VARCHAR(100),
  bride_contact VARCHAR(20),
  groom_contact VARCHAR(20),
  budget DECIMAL(12, 2),
  preferred_dates TEXT[],
  notes TEXT,
  source VARCHAR(50), -- Website, Referral, Social, etc.
  status VARCHAR(50) DEFAULT 'new', -- new, prospect, customer, inactive
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);
```

#### Leads (Enquiries)
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  inquiry_type VARCHAR(50), -- Wedding, Pre-Wedding, Birthday, etc.
  event_date DATE,
  venue_city VARCHAR(100),
  venue_name VARCHAR(200),
  estimated_budget DECIMAL(12, 2),
  guest_count INT,
  lead_score INT DEFAULT 0, -- 0-100
  lead_source VARCHAR(100),
  assigned_to UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, interested, quoted, rejected
  notes TEXT,
  attachments JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);
```

### Booking & Events

#### Bookings
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  booking_id VARCHAR(50) UNIQUE,
  customer_id UUID REFERENCES customers(id),
  lead_id UUID REFERENCES leads(id),
  event_date DATE NOT NULL,
  event_end_date DATE,
  venue_id UUID REFERENCES venues(id),
  package_id UUID REFERENCES packages(id),
  coordinator_id UUID REFERENCES users(id),
  total_amount DECIMAL(12, 2),
  advance_paid DECIMAL(12, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'confirmed', -- confirmed, in-progress, completed, cancelled
  booking_date DATE,
  confirmation_date DATE,
  contract_signed BOOLEAN DEFAULT false,
  contract_url TEXT,
  checklist JSONB,
  deliverables JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);
```

#### Packages
```sql
CREATE TABLE packages (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50), -- Wedding, Pre-Wedding, Birthday, etc.
  description TEXT,
  base_price DECIMAL(12, 2),
  duration INT, -- in hours
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### PackageItems
```sql
CREATE TABLE package_items (
  id UUID PRIMARY KEY,
  package_id UUID REFERENCES packages(id),
  name VARCHAR(100),
  type VARCHAR(50), -- Photography, Videography, Album, etc.
  quantity INT,
  price DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Payments & Invoices

#### Payments
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  payment_id VARCHAR(100) UNIQUE,
  booking_id UUID REFERENCES bookings(id),
  customer_id UUID REFERENCES customers(id),
  amount DECIMAL(12, 2),
  payment_method VARCHAR(50), -- UPI, Razorpay, Stripe, Cash, Bank Transfer
  payment_gateway VARCHAR(50), -- razorpay, stripe, manual
  gateway_transaction_id VARCHAR(200),
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  payment_date TIMESTAMP,
  due_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Invoices
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE,
  booking_id UUID REFERENCES bookings(id),
  customer_id UUID REFERENCES customers(id),
  invoice_date DATE,
  due_date DATE,
  total_amount DECIMAL(12, 2),
  gst_amount DECIMAL(12, 2),
  discount_amount DECIMAL(12, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft', -- draft, sent, viewed, paid, overdue
  items JSONB,
  notes TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Shoot Management

#### ShootSchedules
```sql
CREATE TABLE shoot_schedules (
  id UUID PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  shoot_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location VARCHAR(255),
  venue_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  shoot_type VARCHAR(50), -- Pre-wedding, Wedding Day, Reception, etc.
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### TeamAssignments
```sql
CREATE TABLE team_assignments (
  id UUID PRIMARY KEY,
  shoot_id UUID REFERENCES shoot_schedules(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(50), -- Photographer, Videographer, Editor, etc.
  status VARCHAR(50) DEFAULT 'assigned', -- assigned, confirmed, completed
  call_time TIME,
  estimated_hours INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Equipment Management

#### Equipment
```sql
CREATE TABLE equipment (
  id UUID PRIMARY KEY,
  equipment_id VARCHAR(50) UNIQUE,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50), -- Camera, Lens, Drone, Light, etc.
  model VARCHAR(100),
  serial_number VARCHAR(100) UNIQUE,
  purchase_date DATE,
  purchase_price DECIMAL(12, 2),
  current_value DECIMAL(12, 2),
  status VARCHAR(50) DEFAULT 'active', -- active, maintenance, damaged, retired
  barcode VARCHAR(100) UNIQUE,
  qr_code TEXT,
  last_checkout TIMESTAMP,
  last_checkin TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### EquipmentCheckout
```sql
CREATE TABLE equipment_checkout (
  id UUID PRIMARY KEY,
  equipment_id UUID REFERENCES equipment(id),
  user_id UUID REFERENCES users(id),
  shoot_id UUID REFERENCES shoot_schedules(id),
  checkout_date TIMESTAMP,
  expected_return TIMESTAMP,
  actual_return TIMESTAMP,
  condition_at_checkout VARCHAR(50), -- Good, Fair, Poor
  condition_at_return VARCHAR(50),
  damage_report TEXT,
  status VARCHAR(50) DEFAULT 'checked_out', -- checked_out, returned, damaged
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Production Workflow

#### PhotoWorkflow
```sql
CREATE TABLE photo_workflow (
  id UUID PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  stage VARCHAR(50) DEFAULT 'backup', -- backup, selection, editing, qc, client_approval, printing, packaging, delivered
  total_shots INT,
  selected_shots INT,
  edited_shots INT,
  approved_shots INT,
  delivered_count INT,
  assigned_to UUID REFERENCES users(id),
  due_date DATE,
  completion_date DATE,
  notes TEXT,
  progress_percentage INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### VideoWorkflow
```sql
CREATE TABLE video_workflow (
  id UUID PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  stage VARCHAR(50) DEFAULT 'backup', -- backup, selection, editing, color_grade, qc, client_approval, delivery
  raw_footage_size BIGINT,
  edited_videos INT,
  duration_minutes INT,
  assigned_to UUID REFERENCES users(id),
  due_date DATE,
  completion_date DATE,
  notes TEXT,
  progress_percentage INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Employee Management

#### Employees
```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  employee_id VARCHAR(50) UNIQUE,
  department VARCHAR(100),
  designation VARCHAR(100),
  join_date DATE,
  salary DECIMAL(12, 2),
  phone VARCHAR(20),
  emergency_contact VARCHAR(20),
  address TEXT,
  skills JSONB,
  certifications TEXT[],
  status VARCHAR(50) DEFAULT 'active', -- active, on_leave, inactive
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### EmployeeKPIs
```sql
CREATE TABLE employee_kpis (
  id UUID PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  month DATE,
  shoots_completed INT,
  photos_delivered INT,
  videos_delivered INT,
  client_rating DECIMAL(3, 1),
  on_time_delivery_rate DECIMAL(5, 2),
  quality_score DECIMAL(5, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Financial Management

#### Accounts
```sql
CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  account_type VARCHAR(50), -- income, expense, vendor, bank
  account_name VARCHAR(100) NOT NULL,
  account_number VARCHAR(50),
  bank_name VARCHAR(100),
  ifsc_code VARCHAR(20),
  balance DECIMAL(12, 2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'INR',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Transactions
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  account_id UUID REFERENCES accounts(id),
  transaction_type VARCHAR(50), -- debit, credit
  amount DECIMAL(12, 2),
  description TEXT,
  reference_id UUID,
  reference_type VARCHAR(50), -- booking, invoice, expense, etc.
  transaction_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### System Tables

#### Notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50), -- email, sms, whatsapp, push
  title VARCHAR(200),
  message TEXT,
  related_entity_id UUID,
  related_entity_type VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### ActivityLogs
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100),
  entity_type VARCHAR(50),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Relationships Diagram

```
Users (11 roles)
  ├── Customers
  │   ├── Leads
  │   └── Bookings
  │       ├── Packages → PackageItems
  │       ├── Payments → Invoices
  │       ├── ShootSchedules → TeamAssignments → Equipment → EquipmentCheckout
  │       ├── PhotoWorkflow
  │       ├── VideoWorkflow
  │       ├── AlbumStatus
  │       └── VideoStatus
  ├── Employees → EmployeeKPIs
  ├── Equipment
  └── Notifications
      └── ActivityLogs
```

## Indexes for Performance

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_leads_customer_id ON leads(customer_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_payment_date ON payments(payment_date);
CREATE INDEX idx_shoot_schedules_booking_id ON shoot_schedules(booking_id);
CREATE INDEX idx_shoot_schedules_shoot_date ON shoot_schedules(shoot_date);
CREATE INDEX idx_team_assignments_user_id ON team_assignments(user_id);
CREATE INDEX idx_equipment_status ON equipment(status);
CREATE INDEX idx_equipment_checkout_equipment_id ON equipment_checkout(equipment_id);
CREATE INDEX idx_invoices_booking_id ON invoices(booking_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
```

## Data Retention Policy

- **Soft Deletes**: All tables use `deleted_at` for soft delete
- **Audit Trail**: All changes logged in `activity_logs`
- **Backup**: Daily automated backups recommended

---

For migration scripts, see `database/migrations/` directory.