import { Month } from '../constants';

import { getLastOfMonth } from '.';

describe('packages/date-utils/getLastOfMonth', () => {
  test('sets to last of month', () => {
    expect(getLastOfMonth(new Date(Date.UTC(2023, Month.January, 5)))).toEqual(
      new Date(Date.UTC(2023, Month.January, 31)),
    );
  });

  test('works for September', () => {
    expect(
      getLastOfMonth(new Date(Date.UTC(2023, Month.September, 10))),
    ).toEqual(new Date(Date.UTC(2023, Month.September, 30)));
  });

  test('works for February', () => {
    expect(
      getLastOfMonth(new Date(Date.UTC(2023, Month.February, 14))),
    ).toEqual(new Date(Date.UTC(2023, Month.February, 28)));
  });

  test('works for leap-years', () => {
    expect(
      getLastOfMonth(new Date(Date.UTC(2020, Month.February, 14))),
    ).toEqual(new Date(Date.UTC(2020, Month.February, 29)));
  });

  test('returned time is midnight', () => {
    const last = getLastOfMonth(new Date(Date.UTC(2020, Month.February, 14)));
    expect(last.getUTCHours()).toEqual(0);
    expect(last.getUTCMinutes()).toEqual(0);
    expect(last.getUTCSeconds()).toEqual(0);
    expect(last.getUTCMilliseconds()).toEqual(0);
  });
});
