import { Month } from '../../constants';
import { testTimeZones } from '../testValues';

import { mockTimeZone } from '.';

describe('packages/date-picker/testutils/mockTimeZone', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe.each(testTimeZones)('$tz', ({ tz, UTCOffset }) => {
    beforeEach(() => {
      mockTimeZone(tz, UTCOffset);
    });

    test('midnight local', () => {
      const mockToday = new Date(Date.UTC(2020, Month.October, 14, -UTCOffset));
      jest.setSystemTime(mockToday);

      expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(tz);
      expect(mockToday.getTimezoneOffset()).toBe(UTCOffset * 60);

      const now = new Date(Date.now());
      expect(now.getDate()).toBe(14);
      expect(now.getHours()).toBe(0);
      expect(now.getMinutes()).toBe(0);
    });

    test('midnight UTC', () => {
      const mockToday = new Date(Date.UTC(2020, Month.December, 25, 0));
      jest.setSystemTime(mockToday);

      expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(tz);
      expect(mockToday.getTimezoneOffset()).toBe(UTCOffset * 60);

      const now = new Date(Date.now());
      expect(now.getDate()).toBe(UTCOffset < 0 ? 24 : 25);
      expect(now.getHours()).toBe(UTCOffset < 0 ? 24 + UTCOffset : UTCOffset);
      expect(now.getMinutes()).toBe(0);
    });

    test('maintains default `toLocaleString(...args)` behavior', () => {
      const date = new Date(Date.UTC(2020, Month.December, 25, 0));
      expect(date.toLocaleString('en-US', { month: 'long' })).toEqual(
        'December',
      );
    });
  });

  test('restores mocks appropriately', () => {
    jest.useRealTimers();

    const now = new Date(Date.now());
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBeDefined();
    expect(now.getTimezoneOffset()).toBeDefined();

    expect(now.getDate()).toBeDefined();
    expect(now.getHours()).toBeDefined();
    expect(now.getMinutes()).toBeDefined();
  });
});
