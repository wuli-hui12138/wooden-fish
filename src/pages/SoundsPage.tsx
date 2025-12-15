import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Lock, Bell, Music, Volume2 } from 'lucide-react';
import { useMerit, type Sound } from '../context/MeritContext';
import { clsx } from 'clsx';

const sounds: { id: Sound; name: string; desc: string; icon: React.ReactNode; locked?: boolean }[] = [
    { id: 'classic', name: '传统木鱼声', desc: '经典打击音效', icon: <Bell size={20} /> },
    { id: 'bell', name: '禅意钟声', desc: '悠扬空灵音效', icon: <Bell size={20} /> },
    { id: 'bamboo', name: '竹林木鱼', desc: '清脆自然音效', icon: <Music size={20} /> },
    { id: 'keyboard', name: '大珠宝殿', desc: '需达到2000次敲击', icon: <Volume2 size={20} />, locked: true },
];

export const SoundsPage: React.FC = () => {
    const navigate = useNavigate();
    const { settings, updateSettings } = useMerit();

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
                <h1 className="flex-1 text-center text-lg font-bold pr-10">声音设置</h1>
            </div>

            <div className="p-4 space-y-6">
                {/* Volume Control */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-gray-700">音量</span>
                        <span className="text-gray-400 text-sm">{settings.volume}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.volume}
                        onChange={(e) => updateSettings({ volume: parseInt(e.target.value) })}
                        className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>

                {/* Sound List */}
                <div>
                    <div className="text-sm text-gray-500 mb-2 pl-2">木鱼声音</div>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        {sounds.map((sound, idx) => (
                            <button
                                key={sound.id}
                                disabled={sound.locked}
                                onClick={() => !sound.locked && updateSettings({ sound: sound.id })}
                                className={clsx(
                                    "w-full p-4 flex items-center gap-4 transition-colors text-left",
                                    idx !== sounds.length - 1 && "border-b border-gray-50",
                                    sound.locked ? "opacity-60" : "hover:bg-gray-50"
                                )}
                            >
                                <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", settings.sound === sound.id ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500")}>
                                    {sound.icon}
                                </div>

                                <div className="flex-1">
                                    <div className="font-bold text-gray-800 text-sm">{sound.name}</div>
                                    <div className="text-xs text-gray-400">{sound.desc}</div>
                                </div>

                                {settings.sound === sound.id ? (
                                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                ) : sound.locked ? (
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-gray-300">
                                        <Lock size={16} />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Other Settings */}
                <div>
                    <div className="text-sm text-gray-500 mb-2 pl-2">其他设置</div>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 flex items-center justify-between border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                    <Bell size={16} />
                                </div>
                                <span className="text-sm font-bold text-gray-700">振动反馈</span>
                            </div>
                            <button
                                onClick={() => updateSettings({ vibration: !settings.vibration })}
                                className={clsx("w-10 h-6 p-1 rounded-full transition-colors", settings.vibration ? "bg-indigo-500" : "bg-gray-300")}
                            >
                                <div className={clsx("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", settings.vibration ? "translate-x-4" : "translate-x-0")} />
                            </button>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                                    <Volume2 size={16} />
                                </div>
                                <span className="text-sm font-bold text-gray-700">静音模式</span>
                            </div>
                            <button
                                onClick={() => updateSettings({ silentMode: !settings.silentMode })}
                                className={clsx("w-10 h-6 p-1 rounded-full transition-colors", settings.silentMode ? "bg-indigo-500" : "bg-gray-300")}
                            >
                                <div className={clsx("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", settings.silentMode ? "translate-x-4" : "translate-x-0")} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
