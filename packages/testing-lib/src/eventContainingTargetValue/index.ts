/**
 * Returns a jest object containing the expected target value
 */
export const eventContainingTargetValue = (value: any) =>
  expect.objectContaining({
    target: expect.objectContaining({ value }),
  });
