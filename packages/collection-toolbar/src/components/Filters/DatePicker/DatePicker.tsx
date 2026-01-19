import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { DatePicker as LGDatePicker } from '@leafygreen-ui/date-picker';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../../../shared.types';

import { DatePickerProps } from './DatePicker.types';

export const DatePicker = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, DatePickerProps>(({ label, ...props }, fwdRef) => {
    const { size } = useCollectionToolbarContext();
    return <LGDatePicker size={size} ref={fwdRef} label={label} {...props} />;
  }),
  {
    displayName: 'DatePicker',
    key: CollectionToolbarFiltersSubComponentProperty.DatePicker,
  },
);
