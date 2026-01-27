import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { DatePicker as LGDatePicker } from '@leafygreen-ui/date-picker';
import { consoleOnce } from '@leafygreen-ui/lib';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { DatePickerProps } from './DatePicker.types';

export const DatePicker = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, DatePickerProps>(
    ({ label, 'aria-label': ariaLabel, ...props }, fwdRef) => {
      const { size } = useCollectionToolbarContext();

      if (!ariaLabel && !label) {
        consoleOnce.error(
          'For screen-reader accessibility, aria-label must be provided to DatePicker.',
        );
      }

      return (
        <LGDatePicker
          size={size}
          ref={fwdRef}
          label={label}
          aria-label={ariaLabel}
          {...props}
        />
      );
    },
  ),
  {
    displayName: 'DatePicker',
    key: CollectionToolbarFiltersSubComponentProperty.DatePicker,
  },
);
