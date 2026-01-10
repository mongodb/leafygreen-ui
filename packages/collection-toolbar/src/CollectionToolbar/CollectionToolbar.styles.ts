import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { Size, Variant } from '../shared.types';

export const baseStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[200]}px;
`;

export const getCollectionToolbarStyles = ({
  className,
}: {
  size?: Size;
  variant?: Variant;
  className?: string;
}) => cx(baseStyles, className);
