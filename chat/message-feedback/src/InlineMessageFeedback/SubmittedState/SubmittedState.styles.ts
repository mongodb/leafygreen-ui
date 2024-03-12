import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  display: flex;
  gap: ${spacing[1]}px;
  align-items: center;
`;

export const bodyStyles = css`
  color: ${palette.gray.dark1};
`;
