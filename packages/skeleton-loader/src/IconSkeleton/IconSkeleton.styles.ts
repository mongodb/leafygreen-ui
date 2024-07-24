import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';

import { getSkeletonBaseStyles, themeStyles } from '../Skeleton';

export const getIconSkeletonBaseStyles = (
  size: number,
  theme: Theme,
  enableAnimations = false,
) =>
  cx(
    getSkeletonBaseStyles({ enableAnimations }),
    themeStyles[theme],
    css`
      height: ${size}px;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      width: unset;
    `,
  );
