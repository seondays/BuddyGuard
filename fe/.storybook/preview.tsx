import React from 'react';
import type { Preview } from '@storybook/react';

import { GlobalStyles } from '../src/styles/globalStyles';
import { theme } from '../src/styles/theme';
import { ThemeProvider } from 'styled-components';

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

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
export default preview;
