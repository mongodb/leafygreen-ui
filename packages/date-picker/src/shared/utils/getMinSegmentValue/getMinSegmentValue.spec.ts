import { Month, newUTC } from '@leafygreen-ui/date-utils';

import { getMinSegmentValue } from '.';

describe('packages/date-picker/utils/getMinSegmentValue', () => {
  describe('day', () => {
    test('returns 1 by default', () => {
      expect(getMinSegmentValue('day')).toBe(1);
    });
  });

  describe('month', () => {
    test('returns 1 by default', () => {
      expect(getMinSegmentValue('month')).toBe(1);
    });
  });

  describe('year', () => {
    test('returns 1970 by default', () => {
      expect(getMinSegmentValue('year')).toBe(1970);
    });

    test('returns provided min year', () => {
      expect(
        getMinSegmentValue('year', { min: newUTC(1967, Month.March, 10) }),
      ).toBe(1967);
    });
  });
});
