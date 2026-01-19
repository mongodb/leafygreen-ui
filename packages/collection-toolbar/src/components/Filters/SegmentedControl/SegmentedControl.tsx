import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { SegmentedControl as LGSegmentedControl } from '@leafygreen-ui/segmented-control';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../../../shared.types';

import { SegmentedControlProps } from './SegmentedControl.types';

export const SegmentedControl = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, SegmentedControlProps>(
    ({ ref: _ref, ...props }, fwdRef) => {
      const { size } = useCollectionToolbarContext();
      return <LGSegmentedControl size={size} ref={fwdRef} {...props} />;
    },
  ),
  {
    displayName: 'SegmentedControl',
    key: CollectionToolbarFiltersSubComponentProperty.SegmentedControl,
  },
);
