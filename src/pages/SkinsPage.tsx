import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useMerit, type Skin } from '../context/MeritContext';
import { clsx } from 'clsx';

const skins: { id: Skin; name: string; desc: string; color: string; text: string; locked?: boolean }[] = [
    { id: 'classic', name: '传统木鱼', desc: '经典厚重质感', color: 'bg-stone-100', text: 'text-stone-600' },
    { id: 'gold', name: '金色木鱼', desc: '尊贵金纹纹理', color: 'bg-yellow-50', text: 'text-yellow-600' },
    { id: 'jade', name: '翡翠木鱼', desc: '温润如玉质感', color: 'bg-emerald-50', text: 'text-emerald-600', locked: true },
    { id: 'crystal', name: '水晶木鱼', desc: '需达到100次敲击', color: 'bg-blue-50', text: 'text-blue-600', locked: true },
    { id: 'purple', name: '紫砂木鱼', desc: '厚重如土生根', color: 'bg-purple-50', text: 'text-purple-600', locked: true },
    { id: 'star', name: '星空木鱼', desc: '累计1000次敲击', color: 'bg-slate-900', text: 'text-slate-300', locked: true },
];

export const SkinsPage: React.FC = () => {
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
                <h1 className="flex-1 text-center text-lg font-bold pr-10">木鱼皮肤</h1>
            </div>

            {/* Grid */}
            <div className="p-4 grid grid-cols-2 gap-4">
                {skins.map(skin => {
                    const isActive = settings.skin === skin.id;
                    return (
                        <button
                            key={skin.id}
                            disabled={skin.locked}
                            onClick={() => !skin.locked && updateSettings({ skin: skin.id })}
                            className={clsx(
                                "relative aspect-[4/5] rounded-2xl p-4 flex flex-col items-center justify-between transition-all border-2",
                                isActive ? "border-indigo-600 bg-white ring-2 ring-indigo-100" : "border-transparent bg-white hover:bg-gray-50",
                                skin.locked && "opacity-70 grayscale"
                            )}
                        >
                            {/* Checkmark */}
                            {isActive && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                            )}

                            {/* Preview Area */}
                            <div className={clsx("w-full aspect-square rounded-xl mb-2 flex items-center justify-center", skin.color)}>
                                {skin.locked ? <Lock className="text-gray-400" /> : (
                                    <div className={clsx("font-bold text-xs", skin.text)}>Preview</div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <div className="font-bold text-gray-800 text-sm">{skin.name}</div>
                                <div className="text-[10px] text-gray-400 mt-1">{skin.desc}</div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
