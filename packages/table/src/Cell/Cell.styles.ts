import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { Align } from '../HeaderCell/HeaderCell.types';

const baseSidePadding = spacing[4];

const expandIconSize = 28;

export const baseStyles = css`
  padding: 0;
  &:focus-visible {
    box-shadow: inset;
  }
  /* &:first-child {
    padding-left: ${baseSidePadding}px;
  } */
  &:last-child {
    padding-right: ${baseSidePadding}px;
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

export const depthPadding = (depth = 0, isExpandable = false) => css`
  padding-left: ${Math.max(isExpandable ? 0 : expandIconSize, 16 * depth)}px;
`;

export const cellContentContainerStyles = css`
  display: flex;
  align-items: center;
  min-height: ${spacing[5] + spacing[2]}px;
  /* padding: 10px 8px; */
`;

export const subRowStyles = css`
  transition: all 0.2s ease-in;
`;

export const hiddenSubRowStyles = css`
  min-height: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  margin: 0;
`;
