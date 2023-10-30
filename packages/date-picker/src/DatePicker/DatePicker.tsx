import React, { forwardRef } from 'react';

import {
  contextPropNames,
  DatePickerProvider,
} from '../shared/components/DatePickerContext';
import { useControlledValue } from '../shared/hooks';
import { pickAndOmit } from '../shared/utils';

import { DatePickerProps } from './DatePicker.types';
import { DatePickerComponent } from './DatePickerComponent';

/**
 * LeafyGreen Date Picker component
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: valueProp,
      initialValue: initialProp,
      onDateChange: onChangeProp,
      ...props
    }: DatePickerProps,
    fwdRef,
  ) => {
    const [contextProps, restProps] = pickAndOmit(props, contextPropNames);

    const { value, setValue } = useControlledValue(
      valueProp,
      onChangeProp,
      initialProp,
    );

    return (
      <DatePickerProvider value={contextProps}>
        <DatePickerComponent
          ref={fwdRef}
          value={value}
          setValue={setValue}
          {...restProps}
        />
      </DatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';
