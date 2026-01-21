import { css, cx } from '@leafygreen-ui/emotion';

export const baseStyles = css`
  width: 100%;
`;

export const getSearchInputStyles = ({
  className,
}: {
  className?: string;
}) => {
  return cx(baseStyles, className);
};
