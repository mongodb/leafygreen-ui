import { charsPerSegment } from '../../constants';

import { getSegmentMaxLength } from '.';

describe('packages/date-picker/utils/getSegmentMaxLength', () => {
  test('day', () => {
    expect(getSegmentMaxLength('day')).toBe(charsPerSegment.day);
  });

  test('month', () => {
    expect(getSegmentMaxLength('month')).toBe(charsPerSegment.month);
  });

  test('year', () => {
    expect(getSegmentMaxLength('year')).toBe(charsPerSegment.year);
  });
});
