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

  const {
    locale,
    timeZone,
    min,
    max,
    setInternalErrorMessage,
    clearInternalErrorMessage,
  } = useTimeInputDisplayContext();

  const setValue = (newVal?: DateType) => {
    _setValue(newVal ?? null);
  };

  /**
   * Handles the validation of the time input value
   * @param value - The value to validate in UTC
   */
  const handleValidation = (value?: DateType) => {
    if (isValidDate(value)) {
      const { minUTC, maxUTC } = getMinAndMaxFromLocalToUTC({
        min,
        max,
        timeZone,
        newDate: value,
      });

      const isInRange = getIsInRange(minUTC!, maxUTC!); // TODO: why can these be undefined?

      // TODO: should make seconds optional
      const getFormattedTimeStringHelper = (date: DateType) => {
        return getFormattedTimeString({
          date,
          locale,
          timeZone,
        });
      };

      // Check if the value in UTC is in the range of the min and max UTC date objects.
      if (isInRange(value)) {
        clearInternalErrorMessage();
      } else {
        if (isOnOrBeforeDateTime(value, minUTC)) {
          setInternalErrorMessage(
            `Time must be after ${getFormattedTimeStringHelper(minUTC)}`,
          );
        } else {
          setInternalErrorMessage(
            `Time must be before ${getFormattedTimeStringHelper(maxUTC)}`,
          );
        }
      }
    } else if (isNull(value)) {
      // This could still be an error, but it's not defined internally
      clearInternalErrorMessage();
      console.log('🌈is null');
    }

    _handleValidation?.(value);
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
