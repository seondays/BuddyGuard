import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme as themeValues } from '../src/styles/theme';

const { lightTheme, darkTheme } = themeValues;

interface StorybookThemeWrapperProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
}

export const StorybookThemeProvider: React.FC<StorybookThemeWrapperProps> = ({ children, isDarkMode = false }) => {
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const completeTheme = {
    currentTheme,
    isDarkMode,
    toggleDarkMode: () => {}, // NOTE: 스토리북에서는 실제로 토글할 필요가 없으므로 빈 함수로 둠
    themeValues,
  };

  return <ThemeProvider theme={completeTheme}>{children}</ThemeProvider>;
};
