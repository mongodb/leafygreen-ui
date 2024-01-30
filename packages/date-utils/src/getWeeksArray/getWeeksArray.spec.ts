import isNull from 'lodash/isNull';

import { Month } from '../constants';

import { getWeeksArray } from '.';

describe('packages/date-utils/getWeeksArray', () => {
  test('starts the week on the correct day for the locale', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, { locale: 'en-US' });
    expect(arr[0][0]).toBeNull(); // Sun
    expect(arr[0][1]).toBeNull(); // Mon
    expect(arr[0][2]).not.toBeNull(); // Tues
  });

  describe('August 2023', () => {
    const aug23 = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(aug23, { locale: 'iso-8601' });

    test('returned array has the correct number of elements', () => {
      const daysInAugust = 31;
      const augStartsOn = 1;
      expect(arr.flat()).toHaveLength(daysInAugust + augStartsOn);
      expect(arr.flat().filter(_ => !isNull(_))).toHaveLength(daysInAugust);
    });

    test('returned array has chunks of length 7', () => {
      expect(arr[0]).toHaveLength(7);
      expect(arr[1]).toHaveLength(7);
      expect(arr[2]).toHaveLength(7);
      expect(arr[3]).toHaveLength(7);
    });

    test('pads beginning of month with empty values', () => {
      expect(arr[0][0]).toBeNull(); // Mon
      expect(arr[0][1]).not.toBeNull(); // Tues
    });

    test('data is returned as expected', () => {
      expect(arr).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            null, // Mo
            new Date(Date.UTC(2023, Month.August, 1)), // Tu
            new Date(Date.UTC(2023, Month.August, 2)), // We
            new Date(Date.UTC(2023, Month.August, 3)), // Th
            new Date(Date.UTC(2023, Month.August, 4)), // Fr
            new Date(Date.UTC(2023, Month.August, 5)), // Sa
            new Date(Date.UTC(2023, Month.August, 6)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.August, 7)), // Mo
            new Date(Date.UTC(2023, Month.August, 8)), // Tu
            new Date(Date.UTC(2023, Month.August, 9)), // We
            new Date(Date.UTC(2023, Month.August, 10)), // Th
            new Date(Date.UTC(2023, Month.August, 11)), // Fr
            new Date(Date.UTC(2023, Month.August, 12)), // Sa
            new Date(Date.UTC(2023, Month.August, 13)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.August, 14)), // Mo
            new Date(Date.UTC(2023, Month.August, 15)), // Tu
            new Date(Date.UTC(2023, Month.August, 16)), // We
            new Date(Date.UTC(2023, Month.August, 17)), // Th
            new Date(Date.UTC(2023, Month.August, 18)), // Fr
            new Date(Date.UTC(2023, Month.August, 19)), // Sa
            new Date(Date.UTC(2023, Month.August, 20)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.August, 21)), // Mo
            new Date(Date.UTC(2023, Month.August, 22)), // Tu
            new Date(Date.UTC(2023, Month.August, 23)), // We
            new Date(Date.UTC(2023, Month.August, 24)), // Th
            new Date(Date.UTC(2023, Month.August, 25)), // Fr
            new Date(Date.UTC(2023, Month.August, 26)), // Sa
            new Date(Date.UTC(2023, Month.August, 27)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.August, 28)), // Mo
            new Date(Date.UTC(2023, Month.August, 29)), // Tu
            new Date(Date.UTC(2023, Month.August, 30)), // We
            new Date(Date.UTC(2023, Month.August, 31)), // Th
          ]),
        ]),
      );
    });
  });

  describe('September 2023', () => {
    const sept23 = new Date(Date.UTC(2023, Month.September, 1));
    const arr = getWeeksArray(sept23, { locale: 'iso8601' });

    test('returned array has the correct number of elements', () => {
      const daysInSept = 30;
      const septStartsOn = 4;
      expect(arr.flat()).toHaveLength(daysInSept + septStartsOn);
      expect(arr.flat().filter(_ => !isNull(_))).toHaveLength(daysInSept);
    });

    test('returned array has chunks of length 7', () => {
      expect(arr[0]).toHaveLength(7);
      expect(arr[1]).toHaveLength(7);
      expect(arr[2]).toHaveLength(7);
      expect(arr[3]).toHaveLength(7);
    });

    test('pads beginning of month with empty values', () => {
      expect(arr[0][0]).toBeNull(); // M
      expect(arr[0][1]).toBeNull(); // T
      expect(arr[0][2]).toBeNull(); // W
      expect(arr[0][3]).toBeNull(); // Th
      expect(arr[0][4]).not.toBeNull(); // F
    });

    test('data is returned as expected', () => {
      expect(arr).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            null, // Mo
            null, // Tu
            null, // We
            null, // Th
            new Date(Date.UTC(2023, Month.September, 1)), // Fr
            new Date(Date.UTC(2023, Month.September, 2)), // Sa
            new Date(Date.UTC(2023, Month.September, 3)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.September, 4)), // Mo
            new Date(Date.UTC(2023, Month.September, 5)), // Tu
            new Date(Date.UTC(2023, Month.September, 6)), // We
            new Date(Date.UTC(2023, Month.September, 7)), // Th
            new Date(Date.UTC(2023, Month.September, 8)), // Fr
            new Date(Date.UTC(2023, Month.September, 9)), // Sa
            new Date(Date.UTC(2023, Month.September, 10)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.September, 11)), // Mo
            new Date(Date.UTC(2023, Month.September, 12)), // Tu
            new Date(Date.UTC(2023, Month.September, 13)), // We
            new Date(Date.UTC(2023, Month.September, 14)), // Th
            new Date(Date.UTC(2023, Month.September, 15)), // Fr
            new Date(Date.UTC(2023, Month.September, 16)), // Sa
            new Date(Date.UTC(2023, Month.September, 17)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.September, 18)), // Mo
            new Date(Date.UTC(2023, Month.September, 19)), // Tu
            new Date(Date.UTC(2023, Month.September, 20)), // We
            new Date(Date.UTC(2023, Month.September, 21)), // Th
            new Date(Date.UTC(2023, Month.September, 22)), // Fr
            new Date(Date.UTC(2023, Month.September, 23)), // Sa
            new Date(Date.UTC(2023, Month.September, 24)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.September, 25)), // Mo
            new Date(Date.UTC(2023, Month.September, 26)), // Tu
            new Date(Date.UTC(2023, Month.September, 27)), // We
            new Date(Date.UTC(2023, Month.September, 28)), // Th
            new Date(Date.UTC(2023, Month.September, 29)), // Fr
            new Date(Date.UTC(2023, Month.September, 30)), // Sa
          ]),
        ]),
      );
    });
  });

  describe('February 2023', () => {
    const feb23 = new Date(Date.UTC(2023, Month.February, 1));
    const arr = getWeeksArray(feb23, { locale: 'iso8601' });

    test('returned array has the correct number of elements', () => {
      const daysInFeb23 = 28;
      const feb23StartsOn = 2;
      expect(arr.flat()).toHaveLength(daysInFeb23 + feb23StartsOn);
      expect(arr.flat().filter(_ => !isNull(_))).toHaveLength(daysInFeb23);
    });

    test('returned array has chunks of length 7', () => {
      expect(arr[0]).toHaveLength(7);
      expect(arr[1]).toHaveLength(7);
      expect(arr[2]).toHaveLength(7);
      expect(arr[3]).toHaveLength(7);
    });

    test('pads beginning of month with empty values', () => {
      expect(arr[0][0]).toBeNull(); // M
      expect(arr[0][1]).toBeNull(); // T
      expect(arr[0][2]).not.toBeNull(); // W
    });

    test('data is returned as expected', () => {
      expect(arr).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            null, // Mo
            null, // Tu
            new Date(Date.UTC(2023, Month.February, 1)), // We
            new Date(Date.UTC(2023, Month.February, 2)), // Th
            new Date(Date.UTC(2023, Month.February, 3)), // Fr
            new Date(Date.UTC(2023, Month.February, 4)), // Sa
            new Date(Date.UTC(2023, Month.February, 5)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.February, 6)), // Mo
            new Date(Date.UTC(2023, Month.February, 7)), // Tu
            new Date(Date.UTC(2023, Month.February, 8)), // We
            new Date(Date.UTC(2023, Month.February, 9)), // Th
            new Date(Date.UTC(2023, Month.February, 10)), // Fr
            new Date(Date.UTC(2023, Month.February, 11)), // Sa
            new Date(Date.UTC(2023, Month.February, 12)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.February, 13)), // Mo
            new Date(Date.UTC(2023, Month.February, 14)), // Tu
            new Date(Date.UTC(2023, Month.February, 15)), // We
            new Date(Date.UTC(2023, Month.February, 16)), // Th
            new Date(Date.UTC(2023, Month.February, 17)), // Fr
            new Date(Date.UTC(2023, Month.February, 18)), // Sa
            new Date(Date.UTC(2023, Month.February, 19)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.February, 20)), // Mo
            new Date(Date.UTC(2023, Month.February, 21)), // Tu
            new Date(Date.UTC(2023, Month.February, 22)), // We
            new Date(Date.UTC(2023, Month.February, 23)), // Th
            new Date(Date.UTC(2023, Month.February, 24)), // Fr
            new Date(Date.UTC(2023, Month.February, 25)), // Sa
            new Date(Date.UTC(2023, Month.February, 26)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, Month.February, 27)), // Mo
            new Date(Date.UTC(2023, Month.February, 28)), // Tu
          ]),
        ]),
      );
    });
  });

  describe('February 2024 (leap-year)', () => {
    const feb23 = new Date(Date.UTC(2024, Month.February, 1));
    const arr = getWeeksArray(feb23, { locale: 'iso8601' });

    test('returned array has the correct number of elements', () => {
      const daysInFeb24 = 29;
      const feb24StartsOn = 3;
      expect(arr.flat()).toHaveLength(daysInFeb24 + feb24StartsOn);
      expect(arr.flat().filter(_ => !isNull(_))).toHaveLength(daysInFeb24);
    });

    test('returned array has chunks of length 7', () => {
      expect(arr[0]).toHaveLength(7);
      expect(arr[1]).toHaveLength(7);
      expect(arr[2]).toHaveLength(7);
      expect(arr[3]).toHaveLength(7);
    });

    test('pads beginning of month with empty values', () => {
      expect(arr[0][0]).toBeNull(); // M
      expect(arr[0][1]).toBeNull(); // T
      expect(arr[0][2]).toBeNull(); // W
      expect(arr[0][3]).not.toBeNull(); // Th
    });

    test('data is returned as expected', () => {
      expect(arr).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            null, // Mo
            null, // Tu
            null, // We
            new Date(Date.UTC(2024, Month.February, 1)), // Th
            new Date(Date.UTC(2024, Month.February, 2)), // Fr
            new Date(Date.UTC(2024, Month.February, 3)), // Sa
            new Date(Date.UTC(2024, Month.February, 4)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2024, Month.February, 5)), // Mo
            new Date(Date.UTC(2024, Month.February, 6)), // Tu
            new Date(Date.UTC(2024, Month.February, 7)), // We
            new Date(Date.UTC(2024, Month.February, 8)), // Th
            new Date(Date.UTC(2024, Month.February, 9)), // Fr
            new Date(Date.UTC(2024, Month.February, 10)), // Sa
            new Date(Date.UTC(2024, Month.February, 11)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2024, Month.February, 12)), // Mo
            new Date(Date.UTC(2024, Month.February, 13)), // Tu
            new Date(Date.UTC(2024, Month.February, 14)), // We
            new Date(Date.UTC(2024, Month.February, 15)), // Th
            new Date(Date.UTC(2024, Month.February, 16)), // Fr
            new Date(Date.UTC(2024, Month.February, 17)), // Sa
            new Date(Date.UTC(2024, Month.February, 18)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2024, Month.February, 19)), // Mo
            new Date(Date.UTC(2024, Month.February, 20)), // Tu
            new Date(Date.UTC(2024, Month.February, 21)), // We
            new Date(Date.UTC(2024, Month.February, 22)), // Th
            new Date(Date.UTC(2024, Month.February, 23)), // Fr
            new Date(Date.UTC(2024, Month.February, 24)), // Sa
            new Date(Date.UTC(2024, Month.February, 25)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2024, Month.February, 26)), // Mo
            new Date(Date.UTC(2024, Month.February, 27)), // Tu
            new Date(Date.UTC(2024, Month.February, 28)), // We
            new Date(Date.UTC(2024, Month.February, 29)), // Th
          ]),
        ]),
      );
    });
  });
});
