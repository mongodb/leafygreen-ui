import { Month } from '../constants';

import { newTZDate } from './newTZDate';

describe('packages/date-utils/newTZDate', () => {
  test('creates a UTC date when 0 offset is provided', () => {
    const date = newTZDate({
      timeZone: 'UTC', // UTC is 0 hours from UTC
      year: 2020,
      month: Month.January,
      date: 5,
    });
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(5);
    expect(date.getUTCHours()).toBe(0);
  });

  test('positive UTC offset (2023-08-15T00:00:00 CEST (UTC+2) => 2023-08-14T22:00:00 UTC)', () => {
    const date = newTZDate({
      timeZone: 'Europe/Paris', // Europe/Paris is +2 hours from UTC in August (CEST)
      year: 2023,
      month: Month.August,
      date: 15,
    });
    expect(date.getUTCFullYear()).toBe(2023);
    expect(date.getUTCMonth()).toBe(7);
    expect(date.getUTCDate()).toBe(14);
  });

  test('positive UTC offset with hours, minutes, and seconds with DST (2023-08-15T23:00 CEST (UTC+2) => 2023-08-15T21:00 UTC)', () => {
    const date = newTZDate({
      timeZone: 'Europe/Paris', // Europe/Paris is +2 hours from UTC in August (CEST)
      year: 2023,
      month: Month.August,
      date: 15,
      hours: 23,
      minutes: 30,
      seconds: 45,
    });
    expect(date.getUTCFullYear()).toBe(2023);
    expect(date.getUTCMonth()).toBe(7);
    expect(date.getUTCDate()).toBe(15);
    expect(date.getUTCHours()).toBe(21);
    expect(date.getUTCMinutes()).toBe(30);
    expect(date.getUTCSeconds()).toBe(45);
    expect(date.getUTCMilliseconds()).toBe(0);
  });

  test('positive UTC offset with hours, minutes, and seconds without DST (2020-01-15T23:00 CET (UTC+1) => 2020-01-15T22:00 UTC)', () => {
    const date = newTZDate({
      timeZone: 'Europe/Paris', // Europe/Paris is +1 hour from UTC in January (CET)
      year: 2020,
      month: Month.January,
      date: 15,
      hours: 23,
      minutes: 30,
      seconds: 45,
    });
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(15);
    expect(date.getUTCHours()).toBe(22);
    expect(date.getUTCMinutes()).toBe(30);
    expect(date.getUTCSeconds()).toBe(45);
    expect(date.getUTCMilliseconds()).toBe(0);
  });

  test('negative UTC offset (2020-01-05T00:00 EST (UTC-5) => 2020-01-05T05:00 UTC)', () => {
    const date = newTZDate({
      timeZone: 'America/New_York', // America/New_York is -5 hours from UTC in January
      year: 2020,
      month: Month.January,
      date: 5,
    });
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(5);
    expect(date.getUTCHours()).toBe(5);
  });

  test('negative UTC offset with hours, minutes, and seconds with DST (2020-01-05T23:30:45 EST (UTC-5) => 2020-01-06T04:30:45 UTC)', () => {
    // January 5, 2020 23:00 EST is January 6, 2020 04:00 UTC-5
    const date = newTZDate({
      timeZone: 'America/New_York', // America/New_York is -5 hours from UTC in January
      year: 2020,
      month: Month.January,
      date: 5,
      hours: 23,
      minutes: 30,
      seconds: 45,
    });
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(6);
    expect(date.getUTCHours()).toBe(4);
    expect(date.getUTCMinutes()).toBe(30);
    expect(date.getUTCSeconds()).toBe(45);
    expect(date.getUTCMilliseconds()).toBe(0);
  });

  test('negative UTC offset with hours, minutes, and seconds without DST (2020-05-05T23:30:45 EDT (UTC-4) => 2020-05-06T03:30:45 UTC)', () => {
    // May 5, 2020 23:00 EDT is May 6, 2020 03:00 UTC-4
    const date = newTZDate({
      timeZone: 'America/New_York', // America/New_York is -4 hours from UTC in May
      year: 2020,
      month: Month.May,
      date: 5,
      hours: 23,
      minutes: 30,
      seconds: 45,
    });
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(4);
    expect(date.getUTCDate()).toBe(6);
    expect(date.getUTCHours()).toBe(3);
    expect(date.getUTCMinutes()).toBe(30);
    expect(date.getUTCSeconds()).toBe(45);
    expect(date.getUTCMilliseconds()).toBe(0);
  });
});
