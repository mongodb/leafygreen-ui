import React, { forwardRef } from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { SegmentedControl as LGSegmentedControl } from '@leafygreen-ui/segmented-control';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { getSegmentedControlStyles } from './SegmentedControl.styles';
import { SegmentedControlProps } from './SegmentedControl.types';

export const SegmentedControl = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, SegmentedControlProps>(
    ({ ref: _ref, className, children, ...props }, fwdRef) => {
      const { size } = useCollectionToolbarContext();

      const segmentedControlOptions = findChildren(
        children,
        CollectionToolbarFiltersSubComponentProperty.SegmentedControlOption,
      );

      return (
        <LGSegmentedControl
          size={size}
          ref={fwdRef}
          className={getSegmentedControlStyles({ className })}
          {...props}
        >
          {segmentedControlOptions}
        </LGSegmentedControl>
      );
    },
  ),
  {
    displayName: 'SegmentedControl',
    key: CollectionToolbarFiltersSubComponentProperty.SegmentedControl,
  },
);
