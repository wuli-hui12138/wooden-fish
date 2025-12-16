const API_URL = 'http://localhost:3000/api';

export interface User {
    id: number;
    deviceId: string;
    nickname: string | null;
    stats?: {
        totalMerit: number;
        todayMerit: number;
    }
}

export const api = {
    login: async (deviceId: string, nickname?: string, avatarUrl?: string) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deviceId, nickname, avatarUrl })
        });
        return res.json();
    },

    sync: async (userId: number, totalMerit: number, todayMerit: number) => {
        const res = await fetch(`${API_URL}/merit/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, totalMerit, todayMerit })
        });
        return res.json();
    },

    getLeaderboard: async () => {
        const res = await fetch(`${API_URL}/leaderboard`);
        return res.json();
    }
};
