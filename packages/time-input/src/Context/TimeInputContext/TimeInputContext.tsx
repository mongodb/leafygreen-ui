import React, { createContext, PropsWithChildren, useContext } from 'react';

import {
  DateType,
  isValidDate,
  isInRange as getIsInRange,
  newUTCFromTimeZone,
} from '@leafygreen-ui/date-utils';

import isNull from 'lodash/isNull';

import {
  TimeInputContextProps,
  TimeInputProviderProps,
} from './TimeInputContext.types';
import { useTimeInputComponentRefs } from './useTimeInputComponentRefs';
import { useTimeInputDisplayContext } from '../TimeInputDisplayContext';
import {
  getFormatPartsValues,
  hasDayPeriod,
  isSameUTCDayAndTime,
} from '../../utils';
import { isBefore } from 'date-fns';

export const TimeInputContext = createContext<TimeInputContextProps>(
  {} as TimeInputContextProps,
);

/**
 * This provider is used for the state context of the TimeInput component
 */
export const TimeInputProvider = ({
  children,
  value,
  setValue: _setValue,
  handleValidation: _handleValidation,
}: PropsWithChildren<TimeInputProviderProps>) => {
  const refs = useTimeInputComponentRefs();

  const { locale, timeZone, min, max } = useTimeInputDisplayContext();

  const setValue = (newVal?: DateType) => {
    _setValue(newVal ?? null);
  };

  /**
   * Handles the validation of the time input value
   * @param val - The value to validate in UTC
   */
  const handleValidation = (val?: DateType) => {
    if (isValidDate(val)) {
      // The local month, day, and year.
      const { month, day, year } = getFormatPartsValues({
        locale: locale,
        timeZone: timeZone,
        value: value,
      });

      // With the local hour, minute, and second parts, along with the UTC month, day, and year parts a min UTC date object is created. If the min is 08, it will be 08 in every time zone. E.g. 08 in New York, 08 in London, 08 in Tokyo, etc.
      const minUTC = newUTCFromTimeZone({
        year,
        month,
        day,
        hour: min.getUTCHours().toString(),
        minute: min.getUTCMinutes().toString(),
        second: min.getUTCSeconds().toString(),
        timeZone,
      });

      // With the local hour, minute, and second parts, along with the UTC month, day, and year parts a max UTC date object is created. If the min is 08, it will be 08 in every time zone. E.g. 08 in New York, 08 in London, 08 in Tokyo, etc.
      const maxUTC = newUTCFromTimeZone({
        year,
        month,
        day,
        hour: max.getUTCHours().toString(),
        minute: max.getUTCMinutes().toString(),
        second: max.getUTCSeconds().toString(),
        timeZone,
      });

      //// TESTING ////

      console.log('🪼 handleValidation', {
        value: val.toISOString(),
        min: min.toISOString(),
        max: max.toISOString(),
        timeZone,
        minUTC: minUTC.toISOString(),
        maxUTC: maxUTC.toISOString(),
      });

      const isInRange = getIsInRange(minUTC, maxUTC);

      // Check if the value in UTC is in the range of the min and max UTC date objects.
      if (isInRange(val)) {
        // clearInternalErrorMessage();
        console.log('🌈is in range');
      } else {
        if (isOnOrBeforeDateTime(val, minUTC)) {
          // setInternalErrorMessage(
          //   `Date must be after ${getFormattedDateString(min, locale)}`,
          // );
          console.log(
            `❌❌❌date must be AFTER ${getFormattedTimeString({
              date: minUTC,
              locale,
              timeZone,
            })}`,
            {
              val: val?.toISOString(),
              minUTC: minUTC?.toISOString(),
            },
          );
        } else {
          // setInternalErrorMessage(
          //   `Date must be before ${getFormattedDateString(max, locale)}`,
          // );
          console.log(
            `❌❌❌date must be BEFORE ${getFormattedTimeString({
              date: maxUTC,
              locale,
              timeZone,
            })}`,
            {
              val: val?.toISOString(),
              maxUTC: maxUTC?.toISOString(),
            },
          );
        }
      }
    } else if (isNull(val)) {
      // This could still be an error, but it's not defined internally
      // clearInternalErrorMessage();
      console.log('🌈is null');
    }

    _handleValidation?.(val);
  };

  return (
    <TimeInputContext.Provider
      value={{
        refs,
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

// TODO: move this to date-utils
/**
 * Checks if a date is on or before a date and time
 * @param date - The date to check
 * @param dateToCompare - The date to compare to
 * @returns True if the date is on or before the date and time, false otherwise
 */
const isOnOrBeforeDateTime = (date: DateType, dateToCompare: DateType) => {
  return (
    isValidDate(date) &&
    isValidDate(dateToCompare) &&
    (isSameUTCDayAndTime(date, dateToCompare) || isBefore(date, dateToCompare))
  );
};

/**
 * Formats a date to a time string
 * @param date - The date to format
 * @param locale - The locale to format the date to
 * @param timeZone - The time zone to format the date to
 * @returns The formatted time string
 */
const getFormattedTimeString = ({
  date,
  locale,
  timeZone,
}: {
  date: DateType;
  locale: string;
  timeZone: string;
}) => {
  const { hour, minute, second, dayPeriod } = getFormatPartsValues({
    locale,
    timeZone,
    value: date,
  });

  if (hasDayPeriod(locale)) {
    return `${hour}:${minute}:${second} ${dayPeriod}`;
  }

  return `${hour}:${minute}:${second}`;
};
