import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

let bookings: any[] = [];

// Get all bookings
router.get('/', authenticate, (req, res) => {
  res.status(200).json({ bookings });
});

// Create booking
router.post('/', authenticate, (req, res) => {
  const booking = {
    id: Math.random().toString(36).substr(2, 9),
    bookingId: `BK-${Date.now()}`,
    ...req.body,
    status: 'confirmed',
    createdAt: new Date(),
  };
  bookings.push(booking);
  res.status(201).json(booking);
});

// Get booking by ID
router.get('/:id', authenticate, (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.status(200).json(booking);
});

// Update booking
router.put('/:id', authenticate, (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  Object.assign(booking, req.body);
  res.status(200).json(booking);
});

// Update booking status
router.patch('/:id/status', authenticate, (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  booking.status = req.body.status;
  res.status(200).json(booking);
});

export default router;