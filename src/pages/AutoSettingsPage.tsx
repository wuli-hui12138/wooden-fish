import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Moon, MonitorOff } from 'lucide-react';
import { useMerit } from '../context/MeritContext';
import { clsx } from 'clsx';

export const AutoSettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const { autoEnabled, toggleAuto } = useMerit();

    // In a real app we would have more state here for specific auto settings (speed, duration, etc.)
    // For now we just bind the main toggle

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="flex-1 text-center text-lg font-bold pr-10">自动木鱼</h1>
            </div>

            <div className="p-4 space-y-6">

                {/* Master Switch */}
                <div className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <div className="font-bold text-gray-800">自动模式</div>
                        <div className="text-xs text-gray-400 mt-1">开启后将自动敲击木鱼</div>
                    </div>
                    <button
                        onClick={() => toggleAuto(!autoEnabled)}
                        className={clsx("w-12 h-7 rounded-full relative transition-colors duration-300", autoEnabled ? "bg-green-500" : "bg-gray-300")}
                    >
                        <div className={clsx("w-5 h-5 rounded-full bg-white absolute top-1 transition-transform duration-300 shadow", autoEnabled ? "left-6" : "left-1")} />
                    </button>
                </div>

                {/* Speed Settings */}
                <div className="px-2">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-gray-600">敲击速度</span>
                        <span className="text-xs text-gray-400">中速 (60次/分钟)</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full mb-6 mx-2">
                        <div className="absolute w-1/2 h-full bg-green-500 rounded-full" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-green-500 rounded-full shadow" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>慢速 (20次/分钟)</span>
                        <span>快速 (100次/分钟)</span>
                    </div>
                </div>

                {/* Duration */}
                <div>
                    <div className="flex justify-between items-center mb-3 px-2">
                        <span className="text-sm font-bold text-gray-600">自动时长</span>
                        <span className="text-xs text-gray-400">15分钟</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 px-1">
                        {['6分钟', '10分钟', '15分钟', '30分钟'].map((t, i) => (
                            <button key={t} className={clsx(
                                "py-2 px-4 rounded-xl text-sm font-bold border-2",
                                i === 2 ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-100 text-gray-500"
                            )}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Toggles */}
                <div className="bg-white rounded-2xl p-2 shadow-sm">
                    <ToggleRow icon={<Moon size={18} className="text-indigo-500" />} label="静音敲击" />
                    <div className="border-t border-gray-50 my-1" />
                    <ToggleRow icon={<MonitorOff size={18} className="text-purple-500" />} label="关闭屏幕时继续" active />
                </div>

                {/* Timer */}
                <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between opacity-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                            <Clock size={16} />
                        </div>
                        <div>
                            <div className="font-bold text-sm text-gray-800">定时自动敲击</div>
                            <div className="text-xs text-gray-400">设置每天固定时间开始敲击</div>
                        </div>
                    </div>
                    <button className="w-10 h-6 bg-gray-200 rounded-full p-1 relative">
                        <div className="w-4 h-4 bg-white rounded-full" />
                    </button>
                </div>

                <button className="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 active:scale-95 transition-transform">
                    保存设置
                </button>
            </div>
        </div>
    );
};

const ToggleRow: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => (
    <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                {icon}
            </div>
            <span className="text-sm font-bold text-gray-700">{label}</span>
        </div>
        <button className={clsx("w-10 h-6 rounded-full p-1 relative transition-colors", active ? "bg-green-500" : "bg-gray-300")}>
            <div className={clsx("w-4 h-4 rounded-full bg-white shadow transition-transform", active ? "translate-x-4" : "translate-x-0")} />
        </button>
    </div>
);
