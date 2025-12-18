import React, { createContext, PropsWithChildren, useContext } from 'react';

import {
  DateType,
  getSimulatedTZDate,
  // isInRange,
  isOnOrBefore,
  isValidDate,
  isInRange as getIsInRange,
  // isValidDate,
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
  getNewUTCDateFromSegments,
  isSameUTCDayAndTime,
} from '../../utils';
import { isBefore } from 'date-fns';
import { TimeSegmentsState } from '../../shared.types';

// import { getFormatPartsValues } from '../../utils/getFormatPartsValues/getFormatPartsValues';
// import { useTimeInputDisplayContext } from '../TimeInputDisplayContext';

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

  const handleValidation = (
    val?: DateType,
    // minUTC?: DateType,
    // maxUTC?: DateType,
  ) => {
    const { month, day, year } = getFormatPartsValues({
      locale: locale,
      timeZone: timeZone,
      value: value,
    });

    const minSegments: TimeSegmentsState = {
      hour: min.getUTCHours().toString(),
      minute: min.getUTCMinutes().toString(),
      second: min.getUTCSeconds().toString(),
    };

    const minUTC = getNewUTCDateFromSegments({
      segments: minSegments,
      is12HourFormat: false,
      dateValues: {
        day,
        month,
        year,
      },
      timeZone,
      dayPeriod: 'AM',
    });

    const maxSegments: TimeSegmentsState = {
      hour: max.getUTCHours().toString(),
      minute: max.getUTCMinutes().toString(),
      second: max.getUTCSeconds().toString(),
    };

    const maxUTC = getNewUTCDateFromSegments({
      segments: maxSegments,
      is12HourFormat: false,
      dateValues: {
        day,
        month,
        year,
      },
      timeZone,
      dayPeriod: 'AM',
    });

    //// TESTING ////

    console.log('🪼 handleValidation', {
      value: val && isValidDate(val) ? val.toISOString() : null,
      min: min && isValidDate(min) ? min.toISOString() : null,
      max: max && isValidDate(max) ? max.toISOString() : null,
      timeZone,
      // simulatedMin: simulatedMin.toISOString(),
      // simulatedMax: simulatedMax.toISOString(),
      minUTC: minUTC && isValidDate(minUTC) ? minUTC.toISOString() : null,
      maxUTC: maxUTC && isValidDate(maxUTC) ? maxUTC.toISOString() : null,
    });

    const isInRange = getIsInRange(minUTC, maxUTC);

    if (isValidDate(val)) {
      if (isInRange(val)) {
        // clearInternalErrorMessage();
        console.log('🌈is in range');
      } else {
        // if (isOnOrBefore(val, minUTC)) {
        if (isOnOrBeforeDateAndTime(val, minUTC)) {
          // setInternalErrorMessage(
          //   `Date must be after ${getFormattedDateString(min, locale)}`,
          // );
          console.log('🌈🌈🌈date must be after', {
            val: val?.toISOString(),
            minUTC: minUTC?.toISOString(),
          });
        } else {
          // setInternalErrorMessage(
          //   `Date must be before ${getFormattedDateString(max, locale)}`,
          // );
          console.log('❌❌❌date must be before', {
            val: val?.toISOString(),
            maxUTC: maxUTC?.toISOString(),
          });
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

const isOnOrBeforeDateAndTime = (date: DateType, dateToCompare: DateType) => {
  return (
    isValidDate(date) &&
    isValidDate(dateToCompare) &&
    (isSameUTCDayAndTime(date, dateToCompare) || isBefore(date, dateToCompare))
  );
};
