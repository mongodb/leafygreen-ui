import { consoleOnce } from '@leafygreen-ui/lib';
import { isBefore } from 'date-fns';
import { getISODate } from '../getISODate/getISODate';
import { isValidDate } from '../isValidDate/isValidDate';
import { DateType } from '../types';

// TODO: should be time only portion of the ISOString
/**
 * Returns the Date and Time portion of the ISOString for a given date
 * i.e. 2023-11-01T00:00:00.000Z => 2023-11-01
 */
export const getISODateAndTime = (date: DateType): string => {
  if (!isValidDate(date)) return '';

  return date.toISOString();
};

/**
 * This function is used to get the min and max dates for a component.
 * It will return the default min and max dates if the provided min and max are not valid.
 * It will also console an error if the provided min and max are not valid.
 *
 * @param {Object} params
 * @param {Date | null} params.min - The min date to check
 * @param {Date | null} params.max - The max date to check
 * @param {Date} params.defaultMin - The default min date
 * @param {Date} params.defaultMax - The default max date
 * @param {string} params.componentName - The name of the component
 * @returns - The min and max dates
 */
export const getMinMax = ({
  min,
  max,
  defaultMin,
  defaultMax,
  componentName,
  consoleLogDatePortionOnly,
}: {
  min: Date | null;
  max: Date | null;
  defaultMin: Date;
  defaultMax: Date;
  componentName: string;
  consoleLogDatePortionOnly?: boolean;
}): [Date, Date] => {
  const defaultRange: [Date, Date] = [defaultMin, defaultMax];
  const getISODateFormat = consoleLogDatePortionOnly
    ? getISODate
    : getISODateAndTime;

  // if both are defined
  if (min && max) {
    if (isBefore(max, min)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided max date (${getISODateFormat(
          max,
        )}) is before provided min date (${getISODateFormat(
          min,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [min, max];
  } else if (min) {
    if (isBefore(defaultMax, min)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided min date (${getISODateFormat(
          min,
        )}) is after the default max date (${getISODateFormat(
          defaultMax,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [min, defaultMax];
  } else if (max) {
    if (isBefore(max, defaultMin)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided max date (${getISODateFormat(
          max,
        )}) is before the default min date (${getISODateFormat(
          defaultMin,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [defaultMin, max];
  }

  return defaultRange;
};
