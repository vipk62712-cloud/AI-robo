import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

let shoots: any[] = [];

// Get all shoots
router.get('/', authenticate, (req, res) => {
  res.status(200).json({ shoots });
});

// Schedule shoot
router.post('/', authenticate, (req, res) => {
  const shoot = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    status: 'scheduled',
    createdAt: new Date(),
  };
  shoots.push(shoot);
  res.status(201).json(shoot);
});

// Get shoot by ID
router.get('/:id', authenticate, (req, res) => {
  const shoot = shoots.find(s => s.id === req.params.id);
  if (!shoot) {
    return res.status(404).json({ error: 'Shoot not found' });
  }
  res.status(200).json(shoot);
});

// Update shoot
router.put('/:id', authenticate, (req, res) => {
  const shoot = shoots.find(s => s.id === req.params.id);
  if (!shoot) {
    return res.status(404).json({ error: 'Shoot not found' });
  }
  Object.assign(shoot, req.body);
  res.status(200).json(shoot);
});

export default router;