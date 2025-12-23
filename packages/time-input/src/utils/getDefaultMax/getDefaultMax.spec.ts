import { getDefaultMax } from './getDefaultMax';

describe('packages/time-input/utils/getDefaultMax', () => {
  test('returns the default max for 12 hour format', () => {
    const defaultMax = getDefaultMax({ is12HourFormat: true });
    expect(defaultMax).toEqual({
      hour: 12,
      minute: 59,
      second: 59,
    });
  });

  test('returns the default max for 24 hour format', () => {
    const defaultMax = getDefaultMax({ is12HourFormat: false });
    expect(defaultMax).toEqual({
      hour: 23,
      minute: 59,
      second: 59,
    });
  });
});
