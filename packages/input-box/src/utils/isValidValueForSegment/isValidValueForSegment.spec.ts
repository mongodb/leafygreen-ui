import { MAX_DATE, MIN_DATE } from '@leafygreen-ui/date-utils';
import { isValidValueForSegment } from '.';

const SegmentObj = {
  Day: 'day',
  Month: 'month',
  Year: 'year',
} as const;

type SegmentObj = (typeof SegmentObj)[keyof typeof SegmentObj];

const defaultMin = {
  day: 1,
  month: 1,
  year: MIN_DATE.getUTCFullYear(),
} as const;

const defaultMax = {
  day: 31,
  month: 12,
  year: MAX_DATE.getUTCFullYear(),
} as const;

const isValidValueForSegmentWrapper = (segment: SegmentObj, value: string) => {
  return isValidValueForSegment(
    segment,
    value,
    defaultMin,
    defaultMax,
    SegmentObj,
  );
};

describe('packages/date-picker/utils/isValidSegmentValue', () => {
  test('day', () => {
    expect(isValidValueForSegmentWrapper('day', '1')).toBe(true);
    expect(isValidValueForSegmentWrapper('day', '15')).toBe(true);
    expect(isValidValueForSegmentWrapper('day', '31')).toBe(true);

    expect(isValidValueForSegmentWrapper('day', '0')).toBe(false);
    expect(isValidValueForSegmentWrapper('day', '32')).toBe(false);
  });

  test('month', () => {
    expect(isValidValueForSegmentWrapper('month', '1')).toBe(true);
    expect(isValidValueForSegmentWrapper('month', '9')).toBe(true);
    expect(isValidValueForSegmentWrapper('month', '12')).toBe(true);

    expect(isValidValueForSegmentWrapper('month', '0')).toBe(false);
    expect(isValidValueForSegmentWrapper('month', '28')).toBe(false);
  });

  test('year', () => {
    expect(isValidValueForSegmentWrapper('year', '1970')).toBe(true);
    expect(isValidValueForSegmentWrapper('year', '2000')).toBe(true);
    expect(isValidValueForSegmentWrapper('year', '2038')).toBe(true);

    // All positive numbers 4-digit are considered valid years by default
    expect(isValidValueForSegmentWrapper('year', '1000')).toBe(true);
    expect(isValidValueForSegmentWrapper('year', '1945')).toBe(true);
    expect(isValidValueForSegmentWrapper('year', '2048')).toBe(true);
    expect(isValidValueForSegmentWrapper('year', '9999')).toBe(true);

    expect(isValidValueForSegmentWrapper('year', '0')).toBe(false);
    expect(isValidValueForSegmentWrapper('year', '20')).toBe(false);
    expect(isValidValueForSegmentWrapper('year', '200')).toBe(false);
    expect(isValidValueForSegmentWrapper('year', '999')).toBe(false);
    expect(isValidValueForSegmentWrapper('year', '10000')).toBe(false);
    expect(isValidValueForSegmentWrapper('year', '-2000')).toBe(false);
  });
});
