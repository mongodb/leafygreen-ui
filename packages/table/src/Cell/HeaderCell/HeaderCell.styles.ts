import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { getCellPadding } from '../Cell.styles';

export const headerCellContentStyles = css`
  height: ${spacing[5] + spacing[2]}px;
`;

export const getHeaderCellWidthStyles = (size: number) => css`
  width: ${size}px;
`;

export const getCellPaddingStyles = (isSelectable?: boolean) => css`
  &:first-of-type {
    ${getCellPadding({ depth: 0, isExpandable: false, isSelectable })}
  }
`;
