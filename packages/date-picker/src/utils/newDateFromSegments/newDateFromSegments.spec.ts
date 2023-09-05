import { newDateFromSegments } from '.';

describe('packages/date=picker/utils/newDateFromSegments', () => {
  test('iso value', () => {
    const newDate = newDateFromSegments({
      day: 1,
      month: 1,
      year: 2023,
    });
    // TODO:  FIXME:
    expect(newDate?.toISOString()).toEqual('2023-01-01T00:00:00.000Z');
  });

  test('undefined', () => {
    const newDate = newDateFromSegments({
      day: undefined,
      month: 1,
      year: 2023,
    });

    expect(newDate).toBeUndefined();
  });
});
