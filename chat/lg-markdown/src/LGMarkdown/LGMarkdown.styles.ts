import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;

  ol,
  ul {
    padding-inline-start: ${spacing[300]}px;
    display: flex;
    flex-direction: column;
    gap: ${spacing[200]}px;
  }
`;
