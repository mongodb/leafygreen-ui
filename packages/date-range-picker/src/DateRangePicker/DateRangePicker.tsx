import React, { forwardRef } from 'react';

import {
  contextPropNames,
  DatePickerProvider,
} from '@leafygreen-ui/date-picker/shared/components/DatePickerContext';
import { useControlledValue } from '@leafygreen-ui/date-picker/shared/hooks';
import { pickAndOmit } from '@leafygreen-ui/date-picker/shared/utils';

import { DateRangeComponent } from './DateRangeComponent';
import { DateRangeProvider } from './DateRangeContext';
import { DateRangePickerProps } from './DateRangePicker.types';

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value: rangeProp,
      initialValue: initialProp,
      onRangeChange: onChangeProp,
      handleValidation,
      ...props
    }: DateRangePickerProps,
    fwdRef,
  ) => {
    const [datePickerContextProps, restProps] = pickAndOmit(
      props,
      contextPropNames,
    );

    const { value, setValue } = useControlledValue(
      rangeProp,
      onChangeProp,
      initialProp,
    );

    return (
      <DatePickerProvider value={datePickerContextProps}>
        <DateRangeProvider
          rootRef={fwdRef}
          value={value}
          setValue={setValue}
          handleValidation={handleValidation}
        >
          <DateRangeComponent {...restProps} />
        </DateRangeProvider>
      </DatePickerProvider>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
