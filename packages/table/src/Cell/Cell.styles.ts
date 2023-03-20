import { TransitionStatus } from 'react-transition-group';

import { css } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { Align } from '../HeaderCell/HeaderCell.types';

const baseSidePadding = spacing[4];

const expandIconSize = 28;

export const baseCellStyles = css`
  padding: 0;

  &:focus-visible {
    box-shadow: inset;
  }
  &:last-child {
    padding-right: ${baseSidePadding}px;
  }
`;

export const cellTransitionStyles: Record<TransitionStatus, string> = {
  entering: css`
    opacity: 1;
    min-height: ${spacing[5] + spacing[2]}px;
    max-height: ${spacing[5] + spacing[2]}px;
  `,
  entered: css``,
  exiting: css``,
  exited: css``,
  unmounted: css``,
};

const flexAlignment: Record<string, string> = {
  left: 'start',
  right: 'end',
  center: 'center',
};

export const alignmentStyles = (align: Align = 'left') => css`
  justify-content: ${flexAlignment[align]};
`;

export const depthPadding = (depth = 0, isExpandable = false) => css`
  padding-left: ${Math.max(isExpandable ? 0 : expandIconSize, 16 * depth)}px;
`;

export const cellContentContainerStyles = css`
  display: flex;
  align-items: center;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: min-height, max-height, opacity;
`;

export const cellContentTransitionStyles: Record<TransitionStatus, string> = {
  entering: css`
    opacity: 0;
    min-height: 0;
    max-height: 0;
  `,
  entered: css`
    opacity: 1;
    min-height: ${spacing[5] + spacing[2]}px;
    max-height: ${spacing[5] + spacing[2]}px;
  `,
  exiting: css`
    opacity: 0;
    min-height: 0;
    max-height: 0;
  `,
  exited: css`
    opacity: 0;
    min-height: 0;
    max-height: 0;
  `,
  unmounted: css``,
};
