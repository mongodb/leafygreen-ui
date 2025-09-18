import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

export interface ParagraphSkeletonProps
  extends SharedSkeletonProps,
    DarkModeProps,
    React.ComponentPropsWithoutRef<'div'> {
  /**
   * Determines whether the header skeleton should be rendered
   */
  withHeader?: boolean;
}
