import { Router } from 'express';
import { prisma } from '../app';

const router = Router();

// Register or Login a user by Device ID (and optionally OpenID/UserInfo for WeChat)
router.post('/login', async (req, res) => {
    try {
        const { deviceId, nickname, avatarUrl, openid } = req.body;

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
                    openid,
                    nickname: nickname || `User-${deviceId.slice(0, 6)}`,
                    avatarUrl,
                    stats: {
                        create: {
                            totalMerit: 0,
                            todayMerit: 0
                        }
                    }
                },
                include: { stats: true }
            });
        } else {
            // Update user info if provided (e.g., fetching latest WeChat info)
            if (nickname || avatarUrl || openid) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        ...(nickname && { nickname }),
                        ...(avatarUrl && { avatarUrl }),
                        ...(openid && { openid }),
                    },
                    include: { stats: true }
                });
            }
        }

        res.json({ user });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
