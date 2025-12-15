import React from 'react';
import { Award, Lock, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useMerit } from '../context/MeritContext';

const achievements = [
    { id: 1, name: '初心', desc: '首次敲击木鱼', points: 10, completed: true },
    { id: 2, name: '初显身手', desc: '累计敲击100次', points: 20, completed: true },
    { id: 3, name: '坚持不懈', desc: '连续3天使用', points: 50, completed: true },
    { id: 4, name: '渐入佳境', desc: '累计敲击1000次', points: 100, completed: false },
    { id: 5, name: '禅师之道', desc: '累计敲击10000次', points: 500, completed: false },
    { id: 6, name: '心如止水', desc: '累计敲击100000次', points: 1000, completed: false },
];

export const AchievementsPage: React.FC = () => {
    const { merit } = useMerit();

    // Dynamic calculation based on merit for demo
    const calculatedAchievements = achievements.map(a => ({
        ...a,
        completed: a.id === 1 ? merit > 0 : a.id === 2 ? merit >= 100 : a.id === 4 ? merit >= 1000 : a.completed
    }));

    const totalPoints = calculatedAchievements.reduce((acc, curr) => acc + (curr.completed ? curr.points : 0), 0);
    const completedCount = calculatedAchievements.filter(a => a.completed).length;

    return (
        <div className="bg-slate-50 min-h-full pb-20">
            {/* Header */}
            <div className="bg-orange-400 text-white p-6 pb-16 rounded-b-3xl relative overflow-hidden">
                <h1 className="text-center font-bold text-lg mb-6 relative z-10">我的成就</h1>
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-300/30 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/30 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="px-5 -mt-10 space-y-4">
                {/* Summary Card */}
                <div className="bg-orange-50 rounded-2xl p-6 flex items-center justify-between border border-orange-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200">
                            <Award size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-orange-800/60 font-bold mb-1">成就点数</div>
                            <div className="text-2xl font-black text-orange-600 font-mono">{totalPoints} <span className="text-xs text-orange-400 font-normal">/ 3000</span></div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-orange-800/60 font-bold mb-1">已获得</div>
                        <div className="text-xl font-black text-orange-600">{completedCount} <span className="text-xs text-orange-400">/ {achievements.length}</span></div>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                    <h3 className="font-bold text-gray-800 ml-1">已获得成就</h3>
                    {calculatedAchievements.map(item => (
                        <div key={item.id} className={clsx(
                            "bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm transition-all",
                            !item.completed && "opacity-60 grayscale"
                        )}>
                            <div className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                item.completed ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"
                            )}>
                                {item.completed ? <Award size={20} /> : <Lock size={20} />}
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-gray-800 text-sm">{item.name}</div>
                                <div className="text-xs text-gray-400">{item.desc}</div>
                            </div>
                            {item.completed && (
                                <CheckCircle2 size={20} className="text-orange-500" />
                            )}
                            {!item.completed && (
                                <span className="text-xs text-gray-300 font-mono">{item.points} pts</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
