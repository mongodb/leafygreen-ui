import React from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';

import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { DatePickerContextProps } from './DatePickerContext.types';

export const defaultDatePickerContext: DatePickerContextProps = {
  label: '',
  dateFormat: 'en-US',
  timeZone: 'America/New_York',
  min: new Date('12-31-1969'),
  max: new Date('01-19-2038'),
  disabled: false,
  size: Size.Default,
  state: 'unset',
  errorMessage: '',
  baseFontSize: BaseFontSize.Body1,
  darkMode: false,
};

export const DatePickerContext = createContext<DatePickerContextProps>(
  defaultDatePickerContext,
);
export const DatePickerProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: DatePickerContextProps }>) => {
  const providerValue = { ...defaultDatePickerContext, ...value };
  return (
    <DatePickerContext.Provider value={providerValue}>
      {children}
    </DatePickerContext.Provider>
  );
};
export const useDatePickerContext = () => useContext(DatePickerContext);
