import React, { forwardRef } from 'react';

import { contextPropNames, DatePickerProvider } from '../DatePickerContext';
import { useControlledValue } from '../hooks/useControlledValue';
import { pickAndOmit } from '../utils';

import { DateRangeComponent } from './DateRangeComponent';
import { DateRangePickerProps } from './DateRangePicker.types';

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      start: startProp,
      initialStart: initialStartProp,
      end: endProp,
      initialEnd: initialEndProp,
      onRangeChange,
      ...props
    }: DateRangePickerProps,
    fwdRef,
  ) => {
    const [contextProps, restProps] = pickAndOmit(props, contextPropNames);

    const { value: range, setValue: setRange } = useControlledValue(
      [startProp || null, endProp || null],
      onRangeChange,
      [initialStartProp || null, initialEndProp || null],
    );

    return (
      <DatePickerProvider value={contextProps}>
        <DateRangeComponent
          ref={fwdRef}
          range={range}
          setRange={setRange}
          {...restProps}
        />
      </DatePickerProvider>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
