import React, { createContext, PropsWithChildren, useContext } from 'react';
import {
  DateInputBoxContextType,
  DateInputBoxProviderProps,
} from './DateInputBoxContext.types';

export const DateInputBoxContext =
  createContext<DateInputBoxContextType | null>(null);

/**
 * Provider to be used within the DateInputBox component.
 *
 * Depends on {@link DateInputBoxContextType}
 * @param value - Date value in UTC time
 * @returns
 */
export const DateInputBoxProvider = ({
  children,
  value,
}: PropsWithChildren<DateInputBoxProviderProps>) => {
  return (
    <DateInputBoxContext.Provider value={{ value }}>
      {children}
    </DateInputBoxContext.Provider>
  );
};

/**
 * Hook to access the DateInputBoxContext
 *
 * Depends on {@link DateInputBoxContextType}
 */
export const useDateInputBoxContext = () => {
  const context = useContext(DateInputBoxContext);

  if (!context) {
    throw new Error(
      'useDateInputBoxContext must be used within a DateInputBoxProvider',
    );
  }

  return context;
};
