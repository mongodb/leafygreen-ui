import React, { createContext, PropsWithChildren, useContext } from 'react';

import {
  TimeInputContextProps,
  TimeInputProviderProps,
} from './TimeInputContext.types';
import { DateType } from '@leafygreen-ui/date-utils';

export const TimeInputContext = createContext<TimeInputContextProps>(
  {} as TimeInputContextProps,
);

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
