import { isBefore } from 'date-fns';

import { consoleOnce } from '@leafygreen-ui/lib';

import { getISODate } from '../getISODate/getISODate';
import { getISOTime } from '../getISOTime';

const LogMessage = {
  Date: 'date',
  Time: 'time',
} as const;

type LogMessage = (typeof LogMessage)[keyof typeof LogMessage];

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
 * @param {LogMessage} params.logMessage - The type of log to use
 *   - Date: Log the date portion of the date
 *   - Time: Log the time portion of the date
 * @returns - The min and max dates
 */
export const getMinMax = ({
  min,
  max,
  defaultMin,
  defaultMax,
  componentName,
  logMessage = LogMessage.Date,
}: {
  min: Date | null;
  max: Date | null;
  defaultMin: Date;
  defaultMax: Date;
  componentName: string;
  logMessage?: LogMessage;
}): [Date, Date] => {
  const defaultRange: [Date, Date] = [defaultMin, defaultMax];
  const getISODateFormat =
    logMessage === LogMessage.Date ? getISODate : getISOTime;
  const defaultMaxDate = getISODateFormat(defaultMax);
  const defaultMinDate = getISODateFormat(defaultMin);
  const maxDate = getISODateFormat(max);
  const minDate = getISODateFormat(min);
  const errorType = logMessage === LogMessage.Date ? 'date' : 'time';

  // if both are defined
  if (min && max) {
    if (isBefore(max, min)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided max ${errorType} (${maxDate}) is before provided min ${errorType} (${minDate}). Using default values.`,
      );
      return defaultRange;
    }

    return [min, max];
  } else if (min) {
    if (isBefore(defaultMax, min)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided min ${errorType} (${minDate}) is after the default max ${errorType} (${defaultMaxDate}). Using default values.`,
      );
      return defaultRange;
    }

    return [min, defaultMax];
  } else if (max) {
    if (isBefore(max, defaultMin)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided max ${errorType} (${maxDate}) is before the default min ${errorType} (${defaultMinDate}). Using default values.`,
      );
      return defaultRange;
    }

    return [defaultMin, max];
  }

  return defaultRange;
};
