import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Align } from '../HeaderCell/HeaderCell.types';

const baseSidePadding = spacing[4];

export const baseStyles = css`
  &:focus-visible {
    box-shadow: inset;
  }
  &:first-child {
    padding-left: ${baseSidePadding}px;
  }
  &:last-child {
    padding-right: ${baseSidePadding}px;
  }
`;

const flexAlignment: Record<string, string> = {
  left: 'start',
  right: 'end',
  center: 'center',
};

export const alignmentStyles = (align: Align) => {
  if (align) {
    return css`
      justify-content: ${flexAlignment[align]};
    `;
  }
};

export const depthPadding = (depth: number) => css`
  padding-left: ${16 * depth}px;
`;

export const cellContentContainerStyles = css`
  display: flex;
  align-items: center;
  padding: 10px 8px;
`;
