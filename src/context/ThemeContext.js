import React, { createContext, useContext, useState, useEffect } from 'react';
import logger from '@/utils/logger';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [logged, isLogged] = useState(false);

  useEffect(() => {
    logger.info(`User logged : ${logged}`);
  }, []);

  const isLoggedLog = (state) => {
    logger.info(
      `User state changed to : ${state ? 'Connected' : 'Deconnected'}`
    );
    isLogged(state);
  };

  return (
    <ThemeContext.Provider
      value={{
        logged,
        isLogged: isLoggedLog,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
