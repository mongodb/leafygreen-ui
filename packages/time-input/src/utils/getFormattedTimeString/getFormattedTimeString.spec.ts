import { Month, newUTC, SupportedLocales } from '@leafygreen-ui/date-utils';

import { getFormattedTimeString } from './getFormattedTimeString';

describe('packages/time-input/utils/getFormattedTimeString', () => {
  describe('When the time zone is', () => {
    describe('UTC (UTC+0)', () => {
      test('returns the formatted time string in 12 hour format', () => {
        const formattedTimeString = getFormattedTimeString({
          date: newUTC(2026, Month.February, 20, 12, 30, 0, 0),
          locale: SupportedLocales.en_US,
          timeZone: 'UTC',
        });
        expect(formattedTimeString).toBe('12:30:00 PM');
      });
      test('returns the formatted time string in 24 hour format', () => {
        const formattedTimeString = getFormattedTimeString({
          date: newUTC(2026, Month.February, 20, 12, 30, 0, 0),
          locale: SupportedLocales.ISO_8601,
          timeZone: 'UTC',
        });
        expect(formattedTimeString).toBe('12:30:00');
      });
    });
    describe('America/New_York (UTC-5)', () => {
      test('returns the formatted time string in 12 hour format', () => {
        const formattedTimeString = getFormattedTimeString({
          date: newUTC(2026, Month.February, 20, 12, 30, 0, 0),
          locale: SupportedLocales.en_US,
          timeZone: 'America/New_York',
        });
        expect(formattedTimeString).toBe('7:30:00 AM');
      });
      test('returns the formatted time string in 24 hour format', () => {
        const formattedTimeString = getFormattedTimeString({
          date: newUTC(2026, Month.February, 20, 12, 30, 0, 0),
          locale: SupportedLocales.ISO_8601,
          timeZone: 'America/New_York',
        });
        expect(formattedTimeString).toBe('07:30:00');
      });
    });
    describe('Pacific/Kiritimati (UTC+14)', () => {
      test('returns the formatted time string in 12 hour format', () => {
        const formattedTimeString = getFormattedTimeString({
          date: newUTC(2026, Month.February, 20, 12, 30, 0, 0),
          locale: SupportedLocales.en_US,
          timeZone: 'Pacific/Kiritimati',
        });
        expect(formattedTimeString).toBe('2:30:00 AM');
      });
      test('returns the formatted time string in 24 hour format', () => {
        const formattedTimeString = getFormattedTimeString({
          date: newUTC(2026, Month.February, 20, 12, 30, 0, 0),
          locale: SupportedLocales.ISO_8601,
          timeZone: 'Pacific/Kiritimati',
        });
        expect(formattedTimeString).toBe('02:30:00');
      });
    });
  });
});
