/**
 * Creates a Date object for a given UTC offset.
 * @internal
 */
// This API is less than perfect,
// but we shouldn't be constructing many (if any)
// TZ dependent dates other than for testing
export const newTZDate = (
  UTCOffset = 0,
  ...args: Parameters<typeof Date.UTC>
): Date => {
  const [y, m, d, h, ...rest] = args;
  const hour = (h ?? 0) - UTCOffset;
  return new Date(Date.UTC(y, m, d, hour, ...rest));
};
