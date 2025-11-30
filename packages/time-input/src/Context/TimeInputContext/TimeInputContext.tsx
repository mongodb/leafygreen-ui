import React, { createContext, PropsWithChildren, useContext } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';

import {
  TimeInputContextProps,
  TimeInputProviderProps,
} from './TimeInputContext.types';

export const TimeInputContext = createContext<TimeInputContextProps>(
  {} as TimeInputContextProps,
);

// TODO: get todays date if value is not provided
/**
 * This provider is used for the state context of the TimeInput component
 */
export const TimeInputProvider = ({
  children,
  value,
  setValue: _setValue,
  handleValidation: _handleValidation,
}: PropsWithChildren<TimeInputProviderProps>) => {
  const setValue = (newVal?: DateType) => {
    _setValue(newVal ?? null);
  };

  const handleValidation = (val?: DateType) => {
    _handleValidation?.(val);
  };

  return (
    <TimeInputContext.Provider
      value={{
        value,
        setValue,
        handleValidation,
      }}
    >
      {children}
    </TimeInputContext.Provider>
  );
};

export const useTimeInputContext = () => {
  return useContext(TimeInputContext);
};
