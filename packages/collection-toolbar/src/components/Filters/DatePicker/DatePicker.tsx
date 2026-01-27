import React, { ComponentType, forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { DatePicker as LGDatePicker } from '@leafygreen-ui/date-picker';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { DatePickerProps } from './DatePicker.types';

export const DatePicker = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, DatePickerProps>(({ ...props }, fwdRef) => {
    const { size } = useCollectionToolbarContext();

    return <LGDatePicker size={size} ref={fwdRef} {...props} />;
    // Cast required for React 17: TypeScript cannot reconcile ForwardRefExoticComponent's propTypes
    // with the AriaLabelProps discriminated union (aria-label OR aria-labelledby required)
  }) as ComponentType<DatePickerProps>,
  {
    displayName: 'DatePicker',
    key: CollectionToolbarFiltersSubComponentProperty.DatePicker,
  },
);
