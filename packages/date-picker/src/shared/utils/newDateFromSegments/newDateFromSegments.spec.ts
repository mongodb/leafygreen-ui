import { newDateFromSegments } from '.';

describe('packages/date=picker/utils/newDateFromSegments', () => {
  test('returns the date in UTC', () => {
    const newDate = newDateFromSegments({
      day: 1,
      month: 1,
      year: 2023,
    });
    expect(newDate?.toISOString()).toEqual('2023-01-01T00:00:00.000Z');
  });

  test('returns undefined if any segment is undefined', () => {
    const newDate = newDateFromSegments({
      day: undefined,
      month: 1,
      year: 2023,
    });

    expect(newDate).toBeUndefined();
  });
});
