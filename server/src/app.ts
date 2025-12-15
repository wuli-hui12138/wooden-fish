import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import meritRoutes from './routes/merit';
import leaderboardRoutes from './routes/leaderboard';

const app = express();
// Initialize Prisma Client
export const prisma = new PrismaClient({});
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/merit', meritRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.get('/', (req, res) => {
    res.send('Wooden Fish API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


