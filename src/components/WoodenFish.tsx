import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { useMerit } from '../context/MeritContext';

// Simple Audio Context for "Knock" sound
// Using a synthesized sound for now to avoid external assets initially
const playKnockSound = (volume: number, pitch = 1.0) => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Wooden fish sound simulation: decay sine wave with some noise ideally, 
        // but simple sine/triangle with quick decay works as placeholder.
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800 * pitch, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(volume / 100, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
        console.error("Audio error", e);
    }
};

export const WoodenFish: React.FC = () => {
    const { addMerit, settings } = useMerit();
    const [scale, setScale] = useState(1);
    // Removed unused ripples state
    const [floats, setFloats] = useState<{ id: number }[]>([]);

    // Auto-reset scale
    useEffect(() => {
        if (scale < 1) {
            const t = setTimeout(() => setScale(1), 100);
            return () => clearTimeout(t);
        }
    }, [scale]);

    const handleTap = () => {
        // Animation effects
        setScale(0.95);

        // Sound
        if (!settings.silentMode) {
            playKnockSound(settings.volume);
        }

        // Logic
        addMerit(1);

        // Visuals
        const id = Date.now();
        setFloats(prev => [...prev, { id }]);

        // Cleanup visuals
        setTimeout(() => {
            setFloats(prev => prev.filter(f => f.id !== id));
        }, 1000);
    };

    return (
        <div className="relative flex flex-col items-center justify-center py-10">
            {/* Floating Text Container */}
            <div className="absolute top-0 w-full h-full pointer-events-none overflow-hidden">
                {floats.map(f => (
                    <div
                        key={f.id}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 text-white font-bold text-2xl animate-float-up"
                    >
                        功德 +1
                    </div>
                ))}
            </div>

            {/* The Fish */}
            <button
                onClick={handleTap}
                className="relative z-10 w-64 h-64 transition-transform duration-100 ease-out focus:outline-none touch-manipulation"
                style={{ transform: `scale(${scale})` }}
            >
                <img
                    src={`/skins/${settings.skin}.png`}
                    alt="Wooden Fish"
                    className="w-full h-full object-contain drop-shadow-2xl select-none"
                    draggable={false}
                />
            </button>
            <style>{`
                @keyframes float-up {
                    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                    20% { transform: translate(-50%, -150%) scale(1.2); opacity: 1; }
                    100% { transform: translate(-50%, -300%) scale(1); opacity: 0; }
                }
                .animate-float-up {
                    animation: float-up 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
