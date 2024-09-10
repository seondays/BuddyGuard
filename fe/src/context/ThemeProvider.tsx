import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { theme as themeValues } from '../styles/theme';

const { lightTheme, darkTheme } = themeValues;

const initDarkMode = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(initDarkMode());
  const [currentTheme, setCurrentTheme] = useState(isDarkMode ? darkTheme : lightTheme);

  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);

  useEffect(() => {
    setCurrentTheme(isDarkMode ? darkTheme : lightTheme);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const completeTheme = {
    currentTheme,
    isDarkMode,
    toggleDarkMode,
    themeValues,
  };

  return <StyledThemeProvider theme={completeTheme}>{children}</StyledThemeProvider>;
}
