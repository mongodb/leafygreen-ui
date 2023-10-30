/**
 * Returns a new date set to midnight
 */
export const setToUTCMidnight = (date: Date): Date => {
  const midnight = new Date(date);
  midnight.setUTCHours(0);
  midnight.setUTCMinutes(0);
  midnight.setUTCSeconds(0);
  midnight.setUTCMilliseconds(0);
  return midnight;
};

/** @deprecated */
export const setToMidnight = (date: Date): Date => {
  const midnight = new Date(date);
  midnight.setHours(0);
  midnight.setMinutes(0);
  midnight.setSeconds(0);
  midnight.setMilliseconds(0);
  return midnight;
};
