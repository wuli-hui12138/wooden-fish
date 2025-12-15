import { Router } from 'express';
import { prisma } from '../app';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const topUsers = await prisma.userStats.findMany({
            take: 20,
            orderBy: {
                totalMerit: 'desc'
            },
            include: {
                user: {
                    select: { nickname: true }
                }
            }
        });

        const leaderboard = topUsers.map((stat: any, index: number) => ({
            rank: index + 1,
            nickname: stat.user.nickname,
            totalMerit: stat.totalMerit,
            userId: stat.userId
        }));

        res.json({ leaderboard });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
