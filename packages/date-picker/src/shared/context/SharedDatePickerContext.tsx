import React, { useState } from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { AutoComplete } from '../types';

import {
  SharedDatePickerContextProps,
  SharedDatePickerProviderProps,
} from './SharedDatePickerContext.types';
import {
  defaultSharedDatePickerContext,
  getContextProps,
} from './SharedDatePickerContext.utils';
import { useDatePickerErrorNotifications } from './useDatePickerErrorNotifications';

/** Create the SharedDatePickerContext */
export const SharedDatePickerContext =
  createContext<SharedDatePickerContextProps>(defaultSharedDatePickerContext);

// TODO: Consider renaming this to `SharedDatePickerContext`,
// and use `SharedDatePickerContext` for what's currently `DatePickerContext`

/** The Provider component for SharedDatePickerContext */
export const SharedDatePickerProvider = ({
  children,
  initialOpen = false,
  disabled = false,
  errorMessage,
  state,
  autoComplete = AutoComplete.Off,
  ...rest
}: PropsWithChildren<SharedDatePickerProviderProps>) => {
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
    <SharedDatePickerContext.Provider
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
    </SharedDatePickerContext.Provider>
  );
};

/** A hook to access {@link SharedDatePickerContextProps} */
export const useSharedDatePickerContext = () =>
  useContext(SharedDatePickerContext);
