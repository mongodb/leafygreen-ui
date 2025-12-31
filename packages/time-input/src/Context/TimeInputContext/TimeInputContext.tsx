import React, { createContext, PropsWithChildren, useContext } from 'react';

import {
  DateType,
  isValidDate,
  isInRange as getIsInRange,
  newTZDate,
  isOnOrBeforeDateTime,
} from '@leafygreen-ui/date-utils';

import isNull from 'lodash/isNull';

import {
  TimeInputContextProps,
  TimeInputProviderProps,
} from './TimeInputContext.types';
import { useTimeInputComponentRefs } from './useTimeInputComponentRefs';
import { useTimeInputDisplayContext } from '../TimeInputDisplayContext';
import { getFormatPartsValues, getFormattedTimeString } from '../../utils';

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
      const minUTC = newTZDate({
        year: Number(year),
        month: Number(month) - 1,
        date: Number(day),
        hours: min.getUTCHours(),
        minutes: min.getUTCMinutes(),
        seconds: min.getUTCSeconds(),
        timeZone,
      });

      // With the local hour, minute, and second parts, along with the UTC month, day, and year parts a max UTC date object is created. If the min is 08, it will be 08 in every time zone. E.g. 08 in New York, 08 in London, 08 in Tokyo, etc.
      const maxUTC = newTZDate({
        year: Number(year),
        month: Number(month) - 1,
        date: Number(day),
        hours: max.getUTCHours(),
        minutes: max.getUTCMinutes(),
        seconds: max.getUTCSeconds(),
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
