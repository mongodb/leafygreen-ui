import { css } from '@leafygreen-ui/emotion';
import { Align } from '../HeaderCell/types';

export const baseStyles = css`
  padding: 10px 8px;
  &:first-child {
    padding-left: 24px;
  }
  &:last-child {
    padding-right: 24px;
  }
`;

export const alignmentStyles = (align: Align) =>
  css`
    text-align: ${align};
  `;

export const depthPadding = (depth: number) =>
  css`
    padding-left: ${16 * depth}px;
  `;