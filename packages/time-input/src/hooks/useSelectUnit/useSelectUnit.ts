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
  options: { onUpdate },
}: {
  dayPeriod: string;
  value: DateType | undefined;
  unitOptions: Array<UnitOption>;
  is12HourFormat: boolean;
  options: UseSelectUnitOptions;
}): UseSelectUnitReturn => {
  const selectUnitOption = findSelectUnit(dayPeriod, unitOptions);
  const [selectUnitState, setSelectUnitState] =
    useState<UnitOption>(selectUnitOption);

  const prevIs12HourFormat = usePrevious(is12HourFormat);

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

    const haveFormatChanged = prevIs12HourFormat !== is12HourFormat;
    const isValueValid = isValidDate(value);
    const shouldUpdate = isValueValid && !haveFormatChanged;

    // TODO: this is still firing when switching from 12 hour format to 24 hour format. IS this because of strictmode?
    // Only update the select unit if the value is valid. This way the previous valid value is not lost.
    if (shouldUpdate) {
      console.log('useEffect 🍎🍎🍎');
      const selectUnitOption = findSelectUnit(dayPeriod, unitOptions);

      const haveSelectUnitChanged = selectUnitOption !== selectUnitState;

      if (haveSelectUnitChanged) {
        console.log('useEffect 🍎🍎🍎🌈🍎🍎🍎');
        setSelectUnitState(selectUnitOption);
        onUpdate?.(selectUnitOption, { ...selectUnitState });
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

    if (haveSelectUnitChanged) {
      onUpdate?.(selectUnit, { ...selectUnitState });
    }
  };

  return { selectUnit: selectUnitState, setSelectUnit };
};
