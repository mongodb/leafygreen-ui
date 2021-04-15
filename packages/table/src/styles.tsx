import { css } from '@leafygreen-ui/emotion';

const sharedStyles = css`
  min-width: 40px;
  padding: 8px 8px;
  box-sizing: border-box;
  vertical-align: middle;
`;

export const getCommonCellStyles = (baseFontSize: 14 | 16) => {
  if (baseFontSize === 14) {
    return css`
      ${sharedStyles}
      font-size: 14px;
      line-height: 20px;
    `;
  }

  return css`
    ${sharedStyles}
    font-size: 16px;
    line-height: 24px;
  `;
};
