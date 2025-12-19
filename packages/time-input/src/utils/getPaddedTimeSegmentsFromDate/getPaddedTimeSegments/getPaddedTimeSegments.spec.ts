import { getFormattedTimeSegments } from './getFormattedTimeSegments';

describe('packages/time-input/utils/getFormattedTimeSegments', () => {
  test('returns the formatted time segments if all segments are 0', () => {
    const formattedTimeSegments = getFormattedTimeSegments({
      hour: '0',
      minute: '0',
      second: '0',
    });
    expect(formattedTimeSegments).toEqual({
      hour: '00',
      minute: '00',
      second: '00',
    });
  });

  test('returns the formatted time segments', () => {
    const formattedTimeSegments = getFormattedTimeSegments({
      hour: '2',
      minute: '3',
      second: '1',
    });
    expect(formattedTimeSegments).toEqual({
      hour: '02',
      minute: '03',
      second: '01',
    });
  });

  test('does not format segments that are already formatted', () => {
    const formattedTimeSegments = getFormattedTimeSegments({
      hour: '02',
      minute: '03',
      second: '01',
    });
    expect(formattedTimeSegments).toEqual({
      hour: '02',
      minute: '03',
      second: '01',
    });
  });
});
