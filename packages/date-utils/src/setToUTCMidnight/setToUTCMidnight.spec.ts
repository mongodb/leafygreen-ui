import { setToUTCMidnight } from '.';

describe('packages/date-utils/setToUTCMidnight', () => {
  test('sets a date to UTC midnight', () => {
    const date = new Date();
    const midnight = setToUTCMidnight(date);
    expect(midnight.getUTCHours()).toBe(0);
    expect(midnight.getUTCMinutes()).toBe(0);
    expect(midnight.getUTCSeconds()).toBe(0);
    expect(midnight.getUTCMilliseconds()).toBe(0);
  });
});
