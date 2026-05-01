import { css, cx } from '@leafygreen-ui/emotion';

import { Variant } from '../../shared.types';
import { CUSTOM_BREAKPOINT } from '../constants';

export const baseStyles = css`
  flex: 1;
  min-width: 280px;

  @media only screen and (max-width: ${CUSTOM_BREAKPOINT}px) {
    flex: 100%;
  }
`;

const compactStyles = css`
  max-width: 280px;

  @media only screen and (max-width: ${CUSTOM_BREAKPOINT}px) {
    max-width: 100%;
  }
`;

export const getSearchInputStyles = ({
  className,
  variant,
}: {
  className?: string;
  variant?: Variant;
}) => {
  return cx(
    baseStyles,
    {
      [compactStyles]: variant === Variant.Compact,
    },
    className,
  );
};
