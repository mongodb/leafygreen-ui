import React, { forwardRef } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { DatePickerProvider } from '../DatePickerContext';
import { contextPropNames } from '../DatePickerContext/DatePickerContext.utils';
import { useControlledValue } from '../hooks/useControlledValue';
import { pickAndOmit } from '../utils';

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
      onChange: onChangeProp,
      ...props
    }: DatePickerProps,
    fwdRef,
  ) => {
    const [contextProps, restProps] = pickAndOmit(props, contextPropNames);
    const menuId = useIdAllocator({ prefix: 'lg-date-picker-menu' });

    const { value, setValue } = useControlledValue(
      valueProp,
      onChangeProp,
      initialProp,
    );

    return (
      <DatePickerProvider
        value={{
          ...contextProps,
          menuId,
        }}
      >
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
