import React from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';
import { isWithinInterval } from 'date-fns';
import { defaults } from 'lodash';

import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { isValidDate } from '../utils/isValidDate';
import { toDate } from '../utils/toDate';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';

export const defaultDatePickerContext: DatePickerContextProps = {
  label: '',
  dateFormat: 'iso8601',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  min: new Date('12-31-1969'),
  max: new Date('01-19-2038'),
  isOpen: false,
  isInRange: () => true,
  disabled: false,
  size: Size.Default,
  state: 'unset',
  errorMessage: '',
  baseFontSize: BaseFontSize.Body1,
  darkMode: false,
  menuId: '',
};

export const DatePickerContext = createContext<DatePickerContextProps>(
  defaultDatePickerContext,
);

export const DatePickerProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: DatePickerProviderProps }>) => {
  const { min, max, ...rest } = value;
  const providerValue: DatePickerContextProps = {
    ...defaults(rest, defaultDatePickerContext),
    min: isValidDate(min) ? toDate(min)! : defaultDatePickerContext.min,
    max: isValidDate(max) ? toDate(max)! : defaultDatePickerContext.max,
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
