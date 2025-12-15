import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../contexts/SoundContext';
import { Theme } from '../types';
import Background from '../components/Background';
import { Moon, Sun, ChevronRight, ChevronLeft, GraduationCap, Users, Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const routes = [
  { path: '/', label: 'SYSTEM_LOGIN' },
  { path: '/intro', label: 'MISSION_BRIEF' },
  { path: '/identity', label: 'IDENTITY_SPOOF' },
  { path: '/skills/intro', label: 'SKILL_DOWNLOAD' },
  { path: '/skills/multitasking', label: 'SKILL_01: TASK' },
  { path: '/skills/pressure', label: 'SKILL_02: PRESS' },
  { path: '/skills/problem-solving', label: 'SKILL_03: SOLVE' },
  { path: '/skills/reliable', label: 'SKILL_04: RELY' },
  { path: '/skills/quiz', label: 'SKILL_VERIFY' },
  { path: '/grammar/intro', label: 'CORE_LOGIC' },
  { path: '/grammar/obligation', label: 'LOGIC: NOW' },
  { path: '/grammar/obligation-past', label: 'LOGIC: PAST' },
  { path: '/grammar/prohibition', label: 'LOGIC: BAN' },
  { path: '/grammar/prohibition-past', label: 'LOGIC: BAN_PAST' },
  { path: '/grammar/optional', label: 'LOGIC: OPT' },
  { path: '/grammar/optional-past', label: 'LOGIC: OPT_PAST' },
  { path: '/grammar/error', label: 'DEBUG_MODE' },
  { path: '/practice/intro', label: 'SIMULATION_INIT' },
  { path: '/practice/gap/1', label: 'SIM_01: BASIC' },
  { path: '/practice/gap/2', label: 'SIM_02: TEMPORAL' },
  { path: '/practice/gap/3', label: 'SIM_03: RESTRICT' },
  { path: '/practice/gap/4', label: 'SIM_04: OPTION' },
  { path: '/practice/gap/5', label: 'SIM_05: CHAOS' },
  { path: '/practice/quiz/1', label: 'CHECK_01: LOGIC' },
  { path: '/practice/quiz/2', label: 'CHECK_02: TIME' },
  { path: '/practice/quiz/3', label: 'CHECK_03: FORM' },
  { path: '/practice/quiz/4', label: 'CHECK_04: CTX' },
  { path: '/practice/quiz/5', label: 'CHECK_05: FINAL' },
  { path: '/interrogation', label: 'LIE_DETECTOR' },
  { path: '/cooler', label: 'SYSTEM_EXIT' },
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

  // Page Transition Variants
  const pageVariants = {
    initial: { opacity: 0, x: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: "circOut" } },
    exit: { opacity: 0, x: -20, filter: 'blur(10px)', transition: { duration: 0.3, ease: "circIn" } }
  };

  return (
    <div className={`h-[100dvh] w-screen overflow-hidden flex flex-col relative transition-colors duration-500 ${theme === Theme.DARK ? 'text-white' : 'text-slate-900'}`}>
      <Background />

      {/* Decorative Scan Lines (Overlay) */}
      <div className="fixed inset-0 pointer-events-none z-[5] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      
      {/* Header */}
      <header className="shrink-0 h-[60px] md:h-[80px] w-full z-50 flex justify-between items-center px-4 md:px-6 relative border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-black/20 backdrop-blur-sm transition-colors duration-500">
        <div className="flex items-center gap-4">
            <button 
              onClick={() => { playClick(); setIsMenuOpen(true); }}
              className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${isTeacher ? 'text-yellow-600 dark:text-neon-yellow' : 'text-cyan-600 dark:text-neon-cyan'}`}
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <span className={`text-base md:text-xl font-display font-bold leading-none ${isTeacher ? 'text-yellow-600 dark:text-neon-yellow' : 'text-cyan-600 dark:text-neon-cyan'}`}>
                  {isTeacher ? 'TEACHER_OS' : 'IMPOSTER_V1'}
              </span>
              <span className="text-[10px] opacity-50 font-mono tracking-widest hidden md:block">
                SYS.OBLIGATION.MODAL // {userMode || 'GUEST'}
              </span>
            </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {userMode && location.pathname !== '/' && (
            <div className={`hidden md:flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border items-center gap-2 ${isTeacher ? 'border-yellow-600/30 bg-yellow-600/10 text-yellow-600 dark:border-neon-yellow/30 dark:bg-neon-yellow/10 dark:text-neon-yellow' : 'border-cyan-600/30 bg-cyan-600/10 text-cyan-600 dark:border-neon-cyan/30 dark:bg-neon-cyan/10 dark:text-neon-cyan'}`}>
              {isTeacher ? <GraduationCap size={14} /> : <Users size={14} />}
              {userMode}
            </div>
          )}
          
          <button onClick={() => { playClick(); toggleMute(); }} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button onClick={() => { playClick(); toggleTheme(); }} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
            {theme === Theme.DARK ? <Sun size={20} className="text-neon-yellow" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
        </div>
      </header>

      {/* Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.nav
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-80 max-w-[80vw] z-[70] p-6 bg-slate-50 dark:bg-[#050505] border-r border-cyan-600/20 dark:border-neon-cyan/20 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2 text-cyan-700 dark:text-neon-cyan">
                  <Terminal size={20} />
                  <h3 className="font-display font-bold text-lg tracking-widest">NAV_SYSTEM</h3>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 dark:text-gray-400 hover:text-black dark:hover:text-white"><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-1">
                {routes.map((route, index) => (
                  <button
                    key={route.path}
                    onClick={() => handleMenuNavigate(route.path)}
                    className={`text-left px-4 py-3 rounded text-xs font-mono tracking-widest transition-all ${
                      location.pathname === route.path 
                        ? 'bg-cyan-600/10 dark:bg-neon-cyan/20 text-cyan-700 dark:text-neon-cyan border-l-2 border-cyan-600 dark:border-neon-cyan' 
                        : 'text-slate-500 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="opacity-30 mr-3">{String(index).padStart(2, '0')}</span>
                    {route.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Engine */}
      <main className="flex-grow flex flex-col relative z-10 w-full overflow-hidden">
        <div className="w-full h-full p-2 md:p-4 max-w-7xl mx-auto flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Controls */}
      {location.pathname !== '/' && (
        <footer className="shrink-0 h-[70px] md:h-[90px] w-full z-40 px-6 flex justify-between items-center bg-white/80 dark:bg-gradient-to-t dark:from-black dark:via-black/80 dark:to-transparent border-t border-black/5 dark:border-white/5 transition-colors duration-500">
          <button
            onClick={handlePrev}
            onMouseEnter={playHover}
            disabled={!prevRoute}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all ${
              !prevRoute ? 'opacity-0' : 'text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-neon-cyan hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <ChevronLeft size={16} /> BACK
          </button>

          <div className="flex flex-col items-center gap-1 w-1/3">
             <div className="w-full h-[2px] bg-slate-200 dark:bg-gray-800 relative overflow-hidden">
                <motion.div 
                   className="absolute top-0 left-0 h-full bg-cyan-600 dark:bg-neon-cyan shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_#00f3ff]"
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   transition={{ duration: 0.5 }}
                />
             </div>
             <span className="text-[8px] font-mono text-slate-400 dark:text-gray-500 tracking-[0.2em]">PROGRESS: {Math.round(progress)}%</span>
          </div>

          <button
            onClick={handleNext}
            onMouseEnter={playHover}
            disabled={!nextRoute}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-display text-sm font-bold tracking-widest transition-all ${
              !nextRoute 
              ? 'opacity-0' 
              : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-cyan-600 dark:hover:bg-neon-cyan hover:scale-105 shadow-lg'
            }`}
          >
             NEXT <ChevronRight size={16} />
          </button>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;