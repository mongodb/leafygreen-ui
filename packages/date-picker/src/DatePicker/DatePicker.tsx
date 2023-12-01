import React, { forwardRef } from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  ContextPropKeys,
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
      baseFontSize: basefontSizeProp,
      ...props
    }: DatePickerProps,
    fwdRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(basefontSizeProp);
    const [contextProps, componentProps] = pickAndOmit<
      DatePickerProps,
      ContextPropKeys
    >({ ...props }, contextPropNames);

    const { value, setValue } = useControlledValue(
      valueProp,
      onChangeProp,
      initialProp,
    );

    return (
      <DatePickerProvider
        darkMode={darkMode}
        baseFontSize={baseFontSize}
        {...contextProps}
      >
        <SingleDateProvider
          value={value}
          setValue={setValue}
          handleValidation={handleValidation}
        >
          <LeafyGreenProvider
            darkMode={darkMode}
            baseFontSize={
              baseFontSize === BaseFontSize.Body1 ? 14 : baseFontSize
            }
          >
            <DatePickerComponent ref={fwdRef} {...componentProps} />
          </LeafyGreenProvider>
        </SingleDateProvider>
      </DatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';
