import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const headerCellContentStyles = css`
  height: ${spacing[5] + spacing[2]}px;
`;

export const getHeaderCellWidthStyles = (size: number) => css`
  width: ${size}px;
`;
