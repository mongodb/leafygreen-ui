import { createExplicitSegmentValidator } from '.';

const segmentObj = {
  Day: 'day',
  Month: 'month',
  Year: 'year',
} as const;

const rules = {
  day: { maxChars: 2, minExplicitValue: 4 },
  month: { maxChars: 2, minExplicitValue: 2 },
  year: { maxChars: 4 },
};

const isExplicitSegmentValue = createExplicitSegmentValidator(
  segmentObj,
  rules,
);

describe('packages/input-box/utils/createExplicitSegmentValidator', () => {
  describe('day segment', () => {
    test('returns false for single digit below minExplicitValue', () => {
      expect(isExplicitSegmentValue('day', '1')).toBe(false);
      expect(isExplicitSegmentValue('day', '2')).toBe(false);
      expect(isExplicitSegmentValue('day', '3')).toBe(false);
    });

    test('returns true for single digit at or above minExplicitValue', () => {
      expect(isExplicitSegmentValue('day', '4')).toBe(true);
      expect(isExplicitSegmentValue('day', '5')).toBe(true);
      expect(isExplicitSegmentValue('day', '9')).toBe(true);
    });

    test('returns true for two-digit values (maxChars)', () => {
      expect(isExplicitSegmentValue('day', '01')).toBe(true);
      expect(isExplicitSegmentValue('day', '10')).toBe(true);
      expect(isExplicitSegmentValue('day', '22')).toBe(true);
      expect(isExplicitSegmentValue('day', '31')).toBe(true);
    });

    test('returns false for invalid values', () => {
      expect(isExplicitSegmentValue('day', '0')).toBe(false);
      expect(isExplicitSegmentValue('day', '')).toBe(false);
    });
  });

  describe('month segment', () => {
    test('returns false for single digit below minExplicitValue', () => {
      expect(isExplicitSegmentValue('month', '1')).toBe(false);
    });

    test('returns true for single digit at or above minExplicitValue', () => {
      expect(isExplicitSegmentValue('month', '2')).toBe(true);
      expect(isExplicitSegmentValue('month', '3')).toBe(true);
      expect(isExplicitSegmentValue('month', '9')).toBe(true);
    });

    test('returns true for two-digit values (maxChars)', () => {
      expect(isExplicitSegmentValue('month', '01')).toBe(true);
      expect(isExplicitSegmentValue('month', '12')).toBe(true);
    });

    test('returns false for invalid values', () => {
      expect(isExplicitSegmentValue('month', '0')).toBe(false);
      expect(isExplicitSegmentValue('month', '')).toBe(false);
    });
  });

  describe('year segment', () => {
    test('returns false for values shorter than maxChars', () => {
      expect(isExplicitSegmentValue('year', '1')).toBe(false);
      expect(isExplicitSegmentValue('year', '20')).toBe(false);
      expect(isExplicitSegmentValue('year', '200')).toBe(false);
    });

    test('returns true for four-digit values (maxChars)', () => {
      expect(isExplicitSegmentValue('year', '1970')).toBe(true);
      expect(isExplicitSegmentValue('year', '2000')).toBe(true);
      expect(isExplicitSegmentValue('year', '2023')).toBe(true);
      expect(isExplicitSegmentValue('year', '0001')).toBe(true);
    });

    test('returns false for invalid values', () => {
      expect(isExplicitSegmentValue('year', '0')).toBe(false);
      expect(isExplicitSegmentValue('year', '')).toBe(false);
    });
  });

  describe('invalid segment names', () => {
    test('returns false for unknown segment names', () => {
      // @ts-expect-error Testing invalid segment
      expect(isExplicitSegmentValue('invalid', '10')).toBe(false);
      // @ts-expect-error Testing invalid segment
      expect(isExplicitSegmentValue('hour', '12')).toBe(false);
    });
  });
});
