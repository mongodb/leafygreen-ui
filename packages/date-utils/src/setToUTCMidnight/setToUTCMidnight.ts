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
