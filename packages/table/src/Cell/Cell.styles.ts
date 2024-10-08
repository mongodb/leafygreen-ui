import { css } from '@leafygreen-ui/emotion';
import { spacing, typeScales } from '@leafygreen-ui/tokens';

import { Align } from './Cell.types';

/** The base left & right padding in the table */
export const baseTableSidePadding = spacing[4];

/** the default width of the expand icon */
const iconSize = 28;

/** the default height of a cell */
export const standardCellHeight = spacing[5] + spacing[2];

export const baseCellStyles = css`
  padding: 0 8px;
  overflow: hidden;

  &:focus-visible {
    box-shadow: inset;
  }

  &:last-child {
    padding-right: ${baseTableSidePadding}px;
  }
`;

export const alignmentStyles = (align: Align = 'left') => css`
  justify-content: ${align};
  text-align: ${align};
`;

export const getCellPadding = ({
  depth = 0,
  isExpandable,
  isSelectable,
}: {
  depth?: number;
  isExpandable?: boolean;
  isSelectable?: boolean;
}) => {
  if (depth === 0) {
    if (isSelectable) {
      return css`
        padding-left: ${spacing[2]}px;
        padding-right: ${spacing[2]}px;
      `;
    } else {
      return css`
        padding-left: ${baseTableSidePadding +
        (isExpandable ? 0 : spacing[2])}px;
      `;
    }
  }

  const parentIconsPadding = 8 * (depth - 1); // how much space do parent icons take up
  const thisIconPadding = isExpandable ? spacing[2] : 0;
  const depthPadding =
    iconSize * depth - (parentIconsPadding + thisIconPadding);
  return css`
    padding-left: ${baseTableSidePadding + depthPadding}px;
  `;
};

export const basicCellStyles = css`
  &:first-child {
    ${getCellPadding({
      depth: 0,
      isExpandable: false,
      isSelectable: false,
    })}
  }
`;

export const cellTransitionContainerStyles = css`
  display: flex;
  align-items: center;
  min-height: ${standardCellHeight}px;
  overflow: hidden;
  max-height: ${standardCellHeight}px;
`;

export const truncatedContentStyles = css`
  /* See https://css-tricks.com/line-clampin/#aa-the-standardized-way */
  display: -webkit-box;
  -webkit-line-clamp: ${standardCellHeight / typeScales.body1.lineHeight};
  -webkit-box-orient: vertical;
  -webkit-box-align: start;
`;

export const disableAnimationStyles = css`
  transition-duration: 0;
  transition: none;
`;
