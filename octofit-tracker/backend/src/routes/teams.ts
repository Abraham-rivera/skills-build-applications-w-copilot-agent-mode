import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ teams });
});

router.post('/', async (req, res) => {
  const created = await Team.create(req.body);
  res.status(201).json({ message: 'team created', data: created });
});

export default router;
