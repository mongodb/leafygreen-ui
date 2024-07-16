import { createRef } from 'react';

import { DescendantsList } from '../../Descendants';

import { getRelativeDescendant } from './getRelativeDescendant';

const testIds = ['abc', 'defg', 'hijk', 'lmnop', 'qrst', 'uvw', 'xyz'];

describe('packages/descendants/utils/getRelativeDescendant', () => {
  const testDescendants: DescendantsList = testIds.map((id, index) => ({
    id,
    index,
    element: document.createElement('div'),
    ref: createRef(),
  }));

  test('+1 returns the following descendant', () => {
    const current = testDescendants[1];
    const nextDescendant = getRelativeDescendant(1, current, testDescendants);
    expect(nextDescendant).toEqual(testDescendants[2]);
  });

  test('+3 returns the descendant 3 elements away', () => {
    const current = testDescendants[1];
    const nextDescendant = getRelativeDescendant(3, current, testDescendants);
    expect(nextDescendant).toEqual(testDescendants[4]);
  });

  test('loops around to the first descendant', () => {
    const current = testDescendants[testDescendants.length - 1];
    const nextDescendant = getRelativeDescendant(1, current, testDescendants);
    expect(nextDescendant).toEqual(testDescendants[0]);
  });

  test('-1 returns the preceding descendant', () => {
    const current = testDescendants[1];
    const nextDescendant = getRelativeDescendant(-1, current, testDescendants);
    expect(nextDescendant).toEqual(testDescendants[0]);
  });

  test('-3 returns the descendant 3 elements preceding', () => {
    const current = testDescendants[4];
    const nextDescendant = getRelativeDescendant(-3, current, testDescendants);
    expect(nextDescendant).toEqual(testDescendants[1]);
  });

  test('loops around to the last descendant', () => {
    const current = testDescendants[0];
    const nextDescendant = getRelativeDescendant(-1, current, testDescendants);
    expect(nextDescendant).toEqual(testDescendants[testDescendants.length - 1]);
  });
});
