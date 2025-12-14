import { newUTCFromTimeZone } from '@leafygreen-ui/date-utils';

import { TimeSegmentsState } from '../../shared.types';
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
  dateValues: {
    day: string;
    month: string;
    year: string;
  };
  dayPeriod: string;
}) => {
  const { day, month, year } = dateValues;
  const { hour, minute, second } = segments;

  const convertedHour = is12HourFormat
    ? convert12hTo24h(hour, dayPeriod)
    : hour;

  /**
   * Check if all segments are filled and valid. If they are, return the UTC date.
   */
  if (
    isEverySegmentFilled(segments) &&
    isEverySegmentValid({ segments, is12HourFormat })
  ) {
    return newUTCFromTimeZone({
      year,
      month,
      day,
      hour: convertedHour,
      minute,
      second,
      timeZone,
    });
  }

  /**
   * Check if any segments are filled. If not, return null. This means all segments are empty.
   */
  if (!doesSomeSegmentExist(segments)) {
    return null;
  }

  /**
   * Return an invalid date object if some segments are empty or invalid.
   */
  return new Date('invalid');
};
