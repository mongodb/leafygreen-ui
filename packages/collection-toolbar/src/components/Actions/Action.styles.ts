import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Variant } from '../../shared.types';

export const baseStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const getActionStyles = ({
  className,
}: {
  className?: string;
  variant?: Variant;
}) => cx(baseStyles, className);
