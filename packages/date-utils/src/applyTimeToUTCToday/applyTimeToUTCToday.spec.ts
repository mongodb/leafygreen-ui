import { Month } from '../constants';
import { applyTimeToUTCToday } from './applyTimeToUTCToday';

describe('packages/date-utils/applyTimeToUTCToday', () => {
  beforeEach(() => {
    // Mock the current date/time in UTC
    jest.useFakeTimers().setSystemTime(
      new Date(Date.UTC(2026, Month.February, 20, 0, 0, 0)), // February 20, 2026 00:00:00 UTC
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("returns the date with the time applied to today's month, day, and year in UTC", () => {
    const date = new Date('2026-01-17T04:00:00Z'); // January 17th, 2026 at 4:00:00 AM
    const utcDate = applyTimeToUTCToday({ date });
    expect(utcDate?.toISOString()).toEqual('2026-02-20T04:00:00.000Z');
  });
});
