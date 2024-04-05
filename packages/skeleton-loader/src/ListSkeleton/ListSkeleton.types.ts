import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

export interface ListSkeletonProps
  extends SharedSkeletonProps,
    DarkModeProps,
    HTMLElementProps<'ul'> {
  count?: number;
  bulletsOnly?: boolean;
}
