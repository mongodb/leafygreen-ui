import { unitOptions } from '../../constants';

import { findUnitOptionByDayPeriod } from './findUnitOptionByDayPeriod';

describe('packages/time-input/utils/findUnitOptionByDayPeriod', () => {
  test('returns the unit option by day period', () => {
    expect(findUnitOptionByDayPeriod('AM', unitOptions)).toEqual(
      unitOptions[0],
    );
    expect(findUnitOptionByDayPeriod('PM', unitOptions)).toEqual(
      unitOptions[1],
    );
  });
});
