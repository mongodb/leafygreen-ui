import { hasDayPeriod } from './hasDayPeriod';
import { SupportedLocales } from '@leafygreen-ui/date-utils';

describe('packages/time-input/utils/hasDayPeriod', () => {
  test('returns false for ISO_8601', () => {
    expect(hasDayPeriod(SupportedLocales.ISO_8601)).toBe(false);
  });

  test('returns true for en-US', () => {
    expect(hasDayPeriod(SupportedLocales.en_US)).toBe(true);
  });

  test('returns false for en-GB', () => {
    expect(hasDayPeriod(SupportedLocales.en_GB)).toBe(false);
  });
});
