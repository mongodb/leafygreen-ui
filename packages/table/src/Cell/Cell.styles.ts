import { TransitionStatus } from 'react-transition-group';

import { css } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { Align } from './HeaderCell/HeaderCell.types';

/** The base left & right padding in the table */
const baseTableSidePadding = spacing[4];

/** the default width of the expand icon */
const iconSize = 28;

export const baseCellStyles = css`
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:focus-visible {
    box-shadow: inset;
  }
  &:last-child {
    padding-right: ${baseTableSidePadding}px;
  }
`;

const flexAlignment: Record<string, string> = {
  left: 'start',
  right: 'end',
  center: 'center',
};

export const alignmentStyles = (align: Align = 'left') => css`
  justify-content: ${flexAlignment[align]};
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
        padding-left: 8px;
        padding-right: 8px;
      `;
    } else {
      return css`
        padding-left: ${baseTableSidePadding + (isExpandable ? 0 : 8)}px;
      `;
    }
  }

  const parentIconsPadding = 8 * (depth - 1); // how much space do parent icons take up
  const thisIconPadding = isExpandable ? 8 : 0;
  const depthPadding =
    iconSize * depth - (parentIconsPadding + thisIconPadding);
  return css`
    padding-left: ${baseTableSidePadding + depthPadding}px;
  `;
};

export const cellContentContainerStyles = css`
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: min-height, max-height, opacity;
`;

const _hiddenStyles = css`
  opacity: 0;
  min-height: 0;
  max-height: 0;
`;

export const cellContentTransitionStyles: Record<TransitionStatus, string> = {
  entered: css`
    opacity: 1;
    min-height: ${spacing[5] + spacing[2]}px;
    max-height: ${spacing[5] + spacing[2]}px;
  `,
  entering: _hiddenStyles,
  exiting: _hiddenStyles,
  exited: _hiddenStyles,
  unmounted: _hiddenStyles,
};
