import React from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';
import { isWithinInterval } from 'date-fns';

import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { toDate } from '../utils/toDate';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';

export const defaultDatePickerContext: DatePickerContextProps = {
  label: '',
  dateFormat: 'en-US',
  timeZone: 'America/New_York',
  min: new Date('12-31-1969'),
  max: new Date('01-19-2038'),
  isInRange: () => true,
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
}: PropsWithChildren<{ value: DatePickerProviderProps }>) => {
  const providerValue: DatePickerContextProps = {
    ...defaultDatePickerContext,
    ...value,
    min: value.min ? toDate(value.min) : defaultDatePickerContext.min,
    max: value.max ? toDate(value.max) : defaultDatePickerContext.max,
  };

  const isInRange = (d?: Date | null): boolean =>
    !!(
      d &&
      isWithinInterval(d, {
        start: providerValue.min,
        end: providerValue.max,
      })
    );

  return (
    <DatePickerContext.Provider value={{ ...providerValue, isInRange }}>
      {children}
    </DatePickerContext.Provider>
  );
};
export const useDatePickerContext = () => useContext(DatePickerContext);
