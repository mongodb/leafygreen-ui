import { mockTimeZone } from '../testing/mockTimeZone';

import { isSameUTCDay } from '.';

describe('packages/date-utils/isSameUTCDay', () => {
  beforeEach(() => {
    mockTimeZone('America/New_York', -5);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe(' when both dates are defined in UTC', () => {
    test('returns true', () => {
      const utc1 = new Date(Date.UTC(2023, 8, 1, 0, 0, 0));
      const utc2 = new Date(Date.UTC(2023, 8, 1, 21, 0, 0));
      expect(isSameUTCDay(utc1, utc2)).toBe(true);
    });

    test('returns false', () => {
      const utc1 = new Date(Date.UTC(2023, 8, 1, 0, 0, 0));
      const utc2 = new Date(Date.UTC(2023, 8, 2, 0, 0, 0));
      expect(isSameUTCDay(utc1, utc2)).toBe(false);
    });
  });

  describe('when one date is defined locally', () => {
    test('returns true ', () => {
      const utc = new Date(Date.UTC(2023, 8, 10, 0, 0, 0));
      const local = new Date('2023-09-09T21:00:00'); //2023-09-10T01:00:00Z
      expect(isSameUTCDay(utc, local)).toBe(true);
    });

    test('returns false', () => {
      const utc = new Date(Date.UTC(2023, 8, 10));
      const local = new Date('2023-09-09T12:00'); //2023-09-09T16:00:00Z
      expect(isSameUTCDay(utc, local)).toBe(false);
    });
  });

  describe('when both dates are defined locally', () => {
    test('returns true', () => {
      const local1 = new Date('2023-09-09T00:00');
      const local2 = new Date('2023-09-09T19:00');
      expect(isSameUTCDay(local1, local2)).toBe(true);
    });

    test('returns false', () => {
      const local1 = new Date('2023-09-09T00:00');
      const local2 = new Date('2023-09-09T20:00');
      expect(isSameUTCDay(local1, local2)).toBe(false);
    });
  });

  test('returns false when one or both dates is null', () => {
    expect(isSameUTCDay(new Date(), null)).toBe(false);
    expect(isSameUTCDay(null, new Date())).toBe(false);
    expect(isSameUTCDay(null, null)).toBe(false);
  });

  test('returns false when one or both dates is invalid', () => {
    expect(isSameUTCDay(new Date(), new Date('invalid'))).toBe(false);
    expect(isSameUTCDay(new Date('invalid'), new Date())).toBe(false);
    expect(isSameUTCDay(new Date('invalid'), new Date('invalid'))).toBe(false);
  });
});
