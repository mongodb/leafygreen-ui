/**
 * Creates a Date object for a given UTC offset
 */
export const newTZDate = (
  UTCOffset = 0,
  ...args: Parameters<typeof Date.UTC>
): Date => {
  const [y, m, d, h, ...rest] = args;
  const hour = (h ?? 0) - UTCOffset;
  return new Date(Date.UTC(y, m, d, hour, ...rest));
};
