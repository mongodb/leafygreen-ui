import React from 'react';

import { IconProps } from '@leafygreen-ui/icon';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

type IconSizeProp = Pick<IconProps, 'size'>;

export interface IconSkeletonProps
  extends SharedSkeletonProps,
    React.ComponentPropsWithoutRef<'div'>,
    DarkModeProps,
    IconSizeProp {}
