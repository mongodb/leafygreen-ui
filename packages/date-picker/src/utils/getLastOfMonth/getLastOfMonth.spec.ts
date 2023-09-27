import { Month } from '../../constants';

import { getLastOfMonth } from '.';

describe('packages/date-picker/utils/getLastOfMonth', () => {
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
});
