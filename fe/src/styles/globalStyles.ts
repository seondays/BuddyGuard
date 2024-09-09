import { createGlobalStyle } from 'styled-components';

import theme from './theme';

export const GlobalStyles = createGlobalStyle`
*,*::before,*::after{
  box-sizing: border-box;
  color: ${theme.colorValues.grayscale[800]};
}
`;
