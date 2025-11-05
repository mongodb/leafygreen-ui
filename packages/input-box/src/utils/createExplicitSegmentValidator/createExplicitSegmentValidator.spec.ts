import { createExplicitSegmentValidator } from './createExplicitSegmentValidator';

const segmentObj = {
  Day: 'day',
  Month: 'month',
  Year: 'year',
  Hour: 'hour',
  Minute: 'minute',
} as const;

const rules = {
  day: { maxChars: 2, minExplicitValue: 4 },
  month: { maxChars: 2, minExplicitValue: 2 },
  year: { maxChars: 4 }, // any 4-digit year
  hour: { maxChars: 2, minExplicitValue: 3 },
  minute: { maxChars: 2, minExplicitValue: 6 },
};

const isExplicitSegmentValue = createExplicitSegmentValidator({
  segmentEnum: segmentObj,
  rules,
});

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

  describe('hour segment', () => {
    test('returns false for single digit below minExplicitValue', () => {
      expect(isExplicitSegmentValue('hour', '1')).toBe(false);
      expect(isExplicitSegmentValue('hour', '0')).toBe(false);
      expect(isExplicitSegmentValue('hour', '2')).toBe(false);
    });

    test('returns true for single digit at or above minExplicitValue', () => {
      expect(isExplicitSegmentValue('hour', '3')).toBe(true);
      expect(isExplicitSegmentValue('hour', '9')).toBe(true);
    });

    test('returns true for two-digit values at or above minExplicitValue', () => {
      expect(isExplicitSegmentValue('hour', '12')).toBe(true);
      expect(isExplicitSegmentValue('hour', '23')).toBe(true);
      expect(isExplicitSegmentValue('hour', '05')).toBe(true);
    });
  });

  describe('minute segment', () => {
    test('returns false for single digit below minExplicitValue', () => {
      expect(isExplicitSegmentValue('minute', '0')).toBe(false);
      expect(isExplicitSegmentValue('minute', '1')).toBe(false);
      expect(isExplicitSegmentValue('minute', '5')).toBe(false);
    });

    test('returns true for single digit at or above minExplicitValue', () => {
      expect(isExplicitSegmentValue('minute', '6')).toBe(true);
      expect(isExplicitSegmentValue('minute', '7')).toBe(true);
      expect(isExplicitSegmentValue('minute', '9')).toBe(true);
    });

    test('returns true for two-digit values at or above minExplicitValue', () => {
      expect(isExplicitSegmentValue('minute', '59')).toBe(true);
    });
  });

  describe('invalid segment names', () => {
    test('returns false for unknown segment names', () => {
      // @ts-expect-error Testing invalid segment
      expect(isExplicitSegmentValue('invalid', '10')).toBe(false);
      // @ts-expect-error Testing invalid segment
      expect(isExplicitSegmentValue('millisecond', '12')).toBe(false);
    });
  });
});
