import { Month, newUTC } from '../../../shared';

import { getInitialHighlight } from '.';

describe('packages/date-picker/utils/getInitialHighlight', () => {
  const value = newUTC(2023, Month.September, 10);
  const today = newUTC(2023, Month.December, 26);

  test('returns `value` when provided', () => {
    const highlight = getInitialHighlight(value, today);
    expect(highlight).toBe(value);
  });

  test('returns `today` if no value is provided', () => {
    const highlight = getInitialHighlight(null, today);
    expect(highlight).toBe(today);
  });
});
