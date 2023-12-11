import { Month, newUTC } from '@leafygreen-ui/date-utils';

import { getMaxSegmentValue } from '.';

describe('packages/date-picker/utils/getMinSegmentValue', () => {
  describe('day', () => {
    test('returns 1 by default', () => {
      expect(getMaxSegmentValue('day')).toBe(31);
    });
    test.todo('returns max day in provided month');
  });

  describe('month', () => {
    test('returns 1 by default', () => {
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
