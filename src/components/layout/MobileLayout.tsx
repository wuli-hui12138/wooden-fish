import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, BarChart2, Award, User } from 'lucide-react';
import { clsx } from 'clsx';
// import { useMerit } from '../../context/MeritContext';

// Define the layout structure
export const MobileLayout: React.FC = () => {
    // const { settings } = useMerit();

    // Determine background based on skin or theme if needed? 
    // For now we stick to white/slate as per design

    return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center font-sans select-none">
            {/* Mobile Container */}
            <div className="w-full max-w-[420px] h-[100dvh] bg-white shadow-2xl relative flex flex-col overflow-hidden">

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth no-scrollbar">
                    <Outlet />
                </main>

                {/* Bottom Navigation */}
                <nav className="h-[60px] bg-white border-t border-gray-100 flex justify-around items-center px-2 z-50">
                    <NavItem to="/home" icon={<Home size={24} />} label="首页" />
                    <NavItem to="/stats" icon={<BarChart2 size={24} />} label="统计" />
                    <NavItem to="/leaderboard" icon={<Award size={24} />} label="排行" />
                    <NavItem to="/profile" icon={<User size={24} />} label="我的" />
                </nav>
            </div>
        </div>
    );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                isActive ? "text-indigo-600" : "text-gray-400 hover:text-gray-500"
            )}
        >
            {icon}
            <span className="text-[10px] font-medium">{label}</span>
        </NavLink>
    );
};
