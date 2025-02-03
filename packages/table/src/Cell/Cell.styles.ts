import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { VerticalAlignment } from '../Table/Table.types';

import { Align } from './Cell.types';

/** The base left & right padding in the table */
export const baseTableSidePadding = spacing[600];

/** the default width of the expand icon */
const iconSize = 28;

/** the default height of a cell */
export const standardCellHeight = spacing[5] + spacing[2];

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
        padding-left: ${spacing[200]}px;
        padding-right: ${spacing[200]}px;
      `;
    } else {
      return css`
        padding-left: ${baseTableSidePadding +
        (isExpandable ? 0 : spacing[200])}px;
      `;
    }
  }

  const parentIconsPadding = 8 * (depth - 1); // how much space do parent icons take up
  const thisIconPadding = isExpandable ? spacing[200] : 0;
  const depthPadding =
    iconSize * depth - (parentIconsPadding + thisIconPadding);
  return css`
    padding-left: ${baseTableSidePadding + depthPadding}px;
  `;
};

export const getCellStyles = (
  depth = 0,
  isExpandable = false,
  isSelectable = false,
) => css`
  &:first-child {
    ${getCellPadding({
      depth,
      isExpandable,
      isSelectable,
    })}
  }
`;

export const getCellContainerStyles = (align: Align = 'left') => css`
  display: flex;
  align-items: center;
  min-height: ${standardCellHeight}px;
  /* overflow: hidden; */
  justify-content: ${align};
  text-align: ${align};

  > div {
    justify-content: ${align};
  }
`;

export const getBaseCellStyles = (
  verticalAlignment: VerticalAlignment = VerticalAlignment.Top,
) => css`
  padding: 0 ${spacing[200]}px;
  /* overflow: hidden; */
  vertical-align: ${verticalAlignment};

  &:focus-visible {
    box-shadow: inset;
  }

  &:last-child {
    padding-right: ${baseTableSidePadding}px;
  }
`;

export const cellInnerStyles = css`
  display: flex;
  align-items: center;
  min-width: 100%;
`;

export const getCellEllipsisStyles = ({
  shouldTruncate,
  overrideTruncation,
}: {
  shouldTruncate: boolean;
  overrideTruncation: boolean;
}) =>
  cx({
    [css`
      flex: 1;
      overflow: ${overrideTruncation ? 'unset' : 'hidden'};
      white-space: nowrap;
      text-overflow: ellipsis;
      contain: inline-size; // 🤯
    `]: shouldTruncate,
  });
