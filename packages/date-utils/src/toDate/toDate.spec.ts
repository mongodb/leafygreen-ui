import { toDate } from '.';

describe('packages/date-utils/toDate', () => {
  test('Date', () => {
    const d1 = new Date();
    const d2 = toDate(d1);
    expect(d2).toEqual(d1);
  });
  test('timestamp', () => {
    const ts = Date.now();
    const d = toDate(ts);
    expect(d).toEqual(new Date(ts));
  });
  test('number', () => {
    const d = toDate(0);
    expect(d).toEqual(new Date(0));
  });
  test('ISO string', () => {
    const d = toDate('2023-02-14');
    expect(d).toEqual(new Date('2023-02-14'));
  });
  test('invalid string', () => {
    const d = toDate('Tomorrow');
    expect(d).toBeNull();
  });
  test('null', () => {
    const d = toDate(null);
    expect(d).toBeNull();
  });
  test('undefined', () => {
    const d = toDate(undefined);
    expect(d).toBeNull();
  });
});
