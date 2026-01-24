import { css, cx } from '@leafygreen-ui/emotion';

export const baseStyles = css`
  flex: 1;
`;

export const getSearchInputStyles = ({ className }: { className?: string }) => {
  return cx(baseStyles, className);
};
