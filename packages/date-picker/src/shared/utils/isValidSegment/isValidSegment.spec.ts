import { isValidSegment, isValidSegmentName } from '.';

describe('packages/date-picker/utils/isValidSegment', () => {
  describe('isValidSegment', () => {
    test('undefined returns false', () => {
      expect(isValidSegment()).toBeFalsy();
    });

    test('a string returns false', () => {
      // @ts-expect-error
      expect(isValidSegment('')).toBeFalsy();
    });

    test('NaN returns false', () => {
      expect(isValidSegment(NaN)).toBeFalsy();
    });

    test('0 returns false', () => {
      expect(isValidSegment(0)).toBeFalsy();
    });

    test('negative returns false', () => {
      expect(isValidSegment(-1)).toBeFalsy();
    });

    test('1970 returns true', () => {
      expect(isValidSegment(1970)).toBeTruthy();
    });

    test('1 returns true', () => {
      expect(isValidSegment(1)).toBeTruthy();
    });

    test('2038 returns true', () => {
      expect(isValidSegment(2038)).toBeTruthy();
    });
  });

  describe('isValidSegmentName', () => {
    test('undefined returns false', () => {
      expect(isValidSegmentName()).toBeFalsy();
    });

    test('random string returns false', () => {
      expect(isValidSegmentName('123')).toBeFalsy();
    });

    test('empty string returns false', () => {
      expect(isValidSegmentName('')).toBeFalsy();
    });

    test('day string returns true', () => {
      expect(isValidSegmentName('day')).toBeTruthy();
    });

    test('month string returns true', () => {
      expect(isValidSegmentName('month')).toBeTruthy();
    });

    test('year string returns true', () => {
      expect(isValidSegmentName('year')).toBeTruthy();
    });
  });
});
