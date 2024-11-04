import { css } from 'styled-components';

export const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const flexRowCenter = css`
  ${flexRow}
  align-items: center;
  justify-content: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexColumnCenter = css`
  ${flexColumn}
  align-items: center;
  justify-content: center;
`;

/* iOS에서 화면 꽉 채우기 */
export const fillAvailable = css`
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;
