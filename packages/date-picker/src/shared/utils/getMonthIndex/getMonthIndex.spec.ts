import { getMonthIndex } from '.';

describe('packages/date-picker/utils/getMonthIndex', () => {
  test('English long', () => {
    expect(getMonthIndex('January')).toBe(0);
    expect(getMonthIndex('December')).toBe(11);
  });
  test('English short', () => {
    expect(getMonthIndex('Jan')).toBe(0);
    expect(getMonthIndex('Dec')).toBe(11);
  });
});
