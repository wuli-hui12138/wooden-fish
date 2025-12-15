import React, { useEffect, useState } from 'react';
import { Award, Trophy } from 'lucide-react';
import { api } from '../services/api';

export const LeaderboardPage: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);

    useEffect(() => {
        api.getLeaderboard().then(res => {
            if (res.leaderboard) {
                setLeaderboard(res.leaderboard);
            }
        }).catch(err => console.error(err));
    }, []);

    return (
        <div className="bg-slate-50 min-h-full pb-20">
            <header className="bg-gradient-to-b from-amber-400 to-amber-500 text-white p-6 pb-16 rounded-b-3xl">
                <h1 className="text-center font-bold text-lg mb-2 flex items-center justify-center gap-2">
                    <Trophy className="text-yellow-100" />
                    功德排行榜
                </h1>
                <div className="text-center text-white/80 text-xs">前 {leaderboard.length} 名大德</div>
            </header>

            <div className="px-5 -mt-10 space-y-3">
                {leaderboard.map((user, idx) => (
                    <div key={user.userId} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                            ${idx === 0 ? 'bg-yellow-100 text-yellow-600' :
                                idx === 1 ? 'bg-slate-100 text-slate-600' :
                                    idx === 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'}
                         `}>
                            {idx + 1}
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-gray-800">{user.nickname}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-indigo-600">{user.totalMerit}</div>
                            <div className="text-[10px] text-gray-400">功德</div>
                        </div>
                    </div>
                ))}

                {leaderboard.length === 0 && (
                    <div className="text-center text-gray-400 py-10">
                        暂无数据，快去敲木鱼吧
                    </div>
                )}
            </div>
        </div>
    );
};
