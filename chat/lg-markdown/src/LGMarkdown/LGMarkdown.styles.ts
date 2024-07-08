import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  h1 + *,
  h2 + *,
  h3 + * {
    margin-top: ${spacing[3]}px;
  }

  p + p {
    margin-top: ${spacing[2]}px;
  }
`;
