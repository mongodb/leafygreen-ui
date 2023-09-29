import React, { useState } from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

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
  value: { initialOpen, ...rest },
}: PropsWithChildren<{ value: DatePickerProviderProps }>) => {
  const [isOpen, setOpen] = useState<boolean>(initialOpen ?? false);
  const [isDirty, setIsDirty] = useState(false);
  const menuId = useIdAllocator({ prefix: 'lg-date-picker-menu' });
  const contextValue = getContextProps(rest);

  return (
    <DatePickerContext.Provider
      value={{ ...contextValue, isOpen, setOpen, isDirty, setIsDirty, menuId }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

/** A hook to access DatePickerContext value */
export const useDatePickerContext = () => useContext(DatePickerContext);
