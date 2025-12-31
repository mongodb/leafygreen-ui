import React, { createContext, PropsWithChildren, useContext } from 'react';
import isNull from 'lodash/isNull';

import {
  DateType,
  isInRange as getIsInRange,
  isOnOrBeforeDateTime,
  isValidDate,
} from '@leafygreen-ui/date-utils';

import {
  getFormattedTimeString,
  getMinAndMaxFromLocalToUTC,
} from '../../utils';
import { useTimeInputDisplayContext } from '../TimeInputDisplayContext';

import {
  TimeInputContextProps,
  TimeInputProviderProps,
} from './TimeInputContext.types';
import { useTimeInputComponentRefs } from './useTimeInputComponentRefs';

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
      const { minUTC, maxUTC } = getMinAndMaxFromLocalToUTC({
        min,
        max,
        timeZone,
        newDate: val,
      });

      const isInRange = getIsInRange(minUTC!, maxUTC!);

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
