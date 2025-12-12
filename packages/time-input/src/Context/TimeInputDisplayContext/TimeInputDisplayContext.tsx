import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import defaults from 'lodash/defaults';
import defaultTo from 'lodash/defaultTo';

import { hasDayPeriod } from '../../utils';
import { getFormatParts } from '../../utils/getFormatParts/getFormatParts';

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

  /**
   * Determines if the input should show a select for the day period (AM/PM)
   */
  const is12HourFormat = !!hasDayPeriod(providerValue.locale);

  /**
   * Only used to track the presentation format of the segments, not the value itself
   */
  const formatParts = getFormatParts({
    showSeconds: providerValue.showSeconds,
  });

  /**
   * Gets the time zone from the provider value or the browser's default
   */
  const timeZone = defaultTo(
    providerValue.timeZone,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  // TODO: min, max helpers will be in a future PR

  return (
    <TimeInputDisplayContext.Provider
      value={{
        ...providerValue,
        label,
        ariaLabelProp,
        ariaLabelledbyProp,
        isDirty,
        setIsDirty,
        is12HourFormat,
        formatParts,
        timeZone,
      }}
    >
      {children}
    </TimeInputDisplayContext.Provider>
  );
};

export const useTimeInputDisplayContext = () => {
  return useContext(TimeInputDisplayContext);
};
