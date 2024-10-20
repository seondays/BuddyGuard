import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *,*::before,*::after{
    box-sizing: border-box;
    color: ${theme.colorValues.grayscale[800]};
  }
  a {
    text-decoration: none;
  }

  #root:hover,
  #root:focus {
    background-color: transparent !important;
  }
`;
