import { isEverySegmentFilled } from './isEverySegmentFilled';

describe('isEverySegmentFilled', () => {
  test('returns true if all segments are filled', () => {
    expect(
      isEverySegmentFilled({ hour: '12', minute: '00', second: '00' }),
    ).toBe(true);
  });

  test('returns false if any segment is empty', () => {
    expect(isEverySegmentFilled({ hour: '', minute: '00', second: '00' })).toBe(
      false,
    );
  });

  test('returns false is all segments are empty', () => {
    expect(isEverySegmentFilled({ hour: '', minute: '', second: '' })).toBe(
      false,
    );
  });
});
