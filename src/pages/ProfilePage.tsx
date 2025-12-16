import React from 'react';
import { Link } from 'react-router-dom';
import {
    User, Heart, Share2, Star, Gift,
    Palette, Volume2, Zap, HelpCircle,
    MessageSquare, Settings, ChevronRight
} from 'lucide-react';
import { useMerit } from '../context/MeritContext';
import { clsx } from 'clsx';

export const ProfilePage: React.FC = () => {
    const { merit, user, login } = useMerit();
    const level = Math.floor(merit / 100) + 1;
    const progress = (merit % 100);

    const handleMockLogin = async () => {
        // Mock WeChat Login Data
        const mockWeChatUser = {
            nickname: `WeChatUser_${Math.floor(Math.random() * 1000)}`,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}` // Random avatar
        };
        await login(mockWeChatUser);
        alert('模拟微信登录成功！');
    };

    return (
    return (
        <div className="bg-slate-900 min-h-full pb-24 text-slate-100">
            {/* Header Profile Card */}
            <div className="bg-slate-800 p-6 pt-10 pb-16 rounded-b-[2.5rem] shadow-xl shadow-black/20">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center overflow-hidden">
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <User size={32} className="text-slate-400" />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">{user?.nickname || '心安用户'}</h2>
                            {!user?.avatarUrl && (
                                <button
                                    onClick={handleMockLogin}
                                    className="text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-full transition-colors"
                                >
                                    模拟登录
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full text-slate-300">禅修等级: {level}级</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-3 w-4/5 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mx-5 -mt-8 bg-slate-800 rounded-2xl p-4 shadow-lg flex justify-between items-center mb-6 border border-slate-700/50">
                <ActionButton icon={<Heart size={20} />} label="心愿单" color="text-pink-400" bg="bg-pink-500/10" />
                <ActionButton icon={<Share2 size={20} />} label="分享" color="text-emerald-400" bg="bg-emerald-500/10" />
                <ActionButton icon={<Star size={20} />} label="收藏" color="text-blue-400" bg="bg-blue-500/10" />
                <ActionButton icon={<Gift size={20} />} label="礼品" color="text-purple-400" bg="bg-purple-500/10" />
            </div>

            {/* Menu List */}
            <div className="px-5 space-y-3">
                <MenuLink to="/skins" icon={<Palette size={18} />} label="木鱼皮肤" color="bg-indigo-500/10 text-indigo-400" />
                <MenuLink to="/settings" icon={<Volume2 size={18} />} label="声音设置" color="bg-purple-500/10 text-purple-400" />
                <MenuLink to="/auto-settings" icon={<Zap size={18} />} label="自动木鱼" color="bg-emerald-500/10 text-emerald-400" />

                <div className="my-2 border-b border-slate-800" />

                <MenuLink to="#" icon={<HelpCircle size={18} />} label="帮助中心" color="bg-blue-500/10 text-blue-400" />
                <MenuLink to="#" icon={<MessageSquare size={18} />} label="评价应用" color="bg-amber-500/10 text-amber-400" />
                <MenuLink to="#" icon={<Settings size={18} />} label="通用设置" color="bg-slate-700 text-slate-400" />
            </div>

            <div className="text-center mt-8 text-xs text-slate-600">
                版本 1.0.0
                <br />
                © 2025 心安木鱼
            </div>
        </div>
    );
};

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, color: string, bg: string }> = ({ icon, label, color, bg }) => (
    <button className="flex flex-col items-center gap-1 active:opacity-70 transition-opacity">
        <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", bg, color)}>
            {icon}
        </div>
        <span className="text-[10px] font-medium text-slate-400">{label}</span>
    </button>
);

const MenuLink: React.FC<{ to: string, icon: React.ReactNode, label: string, color: string }> = ({ to, icon, label, color }) => (
    <Link to={to} className="bg-slate-800 border border-slate-700/50 p-4 rounded-xl flex items-center gap-4 active:scale-95 transition-transform hover:bg-slate-750">
        <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center", color)}>
            {icon}
        </div>
        <span className="flex-1 text-sm font-bold text-slate-200">{label}</span>
        <ChevronRight size={16} className="text-slate-600" />
    </Link>
);
