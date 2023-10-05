import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const footerStyles = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: ${spacing[2] + spacing[1]}px;
  border-block-start: 1px solid ${palette.gray.light2};
`;

export const clearButtonStyles = css`
  outline: none;
  border: none;
  background-color: unset;
  z-index: 0;
`;
