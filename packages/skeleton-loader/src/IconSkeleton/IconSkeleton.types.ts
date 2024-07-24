import { IconProps } from '@leafygreen-ui/icon';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

type IconSizeProp = Pick<IconProps, 'size'>;

export interface IconSkeletonProps
  extends SharedSkeletonProps,
    HTMLElementProps<'div'>,
    DarkModeProps,
    IconSizeProp {}
