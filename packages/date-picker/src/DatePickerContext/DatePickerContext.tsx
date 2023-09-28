import React, { useState } from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';
import {
  defaultDatePickerContext,
  getContextProps,
} from './DatePickerContext.utils';

/** Create the DatePickerContext */
export const DatePickerContext = createContext<DatePickerContextProps>(
  defaultDatePickerContext,
);

/** The Provider component for DatePickerContext */
export const DatePickerProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: DatePickerProviderProps }>) => {
  const [isDirty, setIsDirty] = useState(false);
  const contextValue = getContextProps(value);

  return (
    <DatePickerContext.Provider
      value={{ ...contextValue, isDirty, setIsDirty }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

/** A hook to access DatePickerContext value */
export const useDatePickerContext = () => useContext(DatePickerContext);
