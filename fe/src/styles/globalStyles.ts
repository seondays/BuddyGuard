import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';
import '@/styles/fonts.css';

export const GlobalStyles = createGlobalStyle`
  *,*::before,*::after{
    box-sizing: border-box;
    color: ${theme.colorValues.grayscale[700]};
  }
  a {
    text-decoration: none;
  }

  #root {
    font-family: 'HakgyoansimDunggeunmisoTTF-B', sans-serif;  
  }

`;
