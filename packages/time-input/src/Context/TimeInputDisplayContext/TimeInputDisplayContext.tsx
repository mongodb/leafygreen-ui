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
import { getMinMax, isValidDate, toDate } from '@leafygreen-ui/date-utils';

import {
  TimeInputDisplayContextProps,
  TimeInputDisplayProviderProps,
} from './TimeInputDisplayContext.types';
import { defaultTimeInputDisplayContext } from './TimeInputDisplayContext.utils';
import { MAX_DATE, MIN_DATE } from '../../constants';

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
        min,
        max,
      }}
    >
      {children}
    </TimeInputDisplayContext.Provider>
  );
};

export const useTimeInputDisplayContext = () => {
  return useContext(TimeInputDisplayContext);
};

/**
 * Applies the time from the given date to today's month, day, and year to create a new date in UTC.
 *
 * @param date - The date to apply the time to
 * @returns The date with the time applied to today's month, day, and year in UTC
 *
 * @example
 * ```js
 * Today is February 20, 2026
 * const date = new Date('2026-01-01T04:00:00Z'); // January 1st, 2026 at 4:00:00 AM
 * const normalizedDate = applyTimeToUTCToday({ date });
 * // '2026-02-20T04:00:00Z' // February 20th, 2026 at 4:00:00 AM
 * ```
 */
const applyTimeToUTCToday = ({ date }: { date: Date | null }) => {
  if (!isValidDate(date)) {
    return null;
  }

  const today = new Date();

  return new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    ),
  );
};
