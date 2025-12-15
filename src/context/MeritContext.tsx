import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

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
        const saved = localStorage.getItem('merit_today');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [autoEnabled, setAutoEnabled] = useState(false);

    // User Identity for API
    const [userId, setUserId] = useState<number | null>(null);

    // Init API login
    useEffect(() => {
        let deviceId = localStorage.getItem('device_id');
        if (!deviceId) {
            deviceId = 'dev_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('device_id', deviceId);
        }

        api.login(deviceId).then(res => {
            if (res.user) {
                setUserId(res.user.id);
                // Sync remote stats if they are higher (simple conflict resolution)
                if (res.user.stats) {
                    setMerit(prev => Math.max(prev, res.user.stats.totalMerit));
                    setTodayMerit(prev => Math.max(prev, res.user.stats.todayMerit));
                }
            }
        }).catch(err => console.error("Login failed", err));
    }, []);

    // Sync to server periodically
    useEffect(() => {
        if (!userId) return;

        const sync = () => {
            api.sync(userId, merit, todayMerit)
                .catch(e => console.error("Sync failed", e));
        };

        const timer = setInterval(sync, 10000); // Sync every 10s
        window.addEventListener('beforeunload', sync); // Sync on close

        return () => {
            clearInterval(timer);
            window.removeEventListener('beforeunload', sync);
        };
    }, [userId, merit, todayMerit]);

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
