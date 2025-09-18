import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { SharedSkeletonProps } from '../Skeleton/Skeleton.types';

export interface TableSkeletonProps
  extends SharedSkeletonProps,
    DarkModeProps,
    React.ComponentPropsWithoutRef<'table'> {
  /**
   * Base font size
   */
  baseFontSize?: BaseFontSize;

  /**
   * Number of columns
   * @default 4
   */
  numCols?: number;

  /**
   * Column labels. Empty strings or undefined values will be treated as unknown and render a simple skeleton.
   */
  columnLabels?: Array<React.ReactNode>;

  /**
   * Number of rows
   * @default 5
   */
  numRows?: number;
}
