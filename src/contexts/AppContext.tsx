import React, { createContext, useContext, useEffect, useState } from 'react';

type ProgressContextType = {
  achievements: string[];
  addAchievement: (simulationId: string) => void;
  resetProgress: () => void;
  isPresentationMode: boolean;
  togglePresentationMode: () => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<string[]>([]);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('zerde_achievements');
    if (saved) {
      setAchievements(JSON.parse(saved));
    }
  }, []);

  const addAchievement = (simulationId: string) => {
    setAchievements((prev) => {
      if (prev.includes(simulationId)) return prev;
      const next = [...prev, simulationId];
      localStorage.setItem('zerde_achievements', JSON.stringify(next));
      return next;
    });
  };

  const resetProgress = () => {
    setAchievements([]);
    localStorage.removeItem('zerde_achievements');
  };

  const togglePresentationMode = () => {
    setIsPresentationMode(!isPresentationMode);
    if (!isPresentationMode) {
      document.documentElement.classList.add('presentation-mode');
    } else {
      document.documentElement.classList.remove('presentation-mode');
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        achievements,
        addAchievement,
        resetProgress,
        isPresentationMode,
        togglePresentationMode,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
