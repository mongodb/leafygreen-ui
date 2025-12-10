import { useEffect, useState } from 'react';

import { DateType, isValidDate } from '@leafygreen-ui/date-utils';
import { usePrevious } from '@leafygreen-ui/hooks';

import { UnitOption } from '../../TimeInputSelect/TimeInputSelect.types';

interface UseSelectUnitReturn {
  selectUnit: UnitOption;
  setSelectUnit: (selectUnit: UnitOption) => void;
}

interface UseSelectUnitOptions {
  onUpdate: (newSelectUnit: UnitOption, prevSelectUnit?: UnitOption) => void;
}

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

  // Save the previous 12 hour format
  const prevIs12HourFormat = usePrevious(is12HourFormat);

  // Update the select unit if the date, timeZone, or locale(12h/24h) changes
  useEffect(() => {
    // console.log('useEffect 🍎🍎🍎', { prevIs12HourFormat, is12HourFormat });

    const hasFormatChanged = prevIs12HourFormat !== is12HourFormat;
    const isValueValid = isValidDate(value);

    /**
     * Run this effect if the format has changed from 12h to 24h or 24h to 12h OR if the date is valid and the format is 12h.
     *
     * If the format has changed, the value doesn't matter if the format is 24h. This should update the state but not call onUpdate only the presentational format changed.
     *
     * If the date changes and is valid then update the select unit. The date could be new or the timeZone could have changed.
     */
    if (hasFormatChanged || (isValueValid && is12HourFormat)) {
      // console.log('useSelectUnit > useEffect  🥺🍎🥺');
      const selectUnitOption = findSelectUnit(dayPeriod, unitOptions);
      setSelectUnitState(selectUnitOption);
    }
  }, [
    value,
    dayPeriod,
    unitOptions,
    setSelectUnitState,
    prevIs12HourFormat,
    is12HourFormat,
  ]);

  /**
   * Set the select unit and call onUpdate callback if the select unit has changed.
   *
   * @param selectUnit - The select unit to set
   */
  const setSelectUnit = (selectUnit: UnitOption) => {
    setSelectUnitState(selectUnit);

    const hasSelectUnitChanged = selectUnit !== selectUnitState;

    if (hasSelectUnitChanged) {
      onUpdate?.(selectUnit, { ...selectUnitState });
    }
  };

  return { selectUnit: selectUnitState, setSelectUnit };
};
