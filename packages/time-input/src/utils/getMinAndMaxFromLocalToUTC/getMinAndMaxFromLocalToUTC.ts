import {
  DateType,
  newTZDate,
  SupportedLocales,
} from '@leafygreen-ui/date-utils';

import { getFormatPartsValues } from '../getFormatPartsValues';

/**
 * Returns the min and max UTC date objects for the given min and max date objects and time zone.
 * @param newDate - The new date object to use to get the local month, day, and year parts
 * @param min - The min date object in UTC. The min date object is used to get the UTC hour, minute, and second parts.
 * @param max - The max date object in UTC. The max date object is used to get the UTC hour, minute, and second parts.
 * @param timeZone - The time zone
 * @param locale - The locale
 * @returns The min and max UTC date objects
 */
export const getMinAndMaxFromLocalToUTC = ({
  newDate,
  min,
  max,
  timeZone,
}: {
  newDate: DateType;
  min: DateType;
  max: DateType;
  timeZone: string;
}) => {
  if (!min || !max || !newDate) {
    return { minUTC: null, maxUTC: null };
  }

  // The local month, day, and year of the new date
  const { month, day, year } = getFormatPartsValues({
    locale: SupportedLocales.ISO_8601,
    timeZone,
    value: newDate,
  });

  // With the local month, day, and year parts, along with the UTC hour, minute, and second parts a UTC date object is created. If the min/max is 08, it will be 08 in every time zone. E.g. 08 in New York, 08 in London, 08 in Tokyo, etc.
  const minUTC = newTZDate({
    year: Number(year),
    month: Number(month) - 1,
    date: Number(day),
    hours: min.getUTCHours(),
    minutes: min.getUTCMinutes(),
    seconds: min.getUTCSeconds(),
    timeZone,
  });

  const maxUTC = newTZDate({
    year: Number(year),
    month: Number(month) - 1,
    date: Number(day),
    hours: max.getUTCHours(),
    minutes: max.getUTCMinutes(),
    seconds: max.getUTCSeconds(),
    timeZone,
  });

  return { minUTC, maxUTC };
};
