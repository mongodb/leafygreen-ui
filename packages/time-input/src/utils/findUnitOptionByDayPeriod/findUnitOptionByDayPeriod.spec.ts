import { findUnitOptionByDayPeriod } from './findUnitOptionByDayPeriod';

describe('packages/time-input/utils/findUnitOptionByDayPeriod', () => {
  test('returns the unit option by day period', () => {
    expect(
      findUnitOptionByDayPeriod('AM', [
        { displayName: 'AM', value: 'AM' },
        { displayName: 'PM', value: 'PM' },
      ]),
    ).toEqual({ displayName: 'AM', value: 'AM' });
    expect(
      findUnitOptionByDayPeriod('PM', [
        { displayName: 'AM', value: 'AM' },
        { displayName: 'PM', value: 'PM' },
      ]),
    ).toEqual({ displayName: 'PM', value: 'PM' });
  });
});
