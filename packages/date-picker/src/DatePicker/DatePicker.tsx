import React, { forwardRef } from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import {
  contextPropNames,
  DatePickerProvider,
} from '../shared/components/DatePickerContext';
import { useControlledValue } from '../shared/hooks';
import { pickAndOmit } from '../shared/utils';

import { DatePickerProps } from './DatePicker.types';
import { DatePickerComponent } from './DatePickerComponent';
import { SingleDateProvider } from './SingleDateContext';

/**
 * LeafyGreen Date Picker component
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: valueProp,
      initialValue: initialProp,
      onDateChange: onChangeProp,
      handleValidation,
      darkMode: darkModeProp,
      ...props
    }: DatePickerProps,
    fwdRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const [contextProps, restProps] = pickAndOmit(
      { darkMode, ...props },
      contextPropNames,
    );

    const { value, setValue } = useControlledValue(
      valueProp,
      onChangeProp,
      initialProp,
    );

    return (
      <DatePickerProvider {...contextProps}>
        <SingleDateProvider
          value={value}
          setValue={setValue}
          handleValidation={handleValidation}
        >
          <LeafyGreenProvider darkMode={darkMode}>
            <DatePickerComponent ref={fwdRef} {...restProps} />
          </LeafyGreenProvider>
        </SingleDateProvider>
      </DatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';
