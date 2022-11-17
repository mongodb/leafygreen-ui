import { css } from '@leafygreen-ui/emotion';

const sharedStyles = css`
  --lg-cell-padding-block: 10px;
  min-width: 40px;
  padding: var(--lg-cell-padding-block) 8px;
  box-sizing: border-box;
  vertical-align: baseline;
  text-align: left; // Justification is updated in \`Row.tsx\` for number cells
`;

export const getCommonCellStyles = (baseFontSize: 13 | 16): string => {
  if (baseFontSize === 16) {
    return css`
      ${sharedStyles}
      font-size: 16px; //TODO: use tokens
      line-height: 24px;
    `;
  }

  return css`
    ${sharedStyles}
    font-size: 13px;
    line-height: 20px;
  `;
};
