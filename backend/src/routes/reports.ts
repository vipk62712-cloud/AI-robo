import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Generate revenue report
router.get('/revenue', authenticate, authorize('admin', 'manager', 'accountant'), (req, res) => {
  res.status(200).json({
    report: {
      totalRevenue: 500000,
      month: new Date().toLocaleString('default', { month: 'long' }),
      bookings: 12,
      avgPackageValue: 41666.67,
    },
  });
});

// Generate expense report
router.get('/expenses', authenticate, authorize('admin', 'manager', 'accountant'), (req, res) => {
  res.status(200).json({
    report: {
      totalExpenses: 150000,
      month: new Date().toLocaleString('default', { month: 'long' }),
      categories: [
        { name: 'Equipment Maintenance', amount: 50000 },
        { name: 'Staff Salaries', amount: 80000 },
        { name: 'Marketing', amount: 20000 },
      ],
    },
  });
});

// Generate profit report
router.get('/profit', authenticate, authorize('admin', 'manager', 'accountant'), (req, res) => {
  res.status(200).json({
    report: {
      revenue: 500000,
      expenses: 150000,
      profit: 350000,
      profitMargin: 70,
      month: new Date().toLocaleString('default', { month: 'long' }),
    },
  });
});

// Generate KPI report
router.get('/kpi', authenticate, authorize('admin', 'manager'), (req, res) => {
  res.status(200).json({
    report: {
      conversionRate: 35,
      avgBookingValue: 41666.67,
      customerSatisfaction: 4.8,
      onTimeDeliveryRate: 98,
      employeeProductivity: 92,
    },
  });
});

export default router;