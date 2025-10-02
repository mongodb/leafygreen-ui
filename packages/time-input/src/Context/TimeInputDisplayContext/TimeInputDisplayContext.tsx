import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import defaults from 'lodash/defaults';

import {
  TimeInputDisplayContextProps,
  TimeInputDisplayProviderProps,
} from './TimeInputDisplayContext.types';
import { defaultTimeInputDisplayContext } from './TimePickerDisplayContext.utils';

export const TimeInputDisplayContext =
  createContext<TimeInputDisplayContextProps>(defaultTimeInputDisplayContext);

/**
 * This provider is used for the display context of the TimeInput component
 */
export const TimeInputDisplayProvider = ({
  children,
  label = '',
  'aria-label': ariaLabelProp = '',
  'aria-labelledby': ariaLabelledbyProp = '',
  ...rest
}: PropsWithChildren<TimeInputDisplayProviderProps>) => {
  /**
   * Whether the input has been interacted with
   */
  const [isDirty, setIsDirty] = useState(false);

  /**
   * If props are undefined, use the default values
   */
  const providerValue: TimeInputDisplayContextProps = {
    ...defaults(rest, defaultTimeInputDisplayContext),
  };

  // TODO: min, max helpers

  return (
    <TimeInputDisplayContext.Provider
      value={{
        ...providerValue,
        label,
        ariaLabelProp,
        ariaLabelledbyProp,
        isDirty,
        setIsDirty,
      }}
    >
      {children}
    </TimeInputDisplayContext.Provider>
  );
};

export const useTimeInputDisplayContext = () => {
  return useContext(TimeInputDisplayContext);
};
