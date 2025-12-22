import { TimeSegment } from '../../shared.types';

import { getTimeSegmentRules } from './getTimeSegmentRules';

describe('packages/time-input/utils/getTimeSegmentRules', () => {
  test('returns the time segment rules', () => {
    const timeSegmentRules = getTimeSegmentRules({ is12HourFormat: true });
    expect(timeSegmentRules).toEqual({
      [TimeSegment.Hour]: { maxChars: 2, minExplicitValue: 2 },
      [TimeSegment.Minute]: { maxChars: 2, minExplicitValue: 6 },
      [TimeSegment.Second]: { maxChars: 2, minExplicitValue: 6 },
    });
  });

  test('returns the time segment rules for 24 hour format', () => {
    const timeSegmentRules = getTimeSegmentRules({ is12HourFormat: false });
    expect(timeSegmentRules).toEqual({
      [TimeSegment.Hour]: { maxChars: 2, minExplicitValue: 3 },
      [TimeSegment.Minute]: { maxChars: 2, minExplicitValue: 6 },
      [TimeSegment.Second]: { maxChars: 2, minExplicitValue: 6 },
    });
  });
});
