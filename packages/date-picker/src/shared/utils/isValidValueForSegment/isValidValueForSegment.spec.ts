import { isValidValueForSegment } from '.';

describe('packages/date-picker/utils/isValidSegmentValue', () => {
  test('day', () => {
    expect(isValidValueForSegment('day', '1')).toBe(true);
    expect(isValidValueForSegment('day', '15')).toBe(true);
    expect(isValidValueForSegment('day', '31')).toBe(true);

    expect(isValidValueForSegment('day', '0')).toBe(false);
    expect(isValidValueForSegment('day', '32')).toBe(false);
  });

  test('month', () => {
    expect(isValidValueForSegment('month', '1')).toBe(true);
    expect(isValidValueForSegment('month', '9')).toBe(true);
    expect(isValidValueForSegment('month', '12')).toBe(true);

    expect(isValidValueForSegment('month', '0')).toBe(false);
    expect(isValidValueForSegment('month', '28')).toBe(false);
  });

  test('year', () => {
    expect(isValidValueForSegment('year', '1970')).toBe(true);
    expect(isValidValueForSegment('year', '2000')).toBe(true);
    expect(isValidValueForSegment('year', '2038')).toBe(true);

    // All positive numbers 4-digit are considered valid years by default
    expect(isValidValueForSegment('year', '1000')).toBe(true);
    expect(isValidValueForSegment('year', '1945')).toBe(true);
    expect(isValidValueForSegment('year', '2048')).toBe(true);
    expect(isValidValueForSegment('year', '9999')).toBe(true);

    expect(isValidValueForSegment('year', '0')).toBe(false);
    expect(isValidValueForSegment('year', '20')).toBe(false);
    expect(isValidValueForSegment('year', '200')).toBe(false);
    expect(isValidValueForSegment('year', '999')).toBe(false);
    expect(isValidValueForSegment('year', '10000')).toBe(false);
    expect(isValidValueForSegment('year', '-2000')).toBe(false);
  });
});
