import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Align } from '../HeaderCell/types';

const baseSidePadding = spacing[4];

export const baseStyles = css`
  &:first-child {
    padding-left: ${baseSidePadding}px;
  }
  &:last-child {
    padding-right: ${baseSidePadding}px;
  }
`;

export const alignmentStyles = (align: Align) =>
  css`
    text-align: ${align};
  `;

export const depthPadding = (depth: number) => css`
  padding-left: ${16 * depth}px;
`;

export const cellContentContainerStyles = css`
  display: flex;
  align-items: center;
  padding: 10px 8px;
`;