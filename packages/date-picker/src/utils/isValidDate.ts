/** Returns whether the provided string is a valid date */
export const isValidDate = (str: string) => {
  return !isNaN(Date.parse(str));
};
