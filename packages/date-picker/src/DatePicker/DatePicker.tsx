import React, { forwardRef } from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { pickAndOmit } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  ContextPropKeys,
  contextPropNames,
  SharedDatePickerProvider,
} from '../shared/context';
import { useControlledValue } from '../shared/hooks';

import { DatePickerProps } from './DatePicker.types';
import { DatePickerContent } from './DatePickerContent';
import { DatePickerProvider } from './DatePickerContext';

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
      <SharedDatePickerProvider
        darkMode={darkMode}
        baseFontSize={baseFontSize}
        {...contextProps}
      >
        <DatePickerProvider
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
            <DatePickerContent ref={fwdRef} {...componentProps} />
          </LeafyGreenProvider>
        </DatePickerProvider>
      </SharedDatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';
