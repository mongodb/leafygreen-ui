import { getFormattedSegmentsFromDate, getSegmentsFromDate } from '.';

describe('packages/date-picker/utils/getSegmentsFromDate', () => {
  test('returns UTC d/m/y values', () => {
    const utc = new Date(Date.UTC(2023, 8, 1));
    const segments = getSegmentsFromDate(utc);
    expect(segments).toBeDefined();
    expect(segments.day).toBe('1');
    expect(segments.month).toBe('9');
    expect(segments.year).toBe('2023');
  });

  test('returns empty string for each segment when date is null', () => {
    const segments = getSegmentsFromDate(null);
    expect(segments).toBeDefined();
    expect(segments.day).toEqual('');
    expect(segments.month).toEqual('');
    expect(segments.year).toEqual('');
  });

  test('returns empty string for each segment when date is invalid', () => {
    const segments = getSegmentsFromDate(new Date('invalid'));
    expect(segments).toBeDefined();
    expect(segments.day).toEqual('');
    expect(segments.month).toEqual('');
    expect(segments.year).toEqual('');
  });
});

describe('packages/date-picker/utils/getFormattedSegmentsFromDate', () => {
  test('returns UTC d/m/y values', () => {
    const utc = new Date(Date.UTC(2023, 8, 1));
    const segments = getFormattedSegmentsFromDate(utc);
    expect(segments).toBeDefined();
    expect(segments.day).toBe('01');
    expect(segments.month).toBe('09');
    expect(segments.year).toBe('2023');
  });

  test('returns empty string for each segment when date is null', () => {
    const segments = getFormattedSegmentsFromDate(null);
    expect(segments).toBeDefined();
    expect(segments.day).toEqual('');
    expect(segments.month).toEqual('');
    expect(segments.year).toEqual('');
  });

  test('returns empty string for each segment when date is invalid', () => {
    const segments = getFormattedSegmentsFromDate(new Date('invalid'));
    expect(segments).toBeDefined();
    expect(segments.day).toEqual('');
    expect(segments.month).toEqual('');
    expect(segments.year).toEqual('');
  });
});
