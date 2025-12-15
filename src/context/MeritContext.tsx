import React, { createContext, useContext, useEffect, useState } from 'react';

export type Skin = 'classic' | 'gold' | 'jade' | 'crystal' | 'purple' | 'star';
export type Sound = 'classic' | 'bell' | 'bamboo' | 'keyboard';

interface Settings {
    volume: number;
    sound: Sound;
    skin: Skin;
    vibration: boolean;
    silentMode: boolean;
}

interface MeritContextType {
    merit: number;
    todayMerit: number;
    addMerit: (amount?: number) => void;
    autoEnabled: boolean;
    toggleAuto: (enabled: boolean) => void;
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const MeritContext = createContext<MeritContextType | undefined>(undefined);

export const MeritProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize state from localStorage or defaults
    const [merit, setMerit] = useState<number>(() => {
        const saved = localStorage.getItem('merit_total');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [todayMerit, setTodayMerit] = useState<number>(() => {
        // Basic day tracking check could be added here
        const saved = localStorage.getItem('merit_today');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [autoEnabled, setAutoEnabled] = useState(false);

    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('merit_settings');
        return saved ? JSON.parse(saved) : {
            volume: 80,
            sound: 'classic',
            skin: 'classic',
            vibration: true,
            silentMode: false
        };
    });

    // Persist State
    useEffect(() => {
        localStorage.setItem('merit_total', merit.toString());
    }, [merit]);

    useEffect(() => {
        localStorage.setItem('merit_today', todayMerit.toString());
    }, [todayMerit]);

    useEffect(() => {
        localStorage.setItem('merit_settings', JSON.stringify(settings));
    }, [settings]);

    const addMerit = (amount = 1) => {
        setMerit(prev => prev + amount);
        setTodayMerit(prev => prev + amount);
        // Here we would also play sound if not silent
    };

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const toggleAuto = (enabled: boolean) => {
        setAutoEnabled(enabled);
    };

    return (
        <MeritContext.Provider value={{
            merit,
            todayMerit,
            addMerit,
            autoEnabled,
            toggleAuto,
            settings,
            updateSettings
        }}>
            {children}
        </MeritContext.Provider>
    );
};

export const useMerit = () => {
    const context = useContext(MeritContext);
    if (context === undefined) {
        throw new Error('useMerit must be used within a MeritProvider');
    }
    return context;
};
