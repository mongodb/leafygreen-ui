import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { Align } from './HeaderCell.types';

export const headerCellContentStyles = css`
  height: ${spacing[5] + spacing[2]}px;
`;

export const cellContentAlignmentStyles = (align: Align) => css`
  justify-content: ${align};
`;

export const getHeaderCellWidthStyles = (size: number) => css`
  width: ${size}px;
`;
