import { Router, type Request, type Response } from 'express';
import { prisma } from '../utils/prisma.js';

const router = Router();

// GET users
router.get('/users', async (req: Request, res: Response) => {
   try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
