import { Month, SupportedLocales } from '@leafygreen-ui/date-utils';

import { getFormatPartsValues } from './getFormatPartsValues';

describe('packages/time-input/utils/getFormatPartsValues', () => {
  describe('returns current day, month, and year format parts values with the value is undefined', () => {
    beforeEach(() => {
      // Mock the current date/time in UTC
      jest.useFakeTimers().setSystemTime(
        new Date(Date.UTC(2025, Month.January, 1, 0, 0, 0)), // January 1, 2025 00:00:00 UTC
      );
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    describe('and the time zone is', () => {
      test('UTC', () => {
        const formatPartsValues = getFormatPartsValues({
          locale: SupportedLocales.ISO_8601,
          timeZone: 'UTC',
          value: undefined,
        });
        // January 1, 2025 00:00:00 UTC in UTC is January 1, 2025 00:00:00 (UTC)
        expect(formatPartsValues).toEqual({
          hour: '',
          minute: '',
          second: '',
          month: '1',
          day: '1',
          year: '2025',
          dayPeriod: 'AM', // This is the default value for the day period since iso-8601 is 24h format
        });
      });

      test('America/New_York', () => {
        const formatPartsValues = getFormatPartsValues({
          locale: SupportedLocales.ISO_8601,
          timeZone: 'America/New_York',
          value: undefined,
        });
        // January 1, 2025 00:00:00 UTC in America/New_York is December 31, 2024 19:00:00 (UTC-5 hours)
        expect(formatPartsValues).toEqual({
          hour: '',
          minute: '',
          second: '',
          month: '12',
          day: '31',
          year: '2024',
          dayPeriod: 'AM', // This is the default value for the day period since iso is 24h format
        });
      });

      test('Pacific/Auckland', () => {
        const formatPartsValues = getFormatPartsValues({
          locale: SupportedLocales.ISO_8601,
          timeZone: 'Pacific/Auckland',
          value: undefined,
        });
        // January 1, 2025 00:00:00 UTC in Pacific/Auckland is January 1, 2025 (UTC+13 hours)
        expect(formatPartsValues).toEqual({
          hour: '',
          minute: '',
          second: '',
          month: '1',
          day: '1',
          year: '2025',
          dayPeriod: 'AM',
        });
      });
    });
  });

  describe('returns day, month, year, hour, minute, second, and day period values when the value is defined', () => {
    const utcValue = new Date(Date.UTC(2025, Month.February, 20, 13, 30, 59)); // February 20, 2025 13:30:59 UTC

    describe('and the time zone is', () => {
      describe('UTC', () => {
        test('24 hour format', () => {
          const formatPartsValues = getFormatPartsValues({
            locale: SupportedLocales.ISO_8601,
            timeZone: 'UTC',
            value: utcValue,
          });
          expect(formatPartsValues).toEqual({
            hour: '13',
            minute: '30',
            second: '59',
            month: '2',
            day: '20',
            year: '2025',
            dayPeriod: 'AM',
          });
        });

        test('12 hour format', () => {
          const formatPartsValues = getFormatPartsValues({
            locale: SupportedLocales.en_US,
            timeZone: 'UTC',
            value: utcValue,
          });
          expect(formatPartsValues).toEqual({
            hour: '1',
            minute: '30',
            second: '59',
            month: '2',
            day: '20',
            year: '2025',
            dayPeriod: 'PM',
          });
        });
      });

      describe('America/New_York', () => {
        test('24 hour format', () => {
          const formatPartsValues = getFormatPartsValues({
            locale: SupportedLocales.ISO_8601,
            timeZone: 'America/New_York',
            value: utcValue,
          });
          // February 20, 2025 13:30:59 UTC in America/New_York is 08:30:59 (UTC-5 hours)
          expect(formatPartsValues).toEqual({
            hour: '08',
            minute: '30',
            second: '59',
            month: '2',
            day: '20',
            year: '2025',
            dayPeriod: 'AM',
          });
        });
        test('12 hour format', () => {
          const formatPartsValues = getFormatPartsValues({
            locale: SupportedLocales.en_US,
            timeZone: 'America/New_York',
            value: utcValue,
          });
          // February 20, 2025 13:30:59 UTC in America/New_York is 8:30:59 AM (UTC-5 hours)
          expect(formatPartsValues).toEqual({
            hour: '8',
            minute: '30',
            second: '59',
            month: '2',
            day: '20',
            year: '2025',
            dayPeriod: 'AM',
          });
        });
      });

      describe('Pacific/Auckland', () => {
        test('24 hour format', () => {
          const formatPartsValues = getFormatPartsValues({
            locale: SupportedLocales.ISO_8601,
            timeZone: 'Pacific/Auckland',
            value: utcValue,
          });
          // February 20, 2025 13:30:59 UTC in Pacific/Auckland is February 21, 2025 02:30:59 (UTC+13 hours)
          expect(formatPartsValues).toEqual({
            hour: '02',
            minute: '30',
            second: '59',
            month: '2',
            day: '21',
            year: '2025',
            dayPeriod: 'AM',
          });
        });
        test('12 hour format', () => {
          const formatPartsValues = getFormatPartsValues({
            locale: SupportedLocales.en_US,
            timeZone: 'Pacific/Auckland',
            value: utcValue,
          });
          // February 20, 2025 13:30:59 UTC in Pacific/Auckland is February 21, 2025 2:30:59 AM (UTC+13 hours)
          expect(formatPartsValues).toEqual({
            hour: '2',
            minute: '30',
            second: '59',
            month: '2',
            day: '21',
            year: '2025',
            dayPeriod: 'AM',
          });
        });
      });
    });
  });
});
