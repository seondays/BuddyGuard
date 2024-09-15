import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    currentTheme: Record<string, string>;
    themeValues: {
      colorValues: {
        grayscale: Record<number, string>;
        accent: Record<string, string>;
        widget: Record<string, string>;
        special: Record<string, string>;
        social: Record<string, string>;
      };
      typography: Record<string, string>;
      radius: Record<string, string>;
      spacing: Record<string, string>;
      lightTheme: Record<string, string>;
      darkTheme: Record<string, string>;
    };
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }
}
