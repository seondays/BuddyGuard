import React from 'react';
import type { Preview } from '@storybook/react';

import { GlobalStyles } from '../src/styles/globalStyles';
import { StorybookThemeProvider } from './StorybookThemeProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: ['light', 'dark'],
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, context) => (
    <StorybookThemeProvider isDarkMode={context.globals.theme === 'dark'}>
      <GlobalStyles />
      <Story />
    </StorybookThemeProvider>
  ),
];
export default preview;
