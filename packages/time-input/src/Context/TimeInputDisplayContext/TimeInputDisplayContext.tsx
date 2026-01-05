import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import defaults from 'lodash/defaults';

import {
  applyTimeToUTCToday,
  getMinMax,
  toDate,
  useDateTimeErrorNotifications,
} from '@leafygreen-ui/date-utils';

import { MAX_DATE, MIN_DATE } from '../../constants';
import { getFormatParts, hasDayPeriod } from '../../utils';

import {
  TimeInputDisplayContextProps,
  TimeInputDisplayProviderProps,
} from './TimeInputDisplayContext.types';
import { defaultTimeInputDisplayContext } from './TimeInputDisplayContext.utils';

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
  errorMessage,
  state,
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
  const is12HourFormat = hasDayPeriod(providerValue.locale);

  /**
   * Only used to track the presentation format of the segments, not the value itself
   */
  const formatParts = getFormatParts({
    showSeconds: providerValue.showSeconds,
  });

  /**
   * Gets the min and max dates for the time input
   */
  const [min, max] = getMinMax({
    min: applyTimeToUTCToday({
      date: toDate(providerValue.min),
    }),
    max: applyTimeToUTCToday({
      date: toDate(providerValue.max),
    }),
    defaultMin: MIN_DATE,
    defaultMax: MAX_DATE,
    componentName: 'TimeInput',
  });

  /** Error state handling */
  const {
    stateNotification,
    setInternalErrorMessage,
    clearInternalErrorMessage,
  } = useDateTimeErrorNotifications({
    externalState: state,
    externalErrorMessage: errorMessage,
  });

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
        min,
        max,
        stateNotification,
        setInternalErrorMessage,
        clearInternalErrorMessage,
      }}
    >
      {children}
    </TimeInputDisplayContext.Provider>
  );
};

export const useTimeInputDisplayContext = () => {
  return useContext(TimeInputDisplayContext);
};
