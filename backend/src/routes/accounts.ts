import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

let accounts: any[] = [];
let transactions: any[] = [];

// Get all accounts
router.get('/accounts', authenticate, (req, res) => {
  res.status(200).json({ accounts });
});

// Create account
router.post('/accounts', authenticate, authorize('admin', 'accountant'), (req, res) => {
  const account = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    balance: 0,
    createdAt: new Date(),
  };
  accounts.push(account);
  res.status(201).json(account);
});

// Get transactions
router.get('/transactions', authenticate, (req, res) => {
  res.status(200).json({ transactions });
});

// Record transaction
router.post('/transactions', authenticate, authorize('admin', 'accountant'), (req, res) => {
  const transaction = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    createdAt: new Date(),
  };
  transactions.push(transaction);

  // Update account balance
  const account = accounts.find(a => a.id === transaction.accountId);
  if (account) {
    if (transaction.type === 'credit') {
      account.balance += transaction.amount;
    } else {
      account.balance -= transaction.amount;
    }
  }

  res.status(201).json(transaction);
});

export default router;