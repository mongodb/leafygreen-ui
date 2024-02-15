import { Month, newUTC } from '@leafygreen-ui/date-utils';

import { getFormattedDateString } from '.';

describe('packages/date-picker/utils/getFormattedDateString', () => {
  const testDate = newUTC(1967, Month.May, 2);
  test('iso8601', () => {
    expect(getFormattedDateString(testDate, 'iso8601')).toBe('1967-05-02');
  });
  test('en-US', () => {
    expect(getFormattedDateString(testDate, 'en-US')).toBe('05/02/1967');
  });
  test('en-UK', () => {
    expect(getFormattedDateString(testDate, 'en-UK')).toBe('02/05/1967');
  });
  test('invalid locale', () => {
    expect(getFormattedDateString(testDate, 'asdf')).toBeUndefined();
  });
});
