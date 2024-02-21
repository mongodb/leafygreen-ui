import { getDocument, getError } from '../utils';

/**
 * TODO: Add description here
 * @param testId
 * @returns
 */
export const getByLgId = (testId: string) => {
  const container = getDocument();
  const dataString = `[data-lgid="${testId}"]`;
  const element = container.querySelectorAll(dataString);

  // TODO: console the container
  if (!element.length) {
    throw getError(`Unable to find an element by ${dataString}`);
  }

  // TODO: console the elements
  if (element.length > 1) {
    throw getError(`Found multiple elements by ${dataString}`);
  }

  return element[0];
};
