import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

export interface ListSkeletonProps
  extends SharedSkeletonProps,
    DarkModeProps,
    HTMLElementProps<'ul'> {
  /**
   * Defines the number of skeleton list items to render
   */
  count?: number;
  /**
   * Defines whether to render the full list item, or only a "bullet" skeleton.
   * (A "bullet" skeleton renders as just a 16x16 rounded rectangle)
   */
  bulletsOnly?: boolean;
}
