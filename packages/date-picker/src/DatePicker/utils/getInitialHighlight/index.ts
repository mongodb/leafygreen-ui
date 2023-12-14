import {
  DateType,
  getSimulatedTZDate,
  isValidDate,
  setToUTCMidnight,
} from '@leafygreen-ui/date-utils';

/** Returns the initial highlight value when the date picker is opened */
export const getInitialHighlight = (
  value: DateType | undefined,
  today: Date,
  timeZone: string,
) => {
  if (isValidDate(value)) return value;

  // return the UTC-midnight representation of the local `today`
  // e.g. given `today` = "2023-12-24T12:00:00Z", and `timeZone` = 'Pacific/Auckland' (UTC+13)
  // Locally, the date is `2023-12-25`, and so we should return that date
  const simulatedToday = getSimulatedTZDate(today, timeZone);
  return setToUTCMidnight(simulatedToday);
};
