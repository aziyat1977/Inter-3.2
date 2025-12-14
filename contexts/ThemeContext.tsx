import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, UserMode } from '../types';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  isTeacher: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [userMode, setUserMode] = useState<UserMode>(UserMode.STUDENT);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  const isDark = theme === Theme.DARK;
  const isTeacher = userMode === UserMode.TEACHER;

  return (
    <AppContext.Provider value={{ theme, toggleTheme, isDark, userMode, setUserMode, isTeacher }}>
      {children}
    </AppContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useTheme must be used within an AppProvider');
  return context;
};