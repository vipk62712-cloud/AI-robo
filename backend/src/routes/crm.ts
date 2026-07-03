import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

const leadSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  eventType: z.string(),
  eventDate: z.string(),
  budget: z.number().optional(),
  notes: z.string().optional(),
});

let leads: any[] = [];

// Get all leads
router.get('/leads', authenticate, (req, res) => {
  res.status(200).json({ leads });
});

// Create lead
router.post('/leads', authenticate, (req, res) => {
  const data = leadSchema.parse(req.body);
  const lead = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    status: 'new',
    createdAt: new Date(),
  };
  leads.push(lead);
  res.status(201).json(lead);
});

// Get lead by ID
router.get('/leads/:id', authenticate, (req, res) => {
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  res.status(200).json(lead);
});

// Update lead
router.put('/leads/:id', authenticate, (req, res) => {
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  Object.assign(lead, req.body);
  res.status(200).json(lead);
});

// Delete lead
router.delete('/leads/:id', authenticate, authorize('admin', 'manager'), (req, res) => {
  leads = leads.filter(l => l.id !== req.params.id);
  res.status(204).send();
});

export default router;