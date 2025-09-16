import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

export interface CardSkeletonProps
  extends SharedSkeletonProps,
    React.ComponentPropsWithoutRef<'div'>,
    DarkModeProps {}
