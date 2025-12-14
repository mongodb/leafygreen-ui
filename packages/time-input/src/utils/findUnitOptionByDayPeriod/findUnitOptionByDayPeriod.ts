import { UnitOption } from '../../TimeInputSelect/TimeInputSelect.types';

/**
 * Finds the select unit option based on the day period.
 *
 * @param dayPeriod - The day period to use for the select unit.
 * @param unitOptions - The valid unit options to use for the select unit.
 * @returns The select unit option.
 */
export const findUnitOptionByDayPeriod = (
  dayPeriod: string,
  unitOptions: Array<UnitOption>,
): UnitOption => {
  const selectUnitOption = unitOptions.find(
    option => option.displayName === dayPeriod,
  ) as UnitOption;
  return selectUnitOption;
};
