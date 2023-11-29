import { isExplicitSegmentValue } from '.';

describe('packages/date-picker/utils/isExplicitSegmentValue', () => {
  test('day', () => {
    expect(isExplicitSegmentValue('day', '1')).toBe(false);
    expect(isExplicitSegmentValue('day', '01')).toBe(true);
    expect(isExplicitSegmentValue('day', '4')).toBe(true);
    expect(isExplicitSegmentValue('day', '10')).toBe(true);
    expect(isExplicitSegmentValue('day', '22')).toBe(true);
    expect(isExplicitSegmentValue('day', '31')).toBe(true);
  });

  test('month', () => {
    expect(isExplicitSegmentValue('month', '1')).toBe(false);
    expect(isExplicitSegmentValue('month', '01')).toBe(true);
    expect(isExplicitSegmentValue('month', '2')).toBe(true);
    expect(isExplicitSegmentValue('month', '12')).toBe(true);
  });

  test('year', () => {
    expect(isExplicitSegmentValue('year', '1')).toBe(false);
    expect(isExplicitSegmentValue('year', '200')).toBe(false);
    expect(isExplicitSegmentValue('year', '1970')).toBe(true);
    expect(isExplicitSegmentValue('year', '2000')).toBe(true);
    expect(isExplicitSegmentValue('year', '0001')).toBe(true);
  });
});
