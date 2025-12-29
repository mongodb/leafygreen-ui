import { css, cx } from '@leafygreen-ui/emotion';

import { Size, Variant } from './CollectionToolbar.types';

export const baseStyles = css``;

export const getCollectionToolbarStyles = ({
  className,
}: {
  size?: Size;
  variant?: Variant;
  className?: string;
}) => cx(baseStyles, className);
