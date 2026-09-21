import React, { createContext, useContext, useState, useEffect } from "react";

interface SplashContextType {
  showSplash: boolean;
  completeSplash: () => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash has been shown before in this session
    const hasShownSplash = sessionStorage.getItem("splashShown");
    return !hasShownSplash;
  });

  const completeSplash = () => {
    setShowSplash(false);
    sessionStorage.setItem("splashShown", "true");
  };

  return (
    <SplashContext.Provider value={{ showSplash, completeSplash }}>
      {children}
    </SplashContext.Provider>
  );
};

export const useSplash = () => {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error("useSplash must be used within SplashProvider");
  }
  return context;
};
