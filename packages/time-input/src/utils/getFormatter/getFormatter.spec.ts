import { SupportedLocales } from '@leafygreen-ui/date-utils';

import { getFormatter } from './getFormatter';

describe('packages/time-input/utils/getFormatter', () => {
  test('returns a formatter a valid locale', () => {
    const formatter = getFormatter({ locale: SupportedLocales.en_US });
    expect(formatter).toBeDefined();
  });

  test('returns undefined for an invalid locale', () => {
    const formatter = getFormatter({ locale: '!!!' });
    expect(formatter).toBeUndefined();
  });
});
