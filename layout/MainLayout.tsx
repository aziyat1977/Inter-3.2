import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../contexts/SoundContext';
import { UserMode, Theme } from '../types';
import Background from '../components/Background';
import { Moon, Sun, ChevronRight, ChevronLeft, GraduationCap, Users, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const routes = [
  { path: '/', label: 'MODE' },
  { path: '/intro', label: 'INTRO' },
  { path: '/identity', label: 'IDENTITY' },
  { path: '/skills', label: 'SKILLS' },
  { path: '/grammar', label: 'RULES' },
  { path: '/interrogation', label: 'DETECTOR' },
  { path: '/cooler', label: 'SURVIVE' },
];

const MainLayout: React.FC = () => {
  const { theme, toggleTheme, userMode, isTeacher } = useTheme();
  const { playClick, playHover, toggleMute, isMuted } = useSound();
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = routes.findIndex(r => r.path === location.pathname);
  const nextRoute = routes[currentIndex + 1];
  const prevRoute = routes[currentIndex - 1];

  const handleNext = () => {
    playClick();
    if (nextRoute) navigate(nextRoute.path);
  };

  const handlePrev = () => {
    playClick();
    if (prevRoute) navigate(prevRoute.path);
  };

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-500 ${theme === Theme.DARK ? 'text-white' : 'text-slate-900'}`}>
      <Background />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center p-6 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-2">
            <span className={`text-2xl font-display font-bold ${isTeacher ? 'text-neon-yellow' : 'text-neon-cyan'}`}>
                {isTeacher ? 'TEACHER_OS' : 'IMPOSTER_V1'}
            </span>
        </div>

        <div className="flex items-center gap-4">
          {userMode !== null && location.pathname !== '/' && (
            <div className="hidden md:flex px-3 py-1 rounded-full text-xs font-bold tracking-widest border border-white/20 bg-white/5 items-center gap-2">
              {isTeacher ? <GraduationCap size={14} /> : <Users size={14} />}
              {userMode}
            </div>
          )}
          
          <button
            onClick={() => { playClick(); toggleMute(); }}
            onMouseEnter={playHover}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button
            onClick={() => { playClick(); toggleTheme(); }}
            onMouseEnter={playHover}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {theme === Theme.DARK ? <Sun size={20} className="text-neon-yellow" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center relative z-10 pt-20 pb-24 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      {location.pathname !== '/' && (
        <footer className="fixed bottom-0 w-full z-40 p-6 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent backdrop-blur-md border-t border-white/5">
          <button
            onClick={handlePrev}
            onMouseEnter={playHover}
            disabled={!prevRoute}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-display text-sm font-bold tracking-widest transition-all ${
              !prevRoute ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <ChevronLeft /> PREV
          </button>

          <div className="flex gap-2">
            {routes.map((route, idx) => (
                idx > 0 && (
                    <div 
                        key={route.path}
                        className={`h-1 rounded-full transition-all duration-300 ${
                            idx === currentIndex 
                            ? 'w-8 bg-neon-cyan shadow-[0_0_10px_#00f3ff]' 
                            : idx < currentIndex 
                                ? 'w-2 bg-neon-cyan/50' 
                                : 'w-2 bg-gray-700'
                        }`}
                    />
                )
            ))}
          </div>

          <button
            onClick={handleNext}
            onMouseEnter={playHover}
            disabled={!nextRoute}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-display text-sm font-bold tracking-widest transition-all ${
              !nextRoute 
              ? 'opacity-50 grayscale' 
              : 'bg-white text-black hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]'
            }`}
          >
             NEXT <ChevronRight />
          </button>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;