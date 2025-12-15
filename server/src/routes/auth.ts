import { Router } from 'express';
import { prisma } from '../app';

const router = Router();

// Register or Login a user by Device ID
router.post('/login', async (req, res) => {
    try {
        const { deviceId, nickname } = req.body;

        if (!deviceId) {
            res.status(400).json({ error: 'Device ID is required' });
            return;
        }

        let user = await prisma.user.findUnique({
            where: { deviceId },
            include: { stats: true }
        });

        if (!user) {
            // Create new user
            user = await prisma.user.create({
                data: {
                    deviceId,
                    nickname: nickname || `User-${deviceId.slice(0, 6)}`,
                    stats: {
                        create: {
                            totalMerit: 0,
                            todayMerit: 0
                        }
                    }
                },
                include: { stats: true }
            });
        }

        res.json({ user });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
