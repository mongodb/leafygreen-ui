import React, { createContext, PropsWithChildren, useContext } from 'react';

import {
  DateType,
  // isInRange as getIsInRange,
  // isValidDate,
} from '@leafygreen-ui/date-utils';

import {
  TimeInputContextProps,
  TimeInputProviderProps,
} from './TimeInputContext.types';
import { useTimeInputComponentRefs } from './useTimeInputComponentRefs';
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

  // const { locale, timeZone, min, max } = useTimeInputDisplayContext();

  const setValue = (newVal?: DateType) => {
    _setValue(newVal ?? null);
  };

  const handleValidation = (val?: DateType) => {
    // the min/max is in UTC but I only need the time portion.
    // I need check if the min/max are valid dates.
    // If they are not valid then use defaults.
    // If they are valid check if the min is after the min or max is before the min. If so then use defaults.
    // After those checks, then I have the correct min/max dates to use.
    // I need to take the month, day, year from the val prop and update the month, day, and year of the min/max.
    // Once I have my updated min/max dates, I need to check if the val is in the range.
    // If it is in range then all good. clear error message if there is one.
    // if it is not in range, I need to convert that value based on the timezone and locale and then use that converted date in the error message.

    // const createNewDate = ({
    //   date,
    //   month,
    //   day,
    //   year,
    // }: {
    //   date: DateType;
    //   month: string;
    //   day: string;
    //   year: string;
    // }) => {
    //   const yearNumber = Number(year);
    //   const monthNumber = Number(month) - 1;
    //   const dayNumber = Number(day);
    //   return new Date(
    //     yearNumber,
    //     monthNumber,
    //     dayNumber,
    //     date.getHours(),
    //     date.getMinutes(),
    //     date.getSeconds(),
    //   );
    // };

    // if (isValidDate(val)) {
    //   const { month, day, year } = getFormatPartsValues({
    //     locale: locale,
    //     timeZone: timeZone,
    //     value: val,
    //   });

    //   const newMin = createNewDate({ date: min, month, day, year });
    // const newMax = createNewDate({ date: max, month, day, year });

    // const isInRange = getIsInRange(min, max);
    // }

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
