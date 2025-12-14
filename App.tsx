import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/ThemeContext';
import { SoundProvider } from './contexts/SoundContext';
import MainLayout from './layout/MainLayout';
import Welcome from './pages/Welcome';
import Intro from './pages/Intro';
import Identity from './pages/Identity';
import Skills from './pages/Skills';
import Grammar from './pages/Grammar';
import Detector from './pages/Detector';
import Cooler from './pages/Cooler';

const App: React.FC = () => {
  return (
    <AppProvider>
      <SoundProvider>
        <HashRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/identity" element={<Identity />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/grammar" element={<Grammar />} />
              <Route path="/interrogation" element={<Detector />} />
              <Route path="/cooler" element={<Cooler />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </SoundProvider>
    </AppProvider>
  );
};

export default App;