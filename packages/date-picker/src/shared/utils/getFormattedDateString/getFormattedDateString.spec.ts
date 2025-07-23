import { Month, newUTC, SupportedLocales } from '@leafygreen-ui/date-utils';

import { getFormattedDateString } from '.';

describe('packages/date-picker/utils/getFormattedDateString', () => {
  const testDate = newUTC(1967, Month.May, 2);
  test(SupportedLocales.ISO_8601, () => {
    expect(getFormattedDateString(testDate, SupportedLocales.ISO_8601)).toBe(
      '1967-05-02',
    );
  });
  test(SupportedLocales.en_US, () => {
    expect(getFormattedDateString(testDate, SupportedLocales.en_US)).toBe(
      '05/02/1967',
    );
  });
  test(SupportedLocales.en_GB, () => {
    expect(getFormattedDateString(testDate, SupportedLocales.en_GB)).toBe(
      '02/05/1967',
    );
  });
  test('invalid locale', () => {
    expect(getFormattedDateString(testDate, 'asdf')).toBeUndefined();
  });
});
