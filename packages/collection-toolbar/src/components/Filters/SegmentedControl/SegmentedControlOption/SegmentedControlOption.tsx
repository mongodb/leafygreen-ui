import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { CollectionToolbarFiltersSubComponentProperty } from '../../../../shared.types';

import { SegmentedControlOptionProps } from './SegmentedControlOption.types';

export const SegmentedControlOption = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, SegmentedControlOptionProps>((props, ref) => {
    return <SegmentedControlOption {...props} ref={ref} />;
  }),
  {
    displayName: 'SegmentedControlOption',
    key: CollectionToolbarFiltersSubComponentProperty.SegmentedControlOption,
  },
);
