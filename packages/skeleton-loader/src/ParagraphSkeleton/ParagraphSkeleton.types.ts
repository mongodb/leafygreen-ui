import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

export interface ParagraphSkeletonProps
  extends SharedSkeletonProps,
    DarkModeProps,
    HTMLElementProps<'div'> {
  /**
   * Determines whether the header skeleton should be rendered
   */
  withHeader?: boolean;
}
