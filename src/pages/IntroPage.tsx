import React from 'react';
import { useNavigate } from 'react-router-dom';

export const IntroPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full bg-slate-50 flex flex-col items-center justify-between py-20 px-6 font-sans">
            <div className="flex-1 flex flex-col items-center justify-center w-full">
                {/* Logo/Icon Area */}
                <div className="w-64 h-64 bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center mb-10 overflow-hidden">
                    {/* Placeholder for Intro Image */}
                    <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                        🐟
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">安心木鱼</h1>
                <p className="text-gray-500 text-center max-w-xs leading-relaxed">
                    放松心灵，享受平静，积累功德
                </p>
            </div>

            <div className="w-full space-y-6">
                <button
                    onClick={() => navigate('/home')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-full shadow-xl shadow-indigo-200 transition-all active:scale-95"
                >
                    开始体验
                </button>
                <div className="text-center text-xs text-gray-400">
                    轻松开始，感受内心的宁静
                </div>
            </div>
        </div>
    );
};
