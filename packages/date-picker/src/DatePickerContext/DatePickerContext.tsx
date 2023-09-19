import React from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';
import {
  defaultDatePickerContext,
  getContextProps,
} from './DatePickerContext.utils';

export const DatePickerContext = createContext<DatePickerContextProps>(
  defaultDatePickerContext,
);

export const DatePickerProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: DatePickerProviderProps }>) => {
  const contextValue = getContextProps(value);

  return (
    <DatePickerContext.Provider value={contextValue}>
      {children}
    </DatePickerContext.Provider>
  );
};
export const useDatePickerContext = () => useContext(DatePickerContext);
