import React, { forwardRef } from 'react';

import { contextPropNames, DatePickerProvider } from '../DatePickerContext';
import { useControlledValue } from '../hooks/useControlledValue';
import { pickAndOmit } from '../utils';

import { DateRangeComponent } from './DateRangeComponent';
import { DateRangePickerProps } from './DateRangePicker.types';

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value: rangeProp,
      initialValue: initialProp,
      onChange,
      showQuickSelection,
      ...props
    }: DateRangePickerProps,
    fwdRef,
  ) => {
    const [contextProps, restProps] = pickAndOmit(props, contextPropNames);

    const { value, setValue } = useControlledValue(
      rangeProp,
      onChange,
      initialProp,
    );

    return (
      <DatePickerProvider value={contextProps}>
        <DateRangeComponent
          ref={fwdRef}
          value={value}
          setValue={setValue}
          showQuickSelection={showQuickSelection}
          {...restProps}
        />
      </DatePickerProvider>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
