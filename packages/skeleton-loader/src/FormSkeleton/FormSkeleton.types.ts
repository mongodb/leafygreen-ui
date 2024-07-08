import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

export interface FormSkeletonProps
  extends SharedSkeletonProps,
    DarkModeProps,
    HTMLElementProps<'div'> {}
