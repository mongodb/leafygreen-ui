import { getPaddedTimeSegments } from './getPaddedTimeSegments';

describe('packages/time-input/utils/getPaddedTimeSegments', () => {
  test('returns the padded time segments if all segments are 0', () => {
    const paddedTimeSegments = getPaddedTimeSegments({
      hour: '0',
      minute: '0',
      second: '0',
    });
    expect(paddedTimeSegments).toEqual({
      hour: '00',
      minute: '00',
      second: '00',
    });
  });

  test('returns the padded time segments if all segments are not 0', () => {
    const paddedTimeSegments = getPaddedTimeSegments({
      hour: '2',
      minute: '3',
      second: '1',
    });
    expect(paddedTimeSegments).toEqual({
      hour: '02',
      minute: '03',
      second: '01',
    });
  });

  test('does not pad segments that are already padded', () => {
    const paddedTimeSegments = getPaddedTimeSegments({
      hour: '02',
      minute: '03',
      second: '01',
    });
    expect(paddedTimeSegments).toEqual({
      hour: '02',
      minute: '03',
      second: '01',
    });
  });
});
