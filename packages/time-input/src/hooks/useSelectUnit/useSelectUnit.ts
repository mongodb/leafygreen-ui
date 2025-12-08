import { useEffect, useState } from 'react';

import { DateType, isValidDate, LocaleString } from '@leafygreen-ui/date-utils';

import { UnitOption } from '../../TimeInputSelect/TimeInputSelect.types';
import { usePrevious } from '@leafygreen-ui/hooks';

interface UseSelectUnitReturn {
  selectUnit: UnitOption;
  // setSelectUnit: React.Dispatch<React.SetStateAction<UnitOption>>;
  setSelectUnit: (selectUnit: UnitOption) => void;
}

type UseSelectUnitOptions = {
  onUpdate: (newSelectUnit: UnitOption, prevSelectUnit?: UnitOption) => void;
};

/**
 * Finds the select unit option based on the day period.
 *
 * @param dayPeriod - The day period to use for the select unit.
 * @param unitOptions - The valid unit options to use for the select unit.
 * @returns The select unit option.
 */
const findSelectUnit = (
  dayPeriod: string,
  unitOptions: Array<UnitOption>,
): UnitOption => {
  const selectUnitOption = unitOptions.find(
    option => option.displayName === dayPeriod,
  ) as UnitOption;
  return selectUnitOption;
};

/**
 * Hook to manage the select unit.
 *
 * @param dayPeriod - The day period to use for the select unit.
 * @param value - The date value passed to the TimeInput component.
 * @param unitOptions - The valid unit options to use for the select unit.
 * @returns The select unit and the setSelectUnit function.
 */
export const useSelectUnit = ({
  dayPeriod,
  value,
  unitOptions,
  is12HourFormat,
  timeZone,
  options: { onUpdate },
}: {
  dayPeriod: string;
  value: DateType | undefined;
  unitOptions: Array<UnitOption>;
  is12HourFormat: boolean;
  timeZone: string;
  options: UseSelectUnitOptions;
}): UseSelectUnitReturn => {
  const selectUnitOption = findSelectUnit(dayPeriod, unitOptions);
  const [selectUnitState, setSelectUnitState] =
    useState<UnitOption>(selectUnitOption);

  const prevIs12HourFormat = usePrevious(is12HourFormat);
  // if the date is the same and so is the timezone, then don't trigger an update.
  const prevDate = usePrevious(value);
  const prevTimeZone = usePrevious(timeZone);

  // if was previously 12 hour format, and then is now 24 hour format, don't trigger an update
  // if was previously 24 hour format, and then is now 12 hour format, don't trigger an update

  // useEffect(() => {
  //   onUpdate?.(selectUnit, selectUnit);
  // }, [selectUnit, onUpdate]);

  useEffect(() => {
    // console.log('useEffect 🍎🍎🍎', { prevIs12HourFormat, is12HourFormat });
    // if (prevIs12HourFormat !== is12HourFormat) {
    //   return;
    // }
    const isSameTimeZone = prevTimeZone === timeZone;
    const isSameDate = isSameUTCDayAndTime(value, prevDate);
    const isSameDateAndTimeZone = isSameDate && isSameTimeZone;

    const haveFormatChanged = prevIs12HourFormat !== is12HourFormat;
    const isValueValid = isValidDate(value);
    const shouldUpdate = isValueValid && !haveFormatChanged;

    // console.log('useSelectUnit > useEffect > 🥺', {
    //   prevIs12HourFormat,
    //   haveFormatChanged,
    //   is12HourFormat,
    //   dayPeriod,
    //   isSameDate,
    //   isSameTimeZone,
    //   isSameDateAndTimeZone,
    // });

    // if is12hourFormat is true and hasFormChanged is true then update the select unit but don't call onUpdate because the unit didn't really change.

    // This should update the state but not call onUpdate because the unit didn't really change.
    if (haveFormatChanged) {
      // console.log('useSelectUnit > useEffect > haveFormatChanged  🥺🍎🌈');
      setSelectUnitState(findSelectUnit(dayPeriod, unitOptions));
    }

    // TODO: this is still firing when switching from 12 hour format to 24 hour format. IS this because of strictmode?
    // Only update the select unit if the value is valid. This way the previous valid value is not lost.
    if (shouldUpdate) {
      // console.log('useSelectUnit > useEffect > shouldUpdate check  🍎');
      const selectUnitOption = findSelectUnit(dayPeriod, unitOptions);

      const haveSelectUnitChanged = selectUnitOption !== selectUnitState;

      if (haveSelectUnitChanged) {
        // console.log('useSelectUnit > useEffect > haveSelectUnitChanged  🍎🌈');
        setSelectUnitState(selectUnitOption);

        // if the timezone has changed don't call onUpdate because presentation value has changes but the underlying value has not.
        if (!isSameDate) {
          // console.log(
          //   'useSelectUnit > useEffect > isSameDateAndTimeZone  👿👿👿',
          //   {
          //     isSameDateAndTimeZone,
          //     value,
          //     prevDate,
          //     timeZone,
          //     prevTimeZone,
          //   },
          // );
          onUpdate?.(selectUnitOption, { ...selectUnitState });
        }
      }
    }
  }, [
    value,
    dayPeriod,
    unitOptions,
    setSelectUnitState,
    onUpdate,
    prevIs12HourFormat,
    is12HourFormat,
  ]);

  const setSelectUnit = (selectUnit: UnitOption) => {
    setSelectUnitState(selectUnit);

    const haveSelectUnitChanged = selectUnit !== selectUnitState;

    // console.log('setSelectUnit 🍌', {
    //   selectUnit,
    //   selectUnitState,
    //   haveSelectUnitChanged,
    // });

    if (haveSelectUnitChanged) {
      // console.log('setSelectUnit > haveSelectUnitChanged  🍌🍌🍌', {
      //   selectUnit,
      //   selectUnitState,
      //   haveSelectUnitChanged,
      // });
      onUpdate?.(selectUnit, { ...selectUnitState });
    }
  };

  return { selectUnit: selectUnitState, setSelectUnit };
};

export const isSameUTCDayAndTime = (
  day1?: DateType,
  day2?: DateType,
): boolean => {
  if (!isValidDate(day1) || !isValidDate(day2)) return false;

  const isSame =
    day1.getUTCDate() === day2.getUTCDate() &&
    day1.getUTCMonth() === day2.getUTCMonth() &&
    day1.getUTCFullYear() === day2.getUTCFullYear() &&
    day1.getUTCHours() === day2.getUTCHours() &&
    day1.getUTCMinutes() === day2.getUTCMinutes() &&
    day1.getUTCSeconds() === day2.getUTCSeconds() &&
    day1.getUTCMilliseconds() === day2.getUTCMilliseconds();

  // console.log('isSameUTCDayAndTime 🪢🪢🪢', {
  //   isSame,
  //   day1,
  //   day2,
  // });

  return isSame;
};
