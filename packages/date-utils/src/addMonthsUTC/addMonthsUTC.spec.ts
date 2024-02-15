import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { addMonthsUTC } from '.';

describe('packages/date-utils/addMonthsUTC', () => {
  test('returns the same date for 0', () => {
    const july4 = newUTC(2020, Month.July, 4);
    expect(addMonthsUTC(july4, 0)).toEqual(july4);
  });

  test('adds a single month', () => {
    const july4 = newUTC(2020, Month.July, 4);
    const aug4 = newUTC(2020, Month.August, 4);
    expect(addMonthsUTC(july4, 1)).toEqual(aug4);
  });
  test('adds multiple months', () => {
    const july4 = newUTC(2020, Month.July, 4);
    const sept4 = newUTC(2020, Month.September, 4);
    expect(addMonthsUTC(july4, 2)).toEqual(sept4);
  });
  test('adds months across years', () => {
    const dec5 = newUTC(2020, Month.December, 5);
    const jan5 = newUTC(2021, Month.January, 5);
    expect(addMonthsUTC(dec5, 1)).toEqual(jan5);
  });
  test('adds months during leap year', () => {
    const jan29 = newUTC(2020, Month.January, 29);
    const feb29 = newUTC(2020, Month.February, 29);
    expect(addMonthsUTC(jan29, 1)).toEqual(feb29);
  });

  /** Subtracts */
  test('subtracts a single month', () => {
    const july4 = newUTC(2020, Month.July, 4);
    const aug4 = newUTC(2020, Month.August, 4);
    expect(addMonthsUTC(aug4, -1)).toEqual(july4);
  });
  test('subtracts multiple months', () => {
    const july4 = newUTC(2020, Month.July, 4);
    const sept4 = newUTC(2020, Month.September, 4);
    expect(addMonthsUTC(sept4, -2)).toEqual(july4);
  });
  test('subtracts months across years', () => {
    const dec5 = newUTC(2020, Month.December, 5);
    const jan5 = newUTC(2021, Month.January, 5);
    expect(addMonthsUTC(jan5, -1)).toEqual(dec5);
  });
  test('subtracts months during leap year', () => {
    const feb29 = newUTC(2020, Month.February, 29);
    const mar29 = newUTC(2020, Month.March, 29);
    expect(addMonthsUTC(mar29, -1)).toEqual(feb29);
  });
});
