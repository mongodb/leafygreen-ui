import { newDateFromSegments } from '.';

describe('packages/date=picker/utils/newDateFromSegments', () => {
  test('returns the date in UTC', () => {
    const newDate = newDateFromSegments({
      day: '1',
      month: '1',
      year: '2023',
    });
    expect(newDate?.toISOString()).toEqual('2023-01-01T00:00:00.000Z');
  });

  test('returns a date outside the default range', () => {
    const newDate = newDateFromSegments({
      day: '1',
      month: '1',
      year: '2100',
    });
    expect(newDate?.toISOString()).toEqual('2100-01-01T00:00:00.000Z');
  });

  test('returns undefined if year is truncated (2-digits)', () => {
    const newDate = newDateFromSegments({
      day: '1',
      month: '1',
      year: '20',
    });
    expect(newDate).toBeUndefined();
  });

  test('returns undefined if year is truncated (3-digits)', () => {
    const newDate = newDateFromSegments({
      day: '1',
      month: '1',
      year: '199',
    });
    expect(newDate).toBeUndefined();
  });

  test('returns undefined if month/day combo is invalid', () => {
    const newDate = newDateFromSegments({
      day: '31',
      month: '02',
      year: '2024',
    });

    expect(newDate).toBeUndefined();
  });

  test('returns undefined if any segment is empty', () => {
    const newDate = newDateFromSegments({
      day: '',
      month: '1',
      year: '2023',
    });

    expect(newDate).toBeUndefined();
  });
});
