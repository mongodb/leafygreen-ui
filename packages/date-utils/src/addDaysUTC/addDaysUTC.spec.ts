import { Month } from '../constants';
import { newUTC } from '../newUTC';

import { addDaysUTC } from '.';

describe('packages/date-utils/addDaysUTC', () => {
  const june30 = newUTC(2023, Month.June, 30);
  const july1 = newUTC(2023, Month.July, 1);
  const july2 = newUTC(2023, Month.July, 2);
  const july8 = newUTC(2023, Month.July, 8);
  const dec30 = newUTC(2023, Month.December, 30);
  const jan1_24 = newUTC(2024, Month.January, 1);
  const feb28_24 = newUTC(2024, Month.February, 28);
  const feb29_24 = newUTC(2024, Month.February, 29);

  const standardTimeEnd = newUTC(2023, Month.March, 11);
  const daylightTimeStart = newUTC(2023, Month.March, 12);
  const weekIntoDT = newUTC(2023, Month.March, 18);
  const daylightTimeEnd = newUTC(2023, Month.November, 5);
  const standardTimeStart = newUTC(2023, Month.November, 6);
  const weekIntoST = newUTC(2023, Month.November, 12);

  test('adds a single day', () => {
    expect(addDaysUTC(july1, 1)).toEqual(july2);
  });
  test('adds multiple days', () => {
    expect(addDaysUTC(july1, 7)).toEqual(july8);
  });
  test('adds days across months', () => {
    expect(addDaysUTC(june30, 2)).toEqual(july2);
  });
  test('adds days across years', () => {
    expect(addDaysUTC(dec30, 2)).toEqual(jan1_24);
  });
  test('adds days during leap year', () => {
    expect(addDaysUTC(feb28_24, 1)).toEqual(feb29_24);
  });
  test('adds days across daylight time start', () => {
    expect(addDaysUTC(standardTimeEnd, 7)).toEqual(weekIntoDT);
  });
  test('adds days across daylight time end', () => {
    expect(addDaysUTC(daylightTimeEnd, 7)).toEqual(weekIntoST);
  });

  test('subtracts a single day', () => {
    expect(addDaysUTC(july2, -1)).toEqual(july1);
  });
  test('subtracts multiple days', () => {
    expect(addDaysUTC(july8, -7)).toEqual(july1);
  });
  test('subtracts days across months', () => {
    expect(addDaysUTC(july2, -2)).toEqual(june30);
  });
  test('subtracts days across years', () => {
    expect(addDaysUTC(jan1_24, -2)).toEqual(dec30);
  });
  test('subtracts days during leap year', () => {
    expect(addDaysUTC(feb29_24, -1)).toEqual(feb28_24);
  });
  test('subtracts days across daylight time start', () => {
    expect(addDaysUTC(daylightTimeStart, -1)).toEqual(standardTimeEnd);
  });
  test('subtracts days across daylight time end', () => {
    expect(addDaysUTC(standardTimeStart, -1)).toEqual(daylightTimeEnd);
  });
});
