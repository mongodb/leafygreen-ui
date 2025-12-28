import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { Variant } from '../CollectionToolbar.types';

export const baseStyles = css`
  display: flex;
  flex-direction: row;
  gap: ${spacing[200]}px;
  align-items: center;
  justify-content: flex-end;
`;

export const getCollectionToolbarActionsStyles = ({
  variant,
  className,
}: {
  variant?: Variant;
  className?: string;
}) => cx(baseStyles, className);
