import { makeSingleQuery } from '../utils';

/**
 * TODO: Add description here
 * @param testId
 * @returns
 */
export const findByLgId = (testId: string) => {
  const findBy = makeSingleQuery();

  return waitFor(() => {
    return findBy(testId);
  });
};
