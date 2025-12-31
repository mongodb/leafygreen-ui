import { mockTimeZone } from '../testing/mockTimeZone';

import { getISOTime } from './getISOTime';

describe('packages/date-utils/getISOTime', () => {
  describe('when the date is valid', () => {
    const TZOffset = -4;
    const americaNewYorkTimeZone = 'America/New_York';

    beforeEach(() => {
      mockTimeZone(americaNewYorkTimeZone, TZOffset);
    });
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('returns the time portion of the ISOString when the date is in UTC', () => {
      const date = new Date('2023-11-01T10:00Z');
      const result = getISOTime(date);
      expect(result).toBe('10:00:00.000Z');
    });

    test('returns the time portion of the ISOString when the date is in local time', () => {
      const date = new Date('2023-11-01T10:00:00');
      const result = getISOTime(date);
      expect(result).toBe('14:00:00.000Z');
    });
  });

  test('returns an empty string when the date is invalid', () => {
    const date = new Date('invalid');
    const result = getISOTime(date);
    expect(result).toBe('');
  });
});
