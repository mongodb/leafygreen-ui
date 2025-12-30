import { DayPeriod, UnitOption, UnitOptions } from '../../shared.types';

/**
 * Finds the select unit option based on the day period.
 *
 * @param dayPeriod - The day period to use for the select unit.
 * @param unitOptions - The valid unit options to use for the select unit.
 * @returns The select unit option or the first unit option if the day period is not found
 */
export const findUnitOptionByDayPeriod = (
  dayPeriod: DayPeriod,
  unitOptions: UnitOptions,
): UnitOption => {
  const selectUnitOption = unitOptions.find(
    option => option.displayName === dayPeriod,
  );

  return selectUnitOption ?? unitOptions[0];
};
