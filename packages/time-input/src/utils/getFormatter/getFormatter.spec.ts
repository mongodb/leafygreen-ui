import { SupportedLocales } from '@leafygreen-ui/date-utils';

import { getFormatter } from './getFormatter';

describe('packages/time-input/utils/getFormatter', () => {
  test('returns a formatter for a valid locale', () => {
    const formatter = getFormatter({ locale: SupportedLocales.en_US });
    expect(formatter).toBeDefined();
  });

  test('returns a formatter for iso-8601', () => {
    const formatter = getFormatter({ locale: SupportedLocales.ISO_8601 });
    expect(formatter).toBeDefined();
  });

  test('returns a formatter if locale is not provided', () => {
    const formatter = getFormatter({});
    expect(formatter).toBeDefined();
  });

  test('returns undefined for an invalid locale', () => {
    const formatter = getFormatter({ locale: '!!!' });
    expect(formatter).toBeUndefined();
  });

  test('returns undefined for an an empty string locale', () => {
    const formatter = getFormatter({ locale: '' });
    expect(formatter).toBeUndefined();
  });

  describe('formatter can ', () => {
    test('format dates', () => {
      const testDate = new Date('2025-01-15T14:30:00Z');
      const formatter = getFormatter({ locale: SupportedLocales.en_US });
      const formatted = formatter?.format(testDate);
      expect(formatted).toBe('1/15/2025');
    });

    test('formatToParts', () => {
      const testDate = new Date('2025-01-15T14:30:00Z');
      const formatter = getFormatter({ locale: SupportedLocales.en_US });
      const formatParts = formatter?.formatToParts(testDate);
      expect(formatParts).toEqual([
        { type: 'month', value: '1' },
        { type: 'literal', value: '/' },
        { type: 'day', value: '15' },
        { type: 'literal', value: '/' },
        { type: 'year', value: '2025' },
      ]);
    });
  });
});
