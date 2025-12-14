import { newUTCFromTimeZone } from './newUTCFromTimeZone';

describe('packages/date-utils/newUTCFromTimeZone', () => {
  describe('UTC', () => {
    test('creates a new UTC date from a given time zone', () => {
      const date = newUTCFromTimeZone({
        year: '2026',
        month: '02',
        day: '20',
        hour: '23',
        minute: '00',
        second: '00',
        timeZone: 'UTC',
      });

      // February 20, 2026 11:00:00 PM/23:00:00 in UTC is February 20, 2026 23:00:00 UTC
      expect(date).toEqual(new Date('2026-02-20T23:00:00Z'));
    });
  });

  describe('America/New_York', () => {
    test('creates a new UTC date from a given time zone', () => {
      const date = newUTCFromTimeZone({
        year: '2026',
        month: '02',
        day: '20',
        hour: '23',
        minute: '00',
        second: '00',
        timeZone: 'America/New_York',
      });

      // February 20, 2026 11:00:00 PM/23:00:00 in America/New_York is February 21, 2026 04:00:00 UTC (UTC-5 hours)
      expect(date).toEqual(new Date('2026-02-21T04:00:00Z'));
    });
  });

  describe('Pacific/Kiritimati', () => {
    test('creates a new UTC date from a given time zone', () => {
      const date = newUTCFromTimeZone({
        year: '2026',
        month: '02',
        day: '20',
        hour: '23',
        minute: '00',
        second: '00',
        timeZone: 'Pacific/Kiritimati',
      });

      // February 20, 2026 11:00:00 PM/23:00:00 in Pacific/Kiritimati is February 20, 2026 09:00:00 UTC (UTC+14 hours)
      expect(date).toEqual(new Date('2026-02-20T09:00:00Z'));
    });
  });
});
