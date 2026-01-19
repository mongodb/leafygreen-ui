import { css, cx } from '@leafygreen-ui/emotion';

import { Size, Variant } from '../../shared.types';

export const baseStyles = css`
  flex: 1;
`;

export const getSearchInputStyles = ({
  className,
}: {
  className?: string;
  variant?: Variant;
  size?: Size;
}) => {
  return cx(baseStyles, className);
};
