import { getFormattedTimeSegmentsFromDate } from './getFormattedTimeSegmentsFromDate';

describe('packages/time-input/utils/getFormattedTimeSegmentsFromDate', () => {
  test('returns the formatted time segments from a date', () => {
    const formattedTimeSegments = getFormattedTimeSegmentsFromDate(
      new Date('2025-01-01T01:00:00Z'),
      'en-US',
      'America/New_York',
    );
    expect(formattedTimeSegments).toEqual({
      hour: '08',
      minute: '00',
      second: '00',
    });
  });
});
