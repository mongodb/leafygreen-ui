import { DateType, LocaleString } from '@leafygreen-ui/date-utils';

import { unitOptions } from '../../../../constants';
import { DayPeriod } from '../../../../shared.types';
import {
  findUnitOptionByDayPeriod,
  getFormatPartsValues,
  getPaddedTimeSegmentsFromDate,
} from '../../../../utils';
import { TimeSegmentsAndSelectUnitState } from '../../useTimeSegmentsAndSelectUnit.types';

/**
 * Gets the initial state for the useTimeSegmentsAndSelect hook
 */
export const getInitialState = (
  date: DateType,
  locale: LocaleString,
  timeZone: string,
): TimeSegmentsAndSelectUnitState => {
  const { dayPeriod } = getFormatPartsValues({
    locale,
    timeZone,
    value: date,
  });

  const initialSelectUnitOption = findUnitOptionByDayPeriod(
    dayPeriod as DayPeriod,
    unitOptions,
  );

  return {
    segments: getPaddedTimeSegmentsFromDate(date, locale, timeZone),
    selectUnit: initialSelectUnitOption,
  };
};
