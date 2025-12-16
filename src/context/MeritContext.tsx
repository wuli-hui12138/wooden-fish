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
    user: any | null; // Placeholder for user object
    login: (userInfo?: { nickname?: string, avatarUrl?: string }) => Promise<void>;
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

    // User Identity
    const [user, setUser] = useState<any | null>(null);

    const login = async (userInfo?: { nickname?: string, avatarUrl?: string }) => {
        let deviceId = localStorage.getItem('device_id');
        if (!deviceId) {
            deviceId = 'dev_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('device_id', deviceId);
        }

        try {
            const res = await api.login(deviceId, userInfo?.nickname, userInfo?.avatarUrl);
            if (res.user) {
                setUser(res.user);
                // Sync remote stats if they are higher
                if (res.user.stats) {
                    setMerit(prev => Math.max(prev, res.user.stats.totalMerit));
                    setTodayMerit(prev => Math.max(prev, res.user.stats.todayMerit));
                }
            }
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    // Init API login on mount
    useEffect(() => {
        login();
    }, []);

    // Sync to server periodically
    useEffect(() => {
        if (!user || !user.id) return;

        const sync = () => {
            api.sync(user.id, merit, todayMerit)
                .catch(e => console.error("Sync failed", e));
        };

        const timer = setInterval(sync, 10000); // Sync every 10s
        window.addEventListener('beforeunload', sync); // Sync on close

        return () => {
            clearInterval(timer);
            window.removeEventListener('beforeunload', sync);
        };
    }, [user, merit, todayMerit]);

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
            updateSettings,
            user,
            login
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
