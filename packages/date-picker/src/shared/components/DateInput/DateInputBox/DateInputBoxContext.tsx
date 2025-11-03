import React, { createContext, PropsWithChildren, useContext } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';

export interface DateInputBoxContextType {
  value?: DateType;
}

export interface DateInputBoxProviderProps {
  value?: DateType;
}

export const DateInputBoxContext =
  createContext<DateInputBoxContextType | null>(null);

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

export const useDateInputBoxContext = () => {
  const context = useContext(DateInputBoxContext);

  if (!context) {
    throw new Error(
      'useDateInputBoxContext must be used within a DateInputBoxProvider',
    );
  }

  return context;
};
