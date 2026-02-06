import { css, cx } from '@leafygreen-ui/emotion';
import {
  breakpoints,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { Variant } from '../../shared.types';

export const baseStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacing[100]}px;
  margin-left: ${spacing[1800]}px;

  @media only screen and (max-width: ${breakpoints.Tablet}px) {
    margin-left: 0;
  }
`;

const iconBaseStyles = css`
  transition: transform ${transitionDuration.default}ms ease-in-out;
`;

const iconExpandedStyles = css`
  transform: rotate(180deg);
`;

export const getIconStyles = ({ isExpanded }: { isExpanded: boolean }) =>
  cx(iconBaseStyles, {
    [iconExpandedStyles]: isExpanded,
  });

const compactStyles = css`
  @media only screen and (max-width: ${breakpoints.Tablet}px) {
    margin-left: 0;
  }
`;

export const getActionStyles = ({
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
