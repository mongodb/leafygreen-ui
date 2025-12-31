import range from 'lodash/range';

import { isEverySegmentValueExplicit } from './isEverySegmentValueExplicit';

describe('isEverySegmentValueExplicit', () => {
  describe('12 hour format', () => {
    test('returns false if all values are not explicit', () => {
      expect(
        isEverySegmentValueExplicit({
          segments: { hour: '1', minute: '1', second: '1' },
          is12HourFormat: true,
        }),
      ).toBe(false);
    });

    describe('hour segment', () => {
      describe('returns false', () => {
        test('if hour is 0', () => {
          // in 12 hour format, 00 is not a valid hour
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: '00', minute: '00', second: '00' },
              is12HourFormat: true,
            }),
          ).toBe(false);
        });

        test('for single digit hour 1', () => {
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: '1', minute: '00', second: '00' },
              is12HourFormat: true,
            }),
          ).toBe(false);
        });
      });

      describe('returns true', () => {
        test.each(range(2, 10))('for single digit hour %i', i => {
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: i.toString(), minute: '00', second: '00' },
              is12HourFormat: true,
            }),
          ).toBe(true);
        });

        test.each(range(11, 13))('for double digit hour %i', i => {
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: i.toString(), minute: '00', second: '00' },
              is12HourFormat: true,
            }),
          ).toBe(true);
        });
      });
    });
  });

  describe('24 hour format', () => {
    test('returns false if all values are not explicit', () => {
      expect(
        isEverySegmentValueExplicit({
          segments: { hour: '1', minute: '1', second: '1' },
          is12HourFormat: false,
        }),
      ).toBe(false);
    });

    describe('hour segment', () => {
      describe('returns false', () => {
        test.each(range(0, 3))('for single digit hour %i', i => {
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: i.toString(), minute: '00', second: '00' },
              is12HourFormat: false,
            }),
          ).toBe(false);
        });
      });

      describe('returns true', () => {
        test.each(range(3, 10))('for single digit hour %i', i => {
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: i.toString(), minute: '00', second: '00' },
              is12HourFormat: false,
            }),
          ).toBe(true);
        });

        test.each(range(10, 24))('for double digit hour %i', i => {
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: i.toString(), minute: '00', second: '00' },
              is12HourFormat: false,
            }),
          ).toBe(true);
        });
      });
    });

    describe.each(['minute', 'second'])('%s', segment => {
      describe('returns false', () => {
        test.each(range(0, 6).map(i => [segment, i]))(
          'for single digit %s %i',
          (segment, i) => {
            expect(
              isEverySegmentValueExplicit({
                segments: {
                  hour: '12',
                  minute: segment === 'minute' ? i.toString() : '00',
                  second: segment === 'second' ? i.toString() : '00',
                },
                is12HourFormat: true,
              }),
            ).toBe(false);
          },
        );
      });

      describe('returns true', () => {
        test.each(range(6, 10).map(i => [segment, i]))(
          'for single digit %s %i',
          (segment, i) => {
            expect(
              isEverySegmentValueExplicit({
                segments: {
                  hour: '12',
                  minute: segment === 'minute' ? i.toString() : '00',
                  second: segment === 'second' ? i.toString() : '00',
                },
                is12HourFormat: true,
              }),
            ).toBe(true);
          },
        );

        test.each(range(10, 60).map(i => [segment, i]))(
          'for double digit %s %i',
          (segment, i) => {
            expect(
              isEverySegmentValueExplicit({
                segments: {
                  hour: '12',
                  minute: segment === 'minute' ? i.toString() : '00',
                  second: segment === 'second' ? i.toString() : '00',
                },
                is12HourFormat: true,
              }),
            ).toBe(true);
          },
        );
      });
    });
  });
});
