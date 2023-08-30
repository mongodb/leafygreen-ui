import { isUndefined } from 'lodash';

/** Returns whether the provided string is a valid date */
export const isValidDate = (str?: string): str is string => {
  return !isUndefined(str) && !isNaN(Date.parse(str));
};
