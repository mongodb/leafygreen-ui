import { isValidSegmentName, isValidSegmentValue } from '.';

const Segment = {
  Day: 'day',
  Month: 'month',
  Year: 'year',
} as const;
type SegmentValue = string;

describe('packages/input-box/utils/isValidSegment', () => {
  describe('isValidSegment', () => {
    test('undefined returns false', () => {
      expect(isValidSegmentValue<SegmentValue>()).toBeFalsy();
    });

    test('a string returns false', () => {
      expect(isValidSegmentValue<SegmentValue>('')).toBeFalsy();
    });

    test('NaN returns false', () => {
      /// @ts-expect-error
      expect(isValidSegmentValue<SegmentValue>(NaN)).toBeFalsy();
    });

    test('0 returns false', () => {
      expect(isValidSegmentValue<SegmentValue>('0')).toBeFalsy();
    });

    test('negative returns false', () => {
      expect(isValidSegmentValue<SegmentValue>('-1')).toBeFalsy();
    });

    test('1970 returns true', () => {
      expect(isValidSegmentValue<SegmentValue>('1970')).toBeTruthy();
    });

    test('1 returns true', () => {
      expect(isValidSegmentValue<SegmentValue>('1')).toBeTruthy();
    });

    test('2038 returns true', () => {
      expect(isValidSegmentValue<SegmentValue>('2038')).toBeTruthy();
    });
  });

  describe('isValidSegmentName', () => {
    test('undefined returns false', () => {
      expect(isValidSegmentName(Segment)).toBeFalsy();
    });

    test('random string returns false', () => {
      expect(isValidSegmentName(Segment, '123')).toBeFalsy();
    });

    test('empty string returns false', () => {
      expect(isValidSegmentName(Segment, '')).toBeFalsy();
    });

    test('day string returns true', () => {
      expect(isValidSegmentName(Segment, 'day')).toBeTruthy();
    });

    test('month string returns true', () => {
      expect(isValidSegmentName(Segment, 'month')).toBeTruthy();
    });

    test('year string returns true', () => {
      expect(isValidSegmentName(Segment, 'year')).toBeTruthy();
    });
  });
});
