import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const created = await Activity.create(req.body);
  res.status(201).json({ message: 'activity logged', data: created });
});

export default router;
