import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MeritProvider } from './context/MeritContext';
import { MobileLayout } from './components/layout/MobileLayout';
import { HomePage } from './pages/HomePage';
import { StatsPage } from './pages/StatsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SkinsPage } from './pages/SkinsPage';
import { SoundsPage } from './pages/SoundsPage';
import { AutoSettingsPage } from './pages/AutoSettingsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { IntroPage } from './pages/IntroPage';

function App() {
  return (
    <MeritProvider>
      <BrowserRouter>
        <Routes>
          {/* Intro Screen */}
          <Route path="/" element={<IntroPage />} />

          {/* Main App Layout */}
          <Route path="/home" element={<MobileLayout />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path="/stats" element={<MobileLayout />}>
            <Route index element={<StatsPage />} />
          </Route>
          <Route path="/achievements" element={<MobileLayout />}>
            <Route index element={<AchievementsPage />} />
          </Route>
          <Route path="/leaderboard" element={<MobileLayout />}>
            <Route index element={<LeaderboardPage />} />
          </Route>
          <Route path="/profile" element={<MobileLayout />}>
            <Route index element={<ProfilePage />} />
          </Route>

          {/* Direct Full Pages */}
          <Route path="/skins" element={<SkinsPage />} />
          <Route path="/settings" element={<SoundsPage />} />
          <Route path="/auto-settings" element={<AutoSettingsPage />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MeritProvider>
  );
}

export default App;
