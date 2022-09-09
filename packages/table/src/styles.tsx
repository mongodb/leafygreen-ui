import { css } from '@leafygreen-ui/emotion';

const sharedStyles = css`
  --lg-cell-padding-block: 10px;
  min-width: 40px;
  padding: var(--lg-cell-padding-block) 8px;
  box-sizing: border-box;
  vertical-align: baseline;
  text-align: left; // Justification is updated in \`Row.tsx\` for number cells
`;

export const getCommonCellStyles = (
  baseFontSize: 14 | 16,
  darkMode?: boolean,
): string => {
  if (baseFontSize === 16) {
    return css`
      ${sharedStyles}
      font-size: 16px;
      line-height: 24px;
    `;
  }

  // TODO: Refresh - remove darkMode override
  if (darkMode) {
    return css`
      --lg-cell-padding-block: 8px;
      ${sharedStyles}
      font-size: 14px;
      line-height: 20px;
    `;
  }

  return css`
    ${sharedStyles}
    font-size: 13px;
    line-height: 20px;
  `;
};
