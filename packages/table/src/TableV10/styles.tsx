import { css } from '@leafygreen-ui/emotion';
import { bodyTypeScaleStyles } from '@leafygreen-ui/typography';

const sharedStyles = css`
  --lg-cell-padding-block: 10px;
  min-width: 40px;
  padding: var(--lg-cell-padding-block) 8px;
  box-sizing: border-box;
  vertical-align: baseline;
  text-align: left; // Justification is updated in \`Row.tsx\` for number cells
`;

export const getCommonCellStyles = (baseFontSize: 13 | 16): string => {
  return css`
    ${sharedStyles}
    ${bodyTypeScaleStyles[baseFontSize]}
  `;
};
