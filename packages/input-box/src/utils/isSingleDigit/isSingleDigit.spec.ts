import range from 'lodash/range';

import { isSingleDigit } from './isSingleDigit';
import { keyMap } from '@leafygreen-ui/lib';

describe('packages/input-box/utils/isSingleDigit', () => {
  test.each(range(10))('returns true for %i character', i => {
    expect(isSingleDigit(`${i}`)).toBe(true);
  });

  test.each(Object.values(keyMap))('returns false for %s', key => {
    expect(isSingleDigit(key)).toBe(false);
  });
});
