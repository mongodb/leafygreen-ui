import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

export interface CardSkeletonProps
  extends SharedSkeletonProps,
    HTMLElementProps<'div'>,
    DarkModeProps {}
