import { makeSingleQuery } from '../utils';

/**
 * TODO: Add description here
 * @param testId
 * @returns
 */
export const getByLgId = (testId: string) => {
  const getBy = makeSingleQuery();
  return getBy(testId);
};
