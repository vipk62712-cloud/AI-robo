import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

let assignments: any[] = [];

// Get all team assignments
router.get('/assignments', authenticate, (req, res) => {
  res.status(200).json({ assignments });
});

// Assign team member
router.post('/assignments', authenticate, authorize('admin', 'manager'), (req, res) => {
  const assignment = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    status: 'assigned',
    createdAt: new Date(),
  };
  assignments.push(assignment);
  res.status(201).json(assignment);
});

// Get team member workload
router.get('/workload/:userId', authenticate, (req, res) => {
  const userAssignments = assignments.filter(a => a.userId === req.params.userId);
  res.status(200).json({ assignments: userAssignments });
});

export default router;