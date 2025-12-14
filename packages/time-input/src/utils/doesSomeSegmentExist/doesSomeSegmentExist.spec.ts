import { doesSomeSegmentExist } from './doesSomeSegmentExist';

describe('doesSomeSegmentExist', () => {
  test('returns true if at least one segment is filled', () => {
    expect(doesSomeSegmentExist({ hour: '', minute: '', second: '00' })).toBe(
      true,
    );
  });

  test('returns true if at all segments are filled', () => {
    expect(
      doesSomeSegmentExist({ hour: '12', minute: '00', second: '00' }),
    ).toBe(true);
  });

  test('returns false if no segments are filled', () => {
    expect(doesSomeSegmentExist({ hour: '', minute: '', second: '' })).toBe(
      false,
    );
  });
});
