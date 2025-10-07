import { isValidSegmentName, isValidSegmentValue } from '.';
import { DateSegment, DateSegmentValue } from '../../types';

describe('packages/date-picker/utils/isValidSegment', () => {
  describe('isValidSegment', () => {
    test('undefined returns false', () => {
      expect(isValidSegmentValue<DateSegmentValue>()).toBeFalsy();
    });

    test('a string returns false', () => {
      expect(isValidSegmentValue<DateSegmentValue>('')).toBeFalsy();
    });

    test('NaN returns false', () => {
      /// @ts-expect-error
      expect(isValidSegmentValue<DateSegmentValue>(NaN)).toBeFalsy();
    });

    test('0 returns false', () => {
      expect(isValidSegmentValue<DateSegmentValue>('0')).toBeFalsy();
    });

    test('negative returns false', () => {
      expect(isValidSegmentValue<DateSegmentValue>('-1')).toBeFalsy();
    });

    test('1970 returns true', () => {
      expect(isValidSegmentValue<DateSegmentValue>('1970')).toBeTruthy();
    });

    test('1 returns true', () => {
      expect(isValidSegmentValue<DateSegmentValue>('1')).toBeTruthy();
    });

    test('2038 returns true', () => {
      expect(isValidSegmentValue<DateSegmentValue>('2038')).toBeTruthy();
    });
  });

  describe('isValidSegmentName', () => {
    test('undefined returns false', () => {
      expect(isValidSegmentName(DateSegment)).toBeFalsy();
    });

    test('random string returns false', () => {
      expect(isValidSegmentName(DateSegment, '123')).toBeFalsy();
    });

    test('empty string returns false', () => {
      expect(isValidSegmentName(DateSegment, '')).toBeFalsy();
    });

    test('day string returns true', () => {
      expect(isValidSegmentName(DateSegment, 'day')).toBeTruthy();
    });

    test('month string returns true', () => {
      expect(isValidSegmentName(DateSegment, 'month')).toBeTruthy();
    });

    test('year string returns true', () => {
      expect(isValidSegmentName(DateSegment, 'year')).toBeTruthy();
    });
  });
});
