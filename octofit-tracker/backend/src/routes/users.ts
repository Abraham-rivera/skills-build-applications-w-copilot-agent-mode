import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

router.post('/', async (req, res) => {
  const created = await User.create(req.body);
  res.status(201).json({ message: 'user created', data: created });
});

export default router;
