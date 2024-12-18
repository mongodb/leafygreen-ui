import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import {
  getBaseCellStyles,
  getCellContainerStyles,
  getCellPadding,
} from '../Cell.styles';
import { Align } from '../Cell.types';

export const headerCellContentStyles = css`
  height: ${spacing[800] + spacing[200]}px;
`;

export const getBaseHeaderCellStyles = (size: number, isSelectable?: boolean) =>
  cx(
    getBaseCellStyles(),
    css`
      &:first-of-type {
        ${getCellPadding({ depth: 0, isExpandable: false, isSelectable })}
      }

      line-height: 16px;
    `,
    {
      [css`
        width: ${size}px;
      `]: !!size,
    },
  );

export const getHeaderCellContentStyles = (align: Align) =>
  cx(getCellContainerStyles(align), headerCellContentStyles);
