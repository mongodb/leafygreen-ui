import { isValidSegmentName, isValidSegmentValue } from '.';

describe('packages/date-picker/utils/isValidSegment', () => {
  describe('isValidSegment', () => {
    test('undefined returns false', () => {
      expect(isValidSegmentValue()).toBeFalsy();
    });

    test('a string returns false', () => {
      expect(isValidSegmentValue('')).toBeFalsy();
    });

    test('NaN returns false', () => {
      /// @ts-expect-error
      expect(isValidSegmentValue(NaN)).toBeFalsy();
    });

    test('0 returns false', () => {
      expect(isValidSegmentValue('0')).toBeFalsy();
    });

    test('negative returns false', () => {
      expect(isValidSegmentValue('-1')).toBeFalsy();
    });

    test('1970 returns true', () => {
      expect(isValidSegmentValue('1970')).toBeTruthy();
    });

    test('1 returns true', () => {
      expect(isValidSegmentValue('1')).toBeTruthy();
    });

    test('2038 returns true', () => {
      expect(isValidSegmentValue('2038')).toBeTruthy();
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
