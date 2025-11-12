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
      expect(isExplicitSegmentValue({ segment: 'day', value: '1' })).toBe(
        false,
      );
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '2',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '3',
        }),
      ).toBe(false);
    });

    test('returns true for single digit at or above minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '4',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '5',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '9',
        }),
      ).toBe(true);
    });

    test('returns true for two-digit values (maxChars)', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '01',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '10',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '22',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '31',
        }),
      ).toBe(true);
    });

    test('returns false for invalid values', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '0',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({ segment: 'day', value: '', allowZero: false }),
      ).toBe(false);
    });
  });

  describe('month segment', () => {
    test('returns false for single digit below minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'month',
          value: '1',
        }),
      ).toBe(false);
    });

    test('returns true for single digit at or above minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'month',
          value: '2',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'month',
          value: '3',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'month',
          value: '9',
        }),
      ).toBe(true);
    });

    test('returns true for two-digit values (maxChars)', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'month',
          value: '01',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'month',
          value: '12',
        }),
      ).toBe(true);
    });

    test('returns false for invalid values', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'month',
          value: '0',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'month',
          value: '',
        }),
      ).toBe(false);
    });
  });

  describe('year segment', () => {
    test('returns false for values shorter than maxChars', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '1',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '20',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '200',
        }),
      ).toBe(false);
    });

    test('returns true for four-digit values (maxChars)', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '1970',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '2000',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '2023',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '0001',
        }),
      ).toBe(true);
    });

    test('returns false for invalid values', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '0',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'year',
          value: '',
        }),
      ).toBe(false);
    });
  });

  describe('hour segment', () => {
    test('returns false for single digit below minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'hour',
          value: '1',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'hour',
          value: '0',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'hour',
          value: '2',
        }),
      ).toBe(false);
    });

    test('returns true for single digit at or above minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'hour',
          value: '3',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'hour',
          value: '9',
        }),
      ).toBe(true);
    });

    test('returns true for two-digit values at or above minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'hour',
          value: '12',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'hour',
          value: '23',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'hour',
          value: '05',
        }),
      ).toBe(true);
    });
  });

  describe('minute segment', () => {
    test('returns false for single digit below minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'minute',
          value: '0',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'minute',
          value: '1',
        }),
      ).toBe(false);
      expect(
        isExplicitSegmentValue({
          segment: 'minute',
          value: '5',
        }),
      ).toBe(false);
    });

    test('returns true for single digit at or above minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'minute',
          value: '6',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'minute',
          value: '7',
        }),
      ).toBe(true);
      expect(
        isExplicitSegmentValue({
          segment: 'minute',
          value: '9',
        }),
      ).toBe(true);
    });

    test('returns true for two-digit values at or above minExplicitValue', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'minute',
          value: '59',
        }),
      ).toBe(true);
    });
  });

  describe('allowZero', () => {
    test('returns false when allowZero is false', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '00',
          allowZero: false,
        }),
      ).toBe(false);
    });

    test('returns true when allowZero is true', () => {
      expect(
        isExplicitSegmentValue({
          segment: 'day',
          value: '00',
          allowZero: true,
        }),
      ).toBe(true);
    });
  });

  describe('invalid segment names', () => {
    test('returns false for unknown segment names', () => {
      expect(
        isExplicitSegmentValue({
          // @ts-expect-error Testing invalid segment
          segment: 'invalid',
          value: '10',
        }),
      ).toBe(false);

      expect(
        isExplicitSegmentValue({
          // @ts-expect-error Testing invalid segment
          segment: 'millisecond',
          value: '12',
        }),
      ).toBe(false);
    });
  });
});
