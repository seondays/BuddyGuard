import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorValues: {
      grayscale: Record<number, string>;
      accent: Record<number, string>;
      widget: Record<string, string>;
      special: Record<number, string>;
      social: Record<number, string>;
    };

    lightTheme: Record<string, string>;

    darkTheme: Record<string, string>;

    typography: {
      small: string;
      medium: string;
      large: string;
    };
    radius: {
      small: string;
      medium: string;
      large: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
