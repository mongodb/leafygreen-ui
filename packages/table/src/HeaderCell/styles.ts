import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Align } from './types';

export const baseStyles = css`
  border-bottom: 3px solid ${palette.gray.light2};
  color: ${palette.gray.dark3};
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

export const alignmentStyles = (align: Align) =>
  css`
    justify-content: ${align};
  `;
