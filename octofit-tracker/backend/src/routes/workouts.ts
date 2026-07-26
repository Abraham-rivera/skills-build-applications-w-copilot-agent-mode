import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('creator').lean();
  res.json({ workouts });
});

router.post('/', async (req, res) => {
  const created = await Workout.create(req.body);
  res.status(201).json({ message: 'workout created', data: created });
});

export default router;
