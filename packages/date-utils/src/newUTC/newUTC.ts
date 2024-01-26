/** Creates a new UTC date */
export const newUTC = (...args: Parameters<typeof Date.UTC>): Date => {
  return new Date(Date.UTC(...args));
};
