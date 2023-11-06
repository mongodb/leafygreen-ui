import React, { useEffect, useState } from 'react';
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

// TODO: Consider renaming this to `SharedDatePickerContext`,
// and use `DatePickerContext` for what's currently `SingleDateContext`

/** The Provider component for DatePickerContext */
export const DatePickerProvider = ({
  children,
  initialOpen = false,
  disabled = false,
  ...rest
}: PropsWithChildren<DatePickerProviderProps>) => {
  const shouldInitiallyOpen = disabled ? false : initialOpen;
  const [isOpen, setOpen] = useState<boolean>(shouldInitiallyOpen);
  const [isDirty, setIsDirty] = useState(false);
  const menuId = useIdAllocator({ prefix: 'lg-date-picker-menu' });
  const contextValue = getContextProps(rest);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <DatePickerContext.Provider
      value={{
        ...contextValue,
        disabled,
        isOpen,
        setOpen,
        isDirty,
        setIsDirty,
        menuId,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

/** A hook to access {@link DatePickerContextProps} */
export const useDatePickerContext = () => useContext(DatePickerContext);
