import { getDefaultMin } from './getDefaultMin';

describe('packages/time-input/utils/getDefaultMin', () => {
  test('returns the default min for 12 hour format', () => {
    const defaultMin = getDefaultMin({ is12HourFormat: true });
    expect(defaultMin).toEqual({
      hour: 1,
      minute: 0,
      second: 0,
    });
  });

  test('returns the default min for 24 hour format', () => {
    const defaultMin = getDefaultMin({ is12HourFormat: false });
    expect(defaultMin).toEqual({
      hour: 0,
      minute: 0,
      second: 0,
    });
  });
});
