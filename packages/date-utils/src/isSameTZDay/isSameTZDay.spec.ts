import { Month } from '../constants';

import { isSameTZDay } from './index';

describe('packages/date-utils/isSameTZDay', () => {
  const utc24 = new Date(Date.UTC(2023, Month.December, 24, 0, 0, 0));
  const utc25 = new Date(Date.UTC(2023, Month.December, 25, 0, 0, 0));
  const utc26 = new Date(Date.UTC(2023, Month.December, 26, 0, 0, 0));

  /** New York */
  describe('America/New_York', () => {
    // 20:00-23:59pm on Dec. 25 in New York (-5),
    // is 00:00-05:59 on Dec. 26 in UTC

    test('Before midnight local', () => {
      const nyc25 = new Date(Date.UTC(2023, Month.December, 25, 16, 0, 0)); // 11:00 on Dec. 25 in NYC
      expect(isSameTZDay(nyc25, utc25, 'America/New_York')).toBe(true);
      expect(isSameTZDay(nyc25, utc26, 'America/New_York')).toBe(false);
    });

    test('Before midnight local, different UTC day', () => {
      const nyc25 = new Date(Date.UTC(2023, Month.December, 26, 1, 0, 0)); // 20:00 on Dec. 25 in NYC
      expect(isSameTZDay(nyc25, utc25, 'America/New_York')).toBe(true);
      expect(isSameTZDay(nyc25, utc26, 'America/New_York')).toBe(false);
    });

    test('After midnight local', () => {
      const nyc26 = new Date(Date.UTC(2023, Month.December, 26, 5, 0, 0)); // 00:00 on Dec. 26 in NYC
      expect(isSameTZDay(nyc26, utc25, 'America/New_York')).toBe(false);
      expect(isSameTZDay(nyc26, utc26, 'America/New_York')).toBe(true);
    });
  });

  /** Honolulu */
  describe('Pacific/Honolulu', () => {
    // 14:00-23:59pm on Dec. 25 in Honolulu (-10),
    // is 00:00-05:59 on Dec. 26 in UTC
    test('Before midnight local', () => {
      const hnl25 = new Date(Date.UTC(2023, Month.December, 25, 16, 0, 0)); // 06:00 on Dec. 25 in HNL
      expect(isSameTZDay(hnl25, utc25, 'Pacific/Honolulu')).toBe(true);
      expect(isSameTZDay(hnl25, utc26, 'Pacific/Honolulu')).toBe(false);
    });

    test('Before midnight local, different UTC day', () => {
      const hnl25 = new Date(Date.UTC(2023, Month.December, 26, 1, 0, 0)); // 14:00 on Dec. 25 in HNL
      expect(isSameTZDay(hnl25, utc25, 'Pacific/Honolulu')).toBe(true);
      expect(isSameTZDay(hnl25, utc26, 'Pacific/Honolulu')).toBe(false);
    });

    test('After midnight local', () => {
      const hnl26 = new Date(Date.UTC(2023, Month.December, 26, 10, 0, 0)); // 00:00 on Dec. 26 in HNL
      expect(isSameTZDay(hnl26, utc26, 'Pacific/Honolulu')).toBe(true);
      expect(isSameTZDay(hnl26, utc25, 'Pacific/Honolulu')).toBe(false);
    });
  });

  /** London */
  describe('Europe/London', () => {
    // 00:00-23:59pm on Dec. 25 in London (+0),
    // is 00:00-23:59 on Dec. 26 in UTC (no change)
    test('Before midnight local', () => {
      const ldn25 = new Date(Date.UTC(2023, Month.December, 25, 23, 0, 0)); // 06:00 on Dec. 25 in HNL
      expect(isSameTZDay(ldn25, utc25, 'Europe/London')).toBe(true);
      expect(isSameTZDay(ldn25, utc26, 'Europe/London')).toBe(false);
    });

    test('After midnight local', () => {
      const ldn25 = new Date(Date.UTC(2023, Month.December, 25, 1, 0, 0)); // 06:00 on Dec. 25 in HNL
      expect(isSameTZDay(ldn25, utc25, 'Europe/London')).toBe(true);
      expect(isSameTZDay(ldn25, utc26, 'Europe/London')).toBe(false);
    });
  });

  describe('Pacific/Auckland', () => {
    // 00:00 - 11:59 on Dec. 26 in Auckland (+12)
    // is 12:00 - 23:59 on Dec. 25 in UTC

    test('Before midnight local', () => {
      const akl24 = new Date(Date.UTC(2023, Month.December, 24, 10, 0, 0)); // 23:00 on Dec. 24 in AKL
      expect(isSameTZDay(akl24, utc24, 'Pacific/Auckland')).toBe(true);
      expect(isSameTZDay(akl24, utc25, 'Pacific/Auckland')).toBe(false);
    });

    test('After midnight local, different UTC day', () => {
      const akl25 = new Date(Date.UTC(2023, Month.December, 24, 12, 0, 0)); // 00:00 on Dec. 25 in AKL
      expect(isSameTZDay(akl25, utc24, 'Pacific/Auckland')).toBe(false);
      expect(isSameTZDay(akl25, utc25, 'Pacific/Auckland')).toBe(true);
    });

    test('After midnight local, same UTC day', () => {
      const akl25 = new Date(Date.UTC(2023, Month.December, 25, 0, 0, 0)); // 12:00 on Dec. 25 in AKL
      expect(isSameTZDay(akl25, utc24, 'Pacific/Auckland')).toBe(false);
      expect(isSameTZDay(akl25, utc25, 'Pacific/Auckland')).toBe(true);
    });
  });
});
