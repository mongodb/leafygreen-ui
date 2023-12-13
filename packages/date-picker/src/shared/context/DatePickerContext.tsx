import React, { useState } from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { AutoComplete } from '../types';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';
import {
  defaultDatePickerContext,
  getContextProps,
} from './DatePickerContext.utils';
import { useDatePickerErrorNotifications } from './useDatePickerErrorNotifications';

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
  errorMessage,
  state,
  autoComplete = AutoComplete.Off,
  ...rest
}: PropsWithChildren<DatePickerProviderProps>) => {
  const isInitiallyOpen = disabled ? false : initialOpen;

  const [isOpen, setOpen] = useState<boolean>(isInitiallyOpen);
  const [isDirty, setIsDirty] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const menuId = useIdAllocator({ prefix: 'lg-date-picker-menu' });
  const contextValue = getContextProps(rest);

  /** Error state handling */
  const {
    stateNotification,
    setInternalErrorMessage,
    clearInternalErrorMessage,
  } = useDatePickerErrorNotifications(state, errorMessage);

  return (
    <DatePickerContext.Provider
      value={{
        ...contextValue,
        disabled,
        menuId,
        isOpen,
        setOpen,
        isDirty,
        setIsDirty,
        isSelectOpen,
        setIsSelectOpen,
        stateNotification,
        setInternalErrorMessage,
        clearInternalErrorMessage,
        autoComplete,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

/** A hook to access {@link DatePickerContextProps} */
export const useDatePickerContext = () => useContext(DatePickerContext);
