import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import Razorpay from 'razorpay';

const router = Router();

let payments: any[] = [];

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_SECRET_KEY || '',
});

// Get all payments
router.get('/', authenticate, (req, res) => {
  res.status(200).json({ payments });
});

// Create payment order
router.post('/orders', authenticate, async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `booking-${bookingId}`,
    });

    const payment = {
      id: Math.random().toString(36).substr(2, 9),
      paymentId: `PAY-${Date.now()}`,
      bookingId,
      amount,
      orderId: order.id,
      status: 'pending',
      createdAt: new Date(),
    };

    payments.push(payment);
    res.status(201).json({ order, payment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment
router.post('/verify', authenticate, (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  const payment = payments.find(p => p.orderId === orderId);

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  // Verify signature with Razorpay
  payment.status = 'completed';
  payment.razorpayPaymentId = paymentId;
  payment.razorpaySignature = signature;

  res.status(200).json({ message: 'Payment verified', payment });
});

export default router;