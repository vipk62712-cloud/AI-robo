import { Router } from 'express';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';

const router = Router();

// Mock database
const users: any[] = [];

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Register
router.post('/register', async (req, res) => {
  const data = registerSchema.parse(req.body);

  const existingUser = users.find(u => u.email === data.email);
  if (existingUser) {
    throw new AppError(400, 'Email already registered');
  }

  const hashedPassword = await bcryptjs.hash(data.password, 10);
  const user = {
    id: Math.random().toString(36).substr(2, 9),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: hashedPassword,
    role: 'customer',
  };

  users.push(user);

  res.status(201).json({
    message: 'User registered successfully',
    user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
  });
});

// Login
router.post('/login', async (req, res) => {
  const data = loginSchema.parse(req.body);

  const user = users.find(u => u.email === data.email);
  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  const isPasswordValid = await bcryptjs.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
    user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
  });
});

// Get Current User
router.get('/me', authenticate, (req, res) => {
  const user = users.find(u => u.id === (req as any).user.id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  res.status(200).json({
    user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
  });
});

export default router;