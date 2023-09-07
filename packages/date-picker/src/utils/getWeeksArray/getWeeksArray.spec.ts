import { isNull } from 'lodash';

import { Month } from '../../constants';

import { getWeeksArray } from '.';

describe('packages/date-picker/utils/getWeeksArray', () => {
  test('starts the week on the correct day for the locale', () => {
    const month = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(month, { dateFormat: 'en-US' });
    expect(arr[0][0]).toBeNull(); // Sun
    expect(arr[0][1]).toBeNull(); // Mon
    expect(arr[0][2]).not.toBeNull(); // Tues
  });

  describe('August 2023', () => {
    const aug23 = new Date(Date.UTC(2023, Month.August, 1));
    const arr = getWeeksArray(aug23, { dateFormat: 'iso-8601' });

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
            new Date(Date.UTC(2023, 7, 1)), // Tu
            new Date(Date.UTC(2023, 7, 2)), // We
            new Date(Date.UTC(2023, 7, 3)), // Th
            new Date(Date.UTC(2023, 7, 4)), // Fr
            new Date(Date.UTC(2023, 7, 5)), // Sa
            new Date(Date.UTC(2023, 7, 6)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 7, 7)), // Mo
            new Date(Date.UTC(2023, 7, 8)), // Tu
            new Date(Date.UTC(2023, 7, 9)), // We
            new Date(Date.UTC(2023, 7, 10)), // Th
            new Date(Date.UTC(2023, 7, 11)), // Fr
            new Date(Date.UTC(2023, 7, 12)), // Sa
            new Date(Date.UTC(2023, 7, 13)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 7, 14)), // Mo
            new Date(Date.UTC(2023, 7, 15)), // Tu
            new Date(Date.UTC(2023, 7, 16)), // We
            new Date(Date.UTC(2023, 7, 17)), // Th
            new Date(Date.UTC(2023, 7, 18)), // Fr
            new Date(Date.UTC(2023, 7, 19)), // Sa
            new Date(Date.UTC(2023, 7, 20)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 7, 21)), // Mo
            new Date(Date.UTC(2023, 7, 22)), // Tu
            new Date(Date.UTC(2023, 7, 23)), // We
            new Date(Date.UTC(2023, 7, 24)), // Th
            new Date(Date.UTC(2023, 7, 25)), // Fr
            new Date(Date.UTC(2023, 7, 26)), // Sa
            new Date(Date.UTC(2023, 7, 27)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 7, 28)), // Mo
            new Date(Date.UTC(2023, 7, 29)), // Tu
            new Date(Date.UTC(2023, 7, 30)), // We
            new Date(Date.UTC(2023, 7, 31)), // Th
          ]),
        ]),
      );
    });
  });

  describe('September 2023', () => {
    const sept23 = new Date(Date.UTC(2023, Month.September, 1));
    const arr = getWeeksArray(sept23, { dateFormat: 'iso8601' });

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
            new Date(Date.UTC(2023, 8, 1)), // Fr
            new Date(Date.UTC(2023, 8, 2)), // Sa
            new Date(Date.UTC(2023, 8, 3)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 8, 4)), // Mo
            new Date(Date.UTC(2023, 8, 5)), // Tu
            new Date(Date.UTC(2023, 8, 6)), // We
            new Date(Date.UTC(2023, 8, 7)), // Th
            new Date(Date.UTC(2023, 8, 8)), // Fr
            new Date(Date.UTC(2023, 8, 9)), // Sa
            new Date(Date.UTC(2023, 8, 10)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 8, 11)), // Mo
            new Date(Date.UTC(2023, 8, 12)), // Tu
            new Date(Date.UTC(2023, 8, 13)), // We
            new Date(Date.UTC(2023, 8, 14)), // Th
            new Date(Date.UTC(2023, 8, 15)), // Fr
            new Date(Date.UTC(2023, 8, 16)), // Sa
            new Date(Date.UTC(2023, 8, 17)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 8, 18)), // Mo
            new Date(Date.UTC(2023, 8, 19)), // Tu
            new Date(Date.UTC(2023, 8, 20)), // We
            new Date(Date.UTC(2023, 8, 21)), // Th
            new Date(Date.UTC(2023, 8, 22)), // Fr
            new Date(Date.UTC(2023, 8, 23)), // Sa
            new Date(Date.UTC(2023, 8, 24)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 8, 25)), // Mo
            new Date(Date.UTC(2023, 8, 26)), // Tu
            new Date(Date.UTC(2023, 8, 27)), // We
            new Date(Date.UTC(2023, 8, 28)), // Th
            new Date(Date.UTC(2023, 8, 29)), // Fr
            new Date(Date.UTC(2023, 8, 30)), // Sa
          ]),
        ]),
      );
    });
  });

  describe('February 2023', () => {
    const feb23 = new Date(Date.UTC(2023, Month.February, 1));
    const arr = getWeeksArray(feb23, { dateFormat: 'iso8601' });

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
            new Date(Date.UTC(2023, 2, 1)), // We
            new Date(Date.UTC(2023, 2, 2)), // Th
            new Date(Date.UTC(2023, 2, 3)), // Fr
            new Date(Date.UTC(2023, 2, 4)), // Sa
            new Date(Date.UTC(2023, 2, 5)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 2, 6)), // Mo
            new Date(Date.UTC(2023, 2, 7)), // Tu
            new Date(Date.UTC(2023, 2, 8)), // We
            new Date(Date.UTC(2023, 2, 9)), // Th
            new Date(Date.UTC(2023, 2, 10)), // Fr
            new Date(Date.UTC(2023, 2, 11)), // Sa
            new Date(Date.UTC(2023, 2, 12)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 2, 13)), // Mo
            new Date(Date.UTC(2023, 2, 14)), // Tu
            new Date(Date.UTC(2023, 2, 15)), // We
            new Date(Date.UTC(2023, 2, 16)), // Th
            new Date(Date.UTC(2023, 2, 17)), // Fr
            new Date(Date.UTC(2023, 2, 18)), // Sa
            new Date(Date.UTC(2023, 2, 19)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 2, 20)), // Mo
            new Date(Date.UTC(2023, 2, 21)), // Tu
            new Date(Date.UTC(2023, 2, 22)), // We
            new Date(Date.UTC(2023, 2, 23)), // Th
            new Date(Date.UTC(2023, 2, 24)), // Fr
            new Date(Date.UTC(2023, 2, 25)), // Sa
            new Date(Date.UTC(2023, 2, 26)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 2, 27)), // Mo
            new Date(Date.UTC(2023, 2, 28)), // Tu
          ]),
        ]),
      );
    });
  });

  describe('February 2024 (leap-year)', () => {
    const feb23 = new Date(Date.UTC(2024, Month.February, 1));
    const arr = getWeeksArray(feb23, { dateFormat: 'iso8601' });

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
            new Date(Date.UTC(2023, 2, 1)), // Th
            new Date(Date.UTC(2023, 2, 2)), // Fr
            new Date(Date.UTC(2023, 2, 3)), // Sa
            new Date(Date.UTC(2023, 2, 4)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 2, 5)), // Mo
            new Date(Date.UTC(2023, 2, 6)), // Tu
            new Date(Date.UTC(2023, 2, 7)), // We
            new Date(Date.UTC(2023, 2, 8)), // Th
            new Date(Date.UTC(2023, 2, 9)), // Fr
            new Date(Date.UTC(2023, 2, 10)), // Sa
            new Date(Date.UTC(2023, 2, 11)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 2, 12)), // Mo
            new Date(Date.UTC(2023, 2, 13)), // Tu
            new Date(Date.UTC(2023, 2, 14)), // We
            new Date(Date.UTC(2023, 2, 15)), // Th
            new Date(Date.UTC(2023, 2, 16)), // Fr
            new Date(Date.UTC(2023, 2, 17)), // Sa
            new Date(Date.UTC(2023, 2, 18)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 2, 19)), // Mo
            new Date(Date.UTC(2023, 2, 20)), // Tu
            new Date(Date.UTC(2023, 2, 21)), // We
            new Date(Date.UTC(2023, 2, 22)), // Th
            new Date(Date.UTC(2023, 2, 23)), // Fr
            new Date(Date.UTC(2023, 2, 24)), // Sa
            new Date(Date.UTC(2023, 2, 25)), // Su
          ]),
          expect.arrayContaining([
            new Date(Date.UTC(2023, 2, 26)), // Mo
            new Date(Date.UTC(2023, 2, 27)), // Tu
            new Date(Date.UTC(2023, 2, 28)), // We
            new Date(Date.UTC(2023, 2, 29)), // Th
          ]),
        ]),
      );
    });
  });
});
