import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

let equipment: any[] = [];

// Get all equipment
router.get('/', authenticate, (req, res) => {
  res.status(200).json({ equipment });
});

// Add equipment
router.post('/', authenticate, authorize('admin', 'manager'), (req, res) => {
  const newEquip = {
    id: Math.random().toString(36).substr(2, 9),
    equipmentId: `EQ-${Date.now()}`,
    ...req.body,
    status: 'active',
    createdAt: new Date(),
  };
  equipment.push(newEquip);
  res.status(201).json(newEquip);
});

// Checkout equipment
router.post('/:id/checkout', authenticate, (req, res) => {
  const equip = equipment.find(e => e.id === req.params.id);
  if (!equip) {
    return res.status(404).json({ error: 'Equipment not found' });
  }
  equip.status = 'checked_out';
  equip.lastCheckout = new Date();
  res.status(200).json(equip);
});

// Checkin equipment
router.post('/:id/checkin', authenticate, (req, res) => {
  const equip = equipment.find(e => e.id === req.params.id);
  if (!equip) {
    return res.status(404).json({ error: 'Equipment not found' });
  }
  equip.status = 'active';
  equip.lastCheckin = new Date();
  res.status(200).json(equip);
});

export default router;