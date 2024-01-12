import { isInvalidDateObject, Month, newUTC } from '@leafygreen-ui/date-utils';

import { newDateFromSegments } from '.';

describe('packages/date-picker/utils/newDateFromSegments', () => {
  describe('valid dates', () => {
    test('returns the date in UTC', () => {
      const newDate = newDateFromSegments({
        day: '01',
        month: '01',
        year: '2023',
      });
      expect(newDate).toEqual(newUTC(2023, Month.January, 1));
    });

    test('returns a date outside the default range', () => {
      const newDate = newDateFromSegments({
        day: '01',
        month: '01',
        year: '2100',
      });
      expect(newDate).toEqual(newUTC(2100, Month.January, 1));
    });

    test('returns a date if day segment is truncated', () => {
      const newDate = newDateFromSegments({
        day: '1',
        month: '01',
        year: '2023',
      });
      expect(newDate).toEqual(newUTC(2023, Month.January, 1));
    });

    test('returns a date if month segment is truncated', () => {
      const newDate = newDateFromSegments({
        day: '01',
        month: '1',
        year: '2023',
      });
      expect(newDate).toEqual(newUTC(2023, Month.January, 1));
    });
  });

  describe('null', () => {
    test('returns `null` if all segments are empty', () => {
      const newDate = newDateFromSegments({
        day: '',
        month: '',
        year: '',
      });
      expect(newDate).toBeNull();
    });
  });

  describe('Invalid', () => {
    test('returns "Invalid Date" if year segment is truncated', () => {
      const newDate = newDateFromSegments({
        day: '01',
        month: '01',
        year: '20',
      });
      expect(isInvalidDateObject(newDate)).toBe(true);
    });

    test('returns "Invalid Date" if month/day combo is invalid', () => {
      const newDate = newDateFromSegments({
        day: '31',
        month: '02',
        year: '2024',
      });

      expect(isInvalidDateObject(newDate)).toBe(true);
    });

    test('returns "Invalid Date" if any segment is empty', () => {
      const newDate = newDateFromSegments({
        day: '',
        month: '1',
        year: '2023',
      });

      expect(isInvalidDateObject(newDate)).toBe(true);
    });
  });
});
