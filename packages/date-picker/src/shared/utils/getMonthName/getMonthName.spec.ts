import { getMonthName } from '.';

describe('packages/date-picker/utils/getMonthName', () => {
  test('Jan', () => {
    expect(getMonthName(0)).toEqual(
      expect.objectContaining({ long: 'January', short: 'Jan' }),
    );
  });
  test('Feb', () => {
    expect(getMonthName(1)).toEqual(
      expect.objectContaining({ long: 'February', short: 'Feb' }),
    );
  });
  test('Mar', () => {
    expect(getMonthName(2)).toEqual(
      expect.objectContaining({ long: 'March', short: 'Mar' }),
    );
  });
  test('Apr', () => {
    expect(getMonthName(3)).toEqual(
      expect.objectContaining({ long: 'April', short: 'Apr' }),
    );
  });
  test('May', () => {
    expect(getMonthName(4)).toEqual(
      expect.objectContaining({ long: 'May', short: 'May' }),
    );
  });
  test('Jun', () => {
    expect(getMonthName(5)).toEqual(
      expect.objectContaining({ long: 'June', short: 'Jun' }),
    );
  });
  test('Jul', () => {
    expect(getMonthName(6)).toEqual(
      expect.objectContaining({ long: 'July', short: 'Jul' }),
    );
  });
  test('Aug', () => {
    expect(getMonthName(7)).toEqual(
      expect.objectContaining({ long: 'August', short: 'Aug' }),
    );
  });
  test('Sep', () => {
    expect(getMonthName(8)).toEqual(
      expect.objectContaining({ long: 'September', short: 'Sep' }),
    );
  });
  test('Oct', () => {
    expect(getMonthName(9)).toEqual(
      expect.objectContaining({ long: 'October', short: 'Oct' }),
    );
  });
  test('Nov', () => {
    expect(getMonthName(10)).toEqual(
      expect.objectContaining({ long: 'November', short: 'Nov' }),
    );
  });
  test('Dec', () => {
    expect(getMonthName(11)).toEqual(
      expect.objectContaining({ long: 'December', short: 'Dec' }),
    );
  });
});
