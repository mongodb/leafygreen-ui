import { isUndefined, padStart, range } from 'lodash';

import { Month } from '../../constants';

import { getWeeksArray } from '.';

describe('packages/date-picker/utils/getWeeksArray', () => {
  test('returned array has the correct number of elements', () => {
    const month = new Date(Date.UTC(2023, Month.September, 1));
    const arr = getWeeksArray(month, {
      dateFormat: 'iso8601',
    });
    const daysInSeptember = 30;
    const septStartsOn = 5; // sept 2023 starts on Friday, which is day 5 for iso format
    expect(arr.flat()).toHaveLength(daysInSeptember + septStartsOn);
  });

  test('returns values in UTC', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, {
      dateFormat: 'iso8601',
    });
    const isoFlat = arr
      .flatMap(week => week.map(day => day?.toISOString()))
      .filter(day => !isUndefined(day));
    expect(isoFlat.every(day => day?.endsWith('T00:00:00.000Z'))).toBeTruthy();
  });

  test('pads beginning of month with empty values', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, {
      dateFormat: 'iso8601',
    });
    expect(arr[0][0]).toBeNull(); // Mon
    expect(arr[0][1]).not.toBeNull(); // Tues
  });

  test('starts the week on the correct day for the locale', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, { dateFormat: 'en-US' });
    expect(arr[0][0]).toBeNull(); // Sun
    expect(arr[0][1]).toBeNull(); // Mon
    expect(arr[0][2]).not.toBeNull(); // Tues
  });

  test('returned array has chunks of length 7', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, {
      dateFormat: 'iso8601',
    });
    expect(arr[0]).toHaveLength(7);
    expect(arr[1]).toHaveLength(7);
    expect(arr[2]).toHaveLength(7);
    expect(arr[3]).toHaveLength(7);
  });

  test('returned array includes a Date for every day of the month', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, {
      dateFormat: 'iso8601',
    });
    const isoFlat = arr.flatMap(week => week.map(day => day?.toISOString()));

    expect(isoFlat).toEqual(
      expect.arrayContaining([
        undefined,
        ...range(31).map(
          d => `2023-08-${padStart((d + 1).toString(), 2, '0')}T00:00:00.000Z`,
        ),
      ]),
    );
  });
});
