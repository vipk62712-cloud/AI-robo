import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

let notifications: any[] = [];

// Get user notifications
router.get('/', authenticate, (req, res) => {
  const userNotifications = notifications.filter(n => n.userId === (req as any).user.id);
  res.status(200).json({ notifications: userNotifications });
});

// Send notification
router.post('/', authenticate, (req, res) => {
  const notification = {
    id: Math.random().toString(36).substr(2, 9),
    userId: req.body.userId,
    type: req.body.type,
    title: req.body.title,
    message: req.body.message,
    isRead: false,
    createdAt: new Date(),
  };
  notifications.push(notification);
  res.status(201).json(notification);
});

// Mark as read
router.patch('/:id/read', authenticate, (req, res) => {
  const notification = notifications.find(n => n.id === req.params.id);
  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  notification.isRead = true;
  res.status(200).json(notification);
});

export default router;