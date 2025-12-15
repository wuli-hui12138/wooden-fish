import React, { useEffect } from 'react';
import { Settings as SettingsIcon, Volume2 } from 'lucide-react';
import { useMerit } from '../context/MeritContext';
import { WoodenFish } from '../components/WoodenFish';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const { todayMerit, merit, autoEnabled, toggleAuto, addMerit } = useMerit();

    // Auto Tapping Logic
    useEffect(() => {
        let interval: any;
        if (autoEnabled) {
            interval = setInterval(() => {
                // Simulate a tap
                // We need to trigger the hook, but for now just add merit.
                // Ideally we trigger the visual effect too.
                // For MVP just add merit.
                addMerit(1);
            }, 1000); // 1 tap per second for "Normal" speed
        }
        return () => clearInterval(interval);
    }, [autoEnabled, addMerit]);

    return (
        <div className="h-full flex flex-col bg-indigo-600 text-white relative">
            {/* Header Section */}
            <div className="p-6 pt-10 flex justify-between items-start">
                <div className="flex flex-col gap-4 w-full">
                    {/* Counters */}
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col">
                            <span className="text-white/70 text-sm font-medium">今日功德</span>
                            <span className="text-3xl font-bold">{todayMerit} <span className="text-sm font-normal text-white/70">次</span></span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-white/70 text-sm font-medium">累计功德</span>
                            <span className="text-3xl font-bold">{merit.toLocaleString()} <span className="text-sm font-normal text-white/70">次</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Controls (Top Right Overlay) */}
            <div className="absolute top-36 right-4 flex flex-col gap-3">
                <Link to="/settings" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <SettingsIcon size={20} />
                </Link>
                <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Volume2 size={20} />
                </button>
            </div>


            {/* Main Content (Fish) */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
                {/* Center Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

                <WoodenFish />

                {/* +1 Badge Floating Logic moved to WoodenFish component */}
            </div>

            {/* Bottom Controls (Auto Mode) */}
            <div className="bg-white text-gray-800 rounded-t-3xl p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-700">自动模式</span>
                    </div>

                    {/* Toggle Switch */}
                    <button
                        onClick={() => toggleAuto(!autoEnabled)}
                        className={clsx(
                            "w-12 h-6 rounded-full relative transition-colors duration-300",
                            autoEnabled ? "bg-indigo-500" : "bg-gray-300"
                        )}
                    >
                        <div className={clsx(
                            "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-300 shadow-md",
                            autoEnabled ? "left-7" : "left-1"
                        )} />
                    </button>
                </div>

                {/* Speed Slider (Only visible/active if auto enabled) */}
                <div className={clsx("transition-opacity duration-300", autoEnabled ? "opacity-100" : "opacity-40 pointer-events-none")}>
                    <div className="relative h-2 bg-indigo-100 rounded-full mb-2">
                        <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full w-1/2" /> {/* Static 50% for now */}
                        {/* Slider Thumb */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 font-medium px-1">
                        <span>慢</span>
                        <span>中</span>
                        <span>快</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
