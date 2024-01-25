import { Month, newUTC } from '@leafygreen-ui/date-utils';

import { getMaxSegmentValue } from '.';

describe('packages/date-picker/utils/getMaxSegmentValue', () => {
  describe('day', () => {
    test('returns 31 by default', () => {
      expect(getMaxSegmentValue('day')).toBe(31);
    });
    test('returns max day in provided month', () => {
      expect(
        getMaxSegmentValue('day', { date: newUTC(2023, Month.February, 14) }),
      ).toBe(28);
    });
  });

  describe('month', () => {
    test('returns 12 by default', () => {
      expect(getMaxSegmentValue('month')).toBe(12);
    });
  });

  describe('year', () => {
    test('returns 2038 by default', () => {
      expect(getMaxSegmentValue('year')).toBe(2038);
    });

    test('returns provided max year', () => {
      expect(
        getMaxSegmentValue('year', { max: newUTC(2003, Month.December, 26) }),
      ).toBe(2003);
    });
  });
});
