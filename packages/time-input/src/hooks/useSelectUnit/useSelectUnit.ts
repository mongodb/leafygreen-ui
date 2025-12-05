import { useEffect, useState } from 'react';

import { DateType, isValidDate } from '@leafygreen-ui/date-utils';

import { UnitOption } from '../../TimeInputSelect/TimeInputSelect.types';

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
  options: { onUpdate },
}: {
  dayPeriod: string;
  value: DateType | undefined;
  unitOptions: Array<UnitOption>;
  options: UseSelectUnitOptions;
}): UseSelectUnitReturn => {
  const selectUnitOption = findSelectUnit(dayPeriod, unitOptions);
  const [selectUnitState, setSelectUnitState] =
    useState<UnitOption>(selectUnitOption);

  // useEffect(() => {
  //   onUpdate?.(selectUnit, selectUnit);
  // }, [selectUnit, onUpdate]);

  useEffect(() => {
    // Only update the select unit if the value is valid. This way the previous valid value is not lost.
    if (isValidDate(value)) {
      const selectUnitOption = findSelectUnit(dayPeriod, unitOptions);

      const haveSelectUnitChanged = selectUnitOption !== selectUnitState;

      if (haveSelectUnitChanged) {
        setSelectUnitState(selectUnitOption);
        onUpdate?.(selectUnitOption, { ...selectUnitState });
      }
    }
  }, [value, dayPeriod, unitOptions, setSelectUnitState]);

  const setSelectUnit = (selectUnit: UnitOption) => {
    setSelectUnitState(selectUnit);

    const haveSelectUnitChanged = selectUnit !== selectUnitState;

    if (haveSelectUnitChanged) {
      onUpdate?.(selectUnit, { ...selectUnitState });
    }
  };

  return { selectUnit: selectUnitState, setSelectUnit };
};
