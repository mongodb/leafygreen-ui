import { utcToZonedTime } from 'date-fns-tz';
import { isUndefined, padStart, range } from 'lodash';

import { Month } from '../../../constants';

import { getWeeksArray } from '.';

describe.skip('utcToZonedTime', () => {
  const date = new Date(Date.UTC(2023, 8 /* Sept */, 1));

  test('date is in UTC', () => {
    expect(date.toISOString()).toEqual('2023-09-01T00:00:00.000Z');
  });

  test('converting to UTC has no effect', () => {
    const utc = utcToZonedTime(date, 'UTC');
    expect(utc.toISOString()).toEqual(date.toISOString());
  });

  test('converting to America/New_York rolls back -4 for EDT', () => {
    const nyc = utcToZonedTime(date, 'America/New_York');
    expect(nyc.toISOString()).toEqual('2023-08-31T20:00:00.000Z');
  });
});

describe.skip('packages/date-picker/calendar/utils/getWeeksArray', () => {
  test('returned array has the correct number of elements', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, {
      timeZone: 'UTC',
      dateFormat: 'iso8601',
    });
    const daysInAugust = 31;
    const padDaysForFormat = 1;
    expect(arr.flat()).toHaveLength(daysInAugust + padDaysForFormat);
  });

  test('returns values in UTC', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, {
      timeZone: 'UTC',
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
      timeZone: 'UTC',
      dateFormat: 'iso8601',
    });
    expect(arr[0][0]).toBeNull(); // Mon
    expect(arr[0][1]).not.toBeNull(); // Tues
  });

  test('starts the week on the correct day for the locale', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, { timeZone: 'UTC', dateFormat: 'en-US' });
    expect(arr[0][0]).toBeNull(); // Sun
    expect(arr[0][1]).toBeNull(); // Mon
    expect(arr[0][2]).not.toBeNull(); // Tues
  });

  test('returned array has chunks of length 7', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, {
      timeZone: 'UTC',
      dateFormat: 'iso8601',
    });
    expect(arr[0]).toHaveLength(7);
    expect(arr[1]).toHaveLength(7);
    expect(arr[2]).toHaveLength(7);
    expect(arr[3]).toHaveLength(7);
  });

  test('returns values in UTC regardless of source', () => {
    const month = new Date('2023-08-01T00:00:00.000');
    const arr = getWeeksArray(month, {
      timeZone: 'UTC',
      dateFormat: 'iso8601',
    });
    const isoFlat = arr
      .flatMap(week => week.map(day => day?.toISOString()))
      .filter(day => !isUndefined(day));
    expect(isoFlat.every(day => day?.endsWith('T00:00:00.000Z'))).toBeTruthy();
  });

  test('returned array includes a Date for every day of the month', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, {
      timeZone: 'UTC',
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
