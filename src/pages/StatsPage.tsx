import React, { useState } from 'react';
import { clsx } from 'clsx';
import { useMerit } from '../context/MeritContext';
import { Clock } from 'lucide-react';

export const StatsPage: React.FC = () => {
    const { merit, todayMerit } = useMerit();
    const [period, setPeriod] = useState<'day' | 'week' | 'total'>('day');

    return (
        <div className="bg-slate-50 min-h-full pb-20">
            {/* Header */}
            <header className="bg-indigo-600 text-white p-6 pb-20 rounded-b-3xl">
                <h1 className="text-center font-bold text-lg mb-6">功德统计</h1>

                {/* Period Selector */}
                <div className="flex bg-indigo-800/50 p-1 rounded-lg">
                    {['day', 'week', 'total'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p as any)}
                            className={clsx(
                                "flex-1 py-1 text-sm font-medium rounded-md transition-all",
                                period === p ? "bg-white text-indigo-900 shadow-sm" : "text-indigo-200 hover:text-white"
                            )}
                        >
                            {p === 'day' ? '今日' : p === 'week' ? '本周' : '总计'}
                        </button>
                    ))}
                </div>

                {/* Big Number */}
                <div className="text-center mt-8">
                    <div className="text-5xl font-bold mb-1">
                        {period === 'day' ? todayMerit : period === 'week' ? todayMerit + 450 : merit}
                    </div>
                    <div className="text-indigo-200 text-xs">
                        {period === 'day' ? '今日功德' : period === 'week' ? '本周功德' : '累计功德'}
                    </div>
                </div>
            </header>

            {/* Content Cards - Overlapping Header */}
            <div className="px-5 -mt-10 space-y-4">

                {/* Record Card */}
                <div className="bg-white rounded-2xl p-4 shadow-lg shadow-indigo-100/50 flex items-center justify-between">
                    <div>
                        <div className="text-xs text-gray-500 mb-1">最长连续记录</div>
                        <div className="font-bold text-xl text-amber-500 flex items-center gap-1">
                            <Clock size={18} />
                            <span>7 天</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">当前连续</div>
                        <div className="font-bold text-xl text-indigo-600">3 天</div>
                    </div>
                </div>

                {/* Detail List */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 text-sm">功德明细</h3>

                    <div className="space-y-4">
                        {/* Item 1 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <span className="text-lg">👆</span>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-gray-800">手动敲击</div>
                                    <div className="text-xs text-gray-400">今日 {todayMerit} 次</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-indigo-600">85%</div>
                                <div className="text-xs text-gray-400">占比</div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <span className="text-lg">🤖</span>
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-gray-800">自动模式</div>
                                    <div className="text-xs text-gray-400">今日 0 次</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-green-600">15%</div>
                                <div className="text-xs text-gray-400">占比</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
