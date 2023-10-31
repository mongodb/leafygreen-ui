import { Month } from '../../constants';
import { newUTC } from '../newUTC';

import { getFullMonthLabel } from '.';

describe('packages/date-picker/utils/getMonthName', () => {
  test('Jan', () => {
    expect(getFullMonthLabel(newUTC(2023, Month.January, 5))).toEqual(
      'January 2023',
    );
  });
});
