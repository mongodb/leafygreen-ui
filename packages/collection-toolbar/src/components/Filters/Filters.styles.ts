import { css, cx } from '@leafygreen-ui/emotion';
import { breakpoints, spacing } from '@leafygreen-ui/tokens';

import { Variant } from '../../shared.types';

export const baseStyles = css`
  flex: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  gap: ${spacing[200]}px;
`;

const compactStyles = css`
  flex: 1;

  @media only screen and (max-width: ${breakpoints.Tablet}px) {
    flex: 100%;
  }
`;

export const getFiltersStyles = ({
  className,
  variant,
}: {
  className?: string;
  variant?: Variant;
}) =>
  cx(
    baseStyles,
    {
      [compactStyles]: variant === Variant.Compact,
    },
    className,
  );
