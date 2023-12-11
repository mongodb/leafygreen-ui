import { Month, newUTC } from '@leafygreen-ui/date-utils';

import { shouldMonthBeEnabled } from '.';

describe('packages/date-picker/menu/utils/shouldMonthBeEnabled', () => {
  test('returns true by default', () => {
    expect(shouldMonthBeEnabled('July')).toBeTruthy();
  });

  test('returns false if given an invalid month', () => {
    expect(shouldMonthBeEnabled('Quintember')).toBeFalsy();
  });

  test('returns all 12 months when only month is provided', () => {
    expect(
      shouldMonthBeEnabled('July', {
        month: newUTC(2023, Month.July, 15),
      }),
    ).toBeTruthy();
  });

  test('returns true when month, min & max are different years', () => {
    expect(
      shouldMonthBeEnabled('July', {
        month: newUTC(2023, Month.July, 15),
        min: newUTC(2000, Month.January, 15),
        max: newUTC(2050, Month.December, 15),
      }),
    ).toBeTruthy();
  });

  describe('when month & min are the same year', () => {
    test('returns false when month is before min month', () => {
      expect(
        shouldMonthBeEnabled('July', {
          month: newUTC(2024, Month.October, 14),
          min: newUTC(2024, Month.September, 10),
        }),
      ).toBeFalsy();
    });

    test('returns true when month is same min month', () => {
      expect(
        shouldMonthBeEnabled('July', {
          month: newUTC(2024, Month.October, 14),
          min: newUTC(2024, Month.July, 5),
        }),
      ).toBeTruthy();
    });

    test('returns true when month is after min month', () => {
      expect(
        shouldMonthBeEnabled('July', {
          month: newUTC(2024, Month.October, 14),
          min: newUTC(2024, Month.March, 10),
        }),
      ).toBeTruthy();
    });
  });

  describe('when month & max are the same year', () => {
    test('returns false when month is after max month', () => {
      expect(
        shouldMonthBeEnabled('July', {
          month: newUTC(2024, Month.February, 14),
          max: newUTC(2024, Month.March, 10),
        }),
      ).toBeFalsy();
    });

    test('returns true when month is same as max month', () => {
      expect(
        shouldMonthBeEnabled('July', {
          month: newUTC(2024, Month.March, 10),
          max: newUTC(2024, Month.July, 5),
        }),
      ).toBeTruthy();
    });

    test('returns true when month is before max month', () => {
      expect(
        shouldMonthBeEnabled('July', {
          month: newUTC(2024, Month.March, 10),
          max: newUTC(2024, Month.September, 10),
        }),
      ).toBeTruthy();
    });

    test('returns false when the year is before the min year', () => {
      expect(
        shouldMonthBeEnabled('July', {
          month: newUTC(2024, Month.March, 10),
          min: newUTC(2025, Month.September, 10),
        }),
      ).toBeFalsy();
    });

    test('returns false when the year is after the max year', () => {
      expect(
        shouldMonthBeEnabled('July', {
          month: newUTC(2026, Month.March, 10),
          max: newUTC(2025, Month.September, 10),
        }),
      ).toBeFalsy();
    });
  });
});
