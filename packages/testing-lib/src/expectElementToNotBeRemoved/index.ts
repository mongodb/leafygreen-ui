import {
  prettyDOM,
  waitForElementToBeRemoved,
  waitForOptions,
} from '@testing-library/react';

/**
 * Throws an error if the element is removed.
 *
 * Waits for the element to be removed, and throws an error if it is removed.
 * Expects the `waitForElementToBeRemoved` call to throw a timeout error
 */
export async function expectElementToNotBeRemoved(
  element: HTMLElement,
  waitForOptions?: waitForOptions,
) {
  try {
    await waitForElementToBeRemoved(element, waitForOptions);
    throw new Error(`Element was removed: \n ${prettyDOM(element)}`);
  } catch (error) {
    if (error instanceof Error) {
      expect(error.toString()).toMatch(
        'Timed out in waitForElementToBeRemoved.',
      );
    }
  }
}
