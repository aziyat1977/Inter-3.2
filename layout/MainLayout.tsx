import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../contexts/SoundContext';
import { Theme } from '../types';
import Background from '../components/Background';
import { Moon, Sun, ChevronRight, ChevronLeft, GraduationCap, Users, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const routes = [
  { path: '/', label: 'MODE' },
  { path: '/intro', label: 'INTRO' },
  { path: '/identity', label: 'ID' },
  { path: '/skills/intro', label: 'SKILLS' },
  { path: '/skills/multitasking', label: 'TASK' },
  { path: '/skills/pressure', label: 'PRESS' },
  { path: '/skills/problem-solving', label: 'SOLVE' },
  { path: '/skills/reliable', label: 'RELY' },
  { path: '/skills/quiz', label: 'QUIZ' },
  { path: '/grammar/intro', label: 'RULES' },
  { path: '/grammar/obligation', label: 'MUST' },
  { path: '/grammar/obligation-past', label: 'HAD TO' },
  { path: '/grammar/prohibition', label: 'MUSTN\'T' },
  { path: '/grammar/prohibition-past', label: 'COULDN\'T' },
  { path: '/grammar/optional', label: 'DON\'T' },
  { path: '/grammar/optional-past', label: 'DIDN\'T' },
  { path: '/grammar/error', label: 'ERROR' },
  { path: '/interrogation', label: 'DETECT' },
  { path: '/cooler', label: 'END' },
];

const MainLayout: React.FC = () => {
  const { theme, toggleTheme, userMode, isTeacher } = useTheme();
  const { playClick, playHover, toggleMute, isMuted } = useSound();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleMenuNavigate = (path: string) => {
    playClick();
    navigate(path);
    setIsMenuOpen(false);
  };

  const progress = ((currentIndex + 1) / routes.length) * 100;

  return (
    // THE ALGORITHM: h-[100dvh] ensures full viewport on all devices (address bars included)
    <div className={`h-[100dvh] w-screen overflow-hidden flex flex-col relative transition-colors duration-500 ${theme === Theme.DARK ? 'text-white' : 'text-slate-900'}`}>
      <Background />

      {/* Header - Fixed Height 80px */}
      <header className="shrink-0 h-[60px] md:h-[80px] w-full z-50 flex justify-between items-center px-4 md:px-6 backdrop-blur-none pointer-events-none relative">
        <div className="pointer-events-auto flex items-center gap-4">
            <button 
              onClick={() => { playClick(); setIsMenuOpen(true); }}
              className={`p-2 rounded-full hover:bg-white/10 transition-colors ${isTeacher ? 'text-neon-yellow hover:text-white' : 'text-neon-cyan hover:text-white'}`}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <span className={`text-base md:text-2xl font-display font-bold ${isTeacher ? 'text-neon-yellow' : 'text-neon-cyan'}`}>
                {isTeacher ? 'TEACHER_OS' : 'IMPOSTER_V1'}
            </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 md:gap-4">
          {userMode !== null && location.pathname !== '/' && (
            <div className="hidden md:flex px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest border border-white/20 bg-white/5 items-center gap-2">
              {isTeacher ? <GraduationCap size={14} /> : <Users size={14} />}
              {userMode}
            </div>
          )}
          
          <button
            onClick={() => { playClick(); toggleMute(); }}
            onMouseEnter={playHover}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
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

      {/* Navigation Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 left-0 h-full w-80 max-w-[80vw] z-[70] p-6 overflow-y-auto border-r border-white/10 shadow-2xl ${
                theme === Theme.DARK ? 'bg-[#050505]/95' : 'bg-slate-50/95'
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className={`font-display font-bold text-xl tracking-widest ${isTeacher ? 'text-neon-yellow' : 'text-neon-cyan'}`}>
                  NAVIGATION
                </h3>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {routes.map((route, index) => {
                  const isActive = location.pathname === route.path;
                  return (
                    <button
                      key={route.path}
                      onClick={() => handleMenuNavigate(route.path)}
                      onMouseEnter={playHover}
                      className={`text-left px-4 py-3 rounded-lg font-display text-sm tracking-widest transition-all ${
                        isActive 
                          ? `bg-${isTeacher ? 'neon-yellow' : 'neon-cyan'}/20 text-${isTeacher ? 'neon-yellow' : 'neon-cyan'} border border-${isTeacher ? 'neon-yellow' : 'neon-cyan'}/50` 
                          : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="opacity-50 mr-3 text-xs">{String(index).padStart(2, '0')}</span>
                      {route.label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area - THE ENGINE */}
      {/* flex-grow ensures it fills exactly the space between header and footer */}
      {/* overflow-y-auto custom-scroll allows internal scrolling if needed, but we try to fit */}
      <main className="flex-grow flex flex-col relative z-10 w-full overflow-y-auto custom-scroll overflow-x-hidden">
        <div className="flex-grow flex flex-col items-center justify-center p-2 md:p-4 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation - Fixed Height */}
      {location.pathname !== '/' && (
        <footer className="shrink-0 h-[70px] md:h-[90px] w-full z-40 p-4 md:p-6 flex justify-between items-center pointer-events-none bg-gradient-to-t from-black/80 to-transparent">
          <button
            onClick={handlePrev}
            onMouseEnter={playHover}
            disabled={!prevRoute}
            className={`pointer-events-auto flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-display text-xs md:text-sm font-bold tracking-widest transition-all ${
              !prevRoute ? 'opacity-0' : 'hover:bg-white/10 text-gray-400 hover:text-white backdrop-blur-sm bg-black/20'
            }`}
          >
            <ChevronLeft size={16} /> <span className="hidden md:inline">PREV</span>
          </button>

          <div className="w-1/3 md:w-1/4 h-1 bg-gray-800 rounded-full overflow-hidden mx-4">
             <div 
                className="h-full bg-neon-cyan transition-all duration-500 shadow-[0_0_10px_#00f3ff]"
                style={{ width: `${progress}%` }}
             />
          </div>

          <button
            onClick={handleNext}
            onMouseEnter={playHover}
            disabled={!nextRoute}
            className={`pointer-events-auto flex items-center gap-2 px-4 py-2 md:px-8 md:py-3 rounded-lg font-display text-xs md:text-sm font-bold tracking-widest transition-all ${
              !nextRoute 
              ? 'opacity-0' 
              : 'bg-white text-black hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] shadow-lg'
            }`}
          >
             <span className="hidden md:inline">NEXT</span> <ChevronRight size={16} />
          </button>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;