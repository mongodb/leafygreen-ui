import { css, cx } from '@leafygreen-ui/emotion';
import { breakpoints } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  flex: 1;

  @media only screen and (max-width: ${breakpoints.Tablet}px) {
    flex: 100%;
  }
`;

export const getSearchInputStyles = ({ className }: { className?: string }) => {
  return cx(baseStyles, className);
};
