import { addMinutes } from 'date-fns';

export const getUTCDateString = (date: Date): string => {
  const utcOffsetMins = date.getTimezoneOffset();

  // Create a timestamp that, when printed in local time,
  // appears as the UTC equivalent of the provided date
  const fakeUTCDate = addMinutes(date, utcOffsetMins);

  const utcDateString = fakeUTCDate.toDateString();
  return utcDateString;
};
