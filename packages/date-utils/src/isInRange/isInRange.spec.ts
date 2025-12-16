import { isInRange } from './isInRange';

describe('packages/date-utils/isInRange', () => {
  describe('returns true', () => {
    describe('date only', () => {
      test('when the date is in the range', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1),
          new Date(2023, 1, 10),
        );
        expect(getIsInRange(new Date(2023, 1, 5))).toBe(true);
      });

      test('when the date is the same as the min', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1),
          new Date(2023, 1, 10),
        );
        expect(getIsInRange(new Date(2023, 1, 1))).toBe(true);
      });

      test('when the date is the same as the max', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1),
          new Date(2023, 1, 10),
        );
        expect(getIsInRange(new Date(2023, 1, 10))).toBe(true);
      });
    });

    describe('date and time', () => {
      test('when the date and time are in the range', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1, 0, 0, 0),
          new Date(2023, 1, 10, 0, 0, 0),
        );
        expect(getIsInRange(new Date(2023, 1, 5, 0, 0, 0))).toBe(true);
      });
      test('when the date and time are the same as the min', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1, 0, 0, 0),
          new Date(2023, 1, 10, 0, 0, 0),
        );
        expect(getIsInRange(new Date(2023, 1, 1, 0, 0, 0))).toBe(true);
      });
      test('when the date and time are the same as the max', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1, 0, 0, 0),
          new Date(2023, 1, 10, 0, 0, 0),
        );
        expect(getIsInRange(new Date(2023, 1, 10, 0, 0, 0))).toBe(true);
      });
    });
  });

  describe('returns false', () => {
    describe('date only', () => {
      test('when the date is greater than the max', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1),
          new Date(2023, 1, 10),
        );
        expect(getIsInRange(new Date(2023, 1, 11))).toBe(false);
      });

      test('when the date is less than the min', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1),
          new Date(2023, 1, 10),
        );
        expect(getIsInRange(new Date(2023, 1, 0))).toBe(false);
      });
    });

    describe('date and time', () => {
      test('when the date is greater than the max', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1, 0, 0, 0),
          new Date(2023, 1, 10, 0, 0, 0),
        );
        expect(getIsInRange(new Date(2023, 1, 10, 0, 0, 1))).toBe(false);
      });
      test('when the date is less than the min', () => {
        const getIsInRange = isInRange(
          new Date(2023, 1, 1, 0, 0, 0),
          new Date(2023, 1, 10, 0, 0, 0),
        );
        expect(getIsInRange(new Date(2023, 1, 0, 23, 59, 59))).toBe(false);
      });
    });

    test('when the date is invalid', () => {
      const getIsInRange = isInRange(
        new Date(2023, 1, 1),
        new Date(2023, 1, 10),
      );
      expect(getIsInRange(new Date('invalid'))).toBe(false);
    });

    test('when the date is undefined', () => {
      const getIsInRange = isInRange(
        new Date(2023, 1, 1),
        new Date(2023, 1, 10),
      );
      expect(getIsInRange(undefined)).toBe(false);
    });

    test('when the date is null', () => {
      const getIsInRange = isInRange(
        new Date(2023, 1, 1),
        new Date(2023, 1, 10),
      );
      expect(getIsInRange(null)).toBe(false);
    });
  });
});
