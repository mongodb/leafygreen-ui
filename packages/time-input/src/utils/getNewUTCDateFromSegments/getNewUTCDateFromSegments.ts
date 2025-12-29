import { newTZDate } from '@leafygreen-ui/date-utils';

import { DateParts, TimeSegmentsState } from '../../shared.types';
import { DayPeriod } from '../../shared.types';
import { convert12hTo24h } from '../convert12hTo24h/convert12hTo24h';
import { doesSomeSegmentExist } from '../doesSomeSegmentExist/doesSomeSegmentExist';
import { isEverySegmentFilled } from '../isEverySegmentFilled/isEverySegmentFilled';
import { isEverySegmentValid } from '../isEverySegmentValid/isEverySegmentValid';

/**
 * Takes local time segments, creates a local date object and converts it to UTC.
 *
 * @param segments - The segments to create the date from
 * @param is12HourFormat - Whether the time is in 12 hour format
 * @param dateValues - The date values to create the date from
 * @param timeZone - The time zone to create the date in
 * @returns The either a new date object in UTC, null, or an invalid date object
 */
export const getNewUTCDateFromSegments = ({
  segments,
  is12HourFormat,
  dateValues,
  timeZone,
  dayPeriod,
}: {
  segments: TimeSegmentsState;
  is12HourFormat: boolean;
  timeZone: string;
  dateValues: DateParts;
  dayPeriod: DayPeriod;
}) => {
  const { day, month, year } = dateValues;
  const { hour, minute, second } = segments;

  const converted12hTo24hHour = is12HourFormat
    ? convert12hTo24h(Number(hour), dayPeriod)
    : hour;

  /**
   * All segments are empty
   */
  if (!doesSomeSegmentExist(segments)) {
    return null;
  }

  /**
   * Not all segments are filled or valid
   */
  if (
    !isEverySegmentFilled(segments) ||
    !isEverySegmentValid({ segments, is12HourFormat })
  ) {
    return new Date('invalid');
  }

  /**
   * All segments are filled and valid (not necessarily explicit)
   */
  return newTZDate({
    year: Number(year),
    month: Number(month) - 1,
    date: Number(day),
    hours: Number(converted12hTo24hHour),
    minutes: Number(minute),
    seconds: Number(second),
    timeZone,
  });
};
