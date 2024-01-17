import { Month } from '../constants';

import { newTZDate } from './newTZDate';

describe('packages/date-utils/newTZDate', () => {
  test('creates a UTC date when 0 offset is provided', () => {
    const date = newTZDate(0, 2020, Month.January, 5);
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(5);
    expect(date.getUTCHours()).toBe(0);
  });

  test('positive UTC offset (2020-01-05 UTC => 2020-01-04T19:00 UTC+5)', () => {
    const date = newTZDate(5, 2020, Month.January, 5);
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(4);
    expect(date.getUTCHours()).toBe(19);
  });

  test('positive UTC offset with hours (2020-01-05T23:00 UTC => 2020-01-05T18:00 UTC+5)', () => {
    const date = newTZDate(5, 2020, Month.January, 5, 23);
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(5);
    expect(date.getUTCHours()).toBe(18);
  });

  test('negative UTC offset (2020-01-05 UTC => 2020-01-05T05:00 UTC-5)', () => {
    const date = newTZDate(-5, 2020, Month.January, 5);
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(5);
    expect(date.getUTCHours()).toBe(5);
  });
  test('negative UTC offset with hours (2020-01-05T23:00 UTC => 2020-01-06T04:00 UTC-5)', () => {
    const date = newTZDate(-5, 2020, Month.January, 5, 23);
    expect(date.getUTCFullYear()).toBe(2020);
    expect(date.getUTCMonth()).toBe(0);
    expect(date.getUTCDate()).toBe(6);
    expect(date.getUTCHours()).toBe(4);
  });
});
