import { waitForElementToBeRemoved } from '@testing-library/react';

export async function expectElementToNotBeRemoved(element: HTMLElement) {
  try {
    await waitForElementToBeRemoved(element);
    throw new Error('Expected to catch error.');
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    if (error instanceof Error) {
      expect(error.toString()).toMatch(
        'Timed out in waitForElementToBeRemoved.',
      );
    }
  }
}
