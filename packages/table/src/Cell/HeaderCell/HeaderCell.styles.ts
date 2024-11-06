import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import {
  baseCellStyles,
  getCellContainerStyles,
  getCellPadding,
} from '../Cell.styles';
import { Align } from '../Cell.types';

export const headerCellContentStyles = css`
  height: ${spacing[800] + spacing[200]}px;
`;

export const getBaseHeaderCellStyles = (size: number, isSelectable?: boolean) =>
  cx(
    baseCellStyles,
    css`
      &:first-of-type {
        ${getCellPadding({ depth: 0, isExpandable: false, isSelectable })}
      }
    `,
    {
      [css`
        width: ${size}px;
      `]: !!size,
    },
  );

export const getHeaderCellContentStyles = (align: Align) =>
  cx(getCellContainerStyles(align), headerCellContentStyles);
