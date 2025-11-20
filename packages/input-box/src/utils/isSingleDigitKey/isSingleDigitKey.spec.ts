import range from 'lodash/range';

import { keyMap } from '@leafygreen-ui/lib';

import { isSingleDigitKey } from './isSingleDigitKey';

describe('packages/input-box/utils/isSingleDigit', () => {
  test.each(range(10))('returns true for %i character', i => {
    expect(isSingleDigitKey(`${i}`)).toBe(true);
  });

  test.each(Object.values(keyMap))('returns false for %s', key => {
    expect(isSingleDigitKey(key)).toBe(false);
  });
});
