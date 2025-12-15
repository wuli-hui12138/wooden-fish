import { Router } from 'express';
import { prisma } from '../app';

const router = Router();

// Sync merit from client to server
router.post('/sync', async (req, res) => {
    try {
        const { userId, totalMerit, todayMerit } = req.body;

        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }

        // Update User Stats
        const updatedStats = await prisma.userStats.update({
            where: { userId },
            data: {
                totalMerit,
                todayMerit,
                updatedAt: new Date()
            }
        });

        // Optionally record a log entry if we want granularity (e.g. per 100 taps)
        // For simple MVP we just trust the client sync for now.

        res.json({ success: true, stats: updatedStats });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
