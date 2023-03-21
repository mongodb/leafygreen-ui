import { css } from '@leafygreen-ui/emotion';

import { Align } from './HeaderCell.types';

export const baseStyles = css`
  vertical-align: middle;
  &:first-child {
    padding-left: 24px;
  }
  &:last-child {
    padding-right: 24px;
  }
`;

export const contentContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

export const alignmentStyles = (align: Align) => css`
  justify-content: ${align};
`;

export const setWidth = (size: number) => css`
  width: ${size}px;
`;
