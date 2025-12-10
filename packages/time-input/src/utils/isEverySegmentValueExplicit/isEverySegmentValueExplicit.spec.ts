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

    describe('hour', () => {
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

        test('if hour is a single digit below the min explicit value (2)', () => {
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: '1', minute: '00', second: '00' },
              is12HourFormat: true,
            }),
          ).toBe(false);
        });
      });

      describe('returns true', () => {
        describe('when single digit and value is greater than or equal to the min explicit value (2)', () => {
          test.each(range(2, 10))('%i', i => {
            expect(
              isEverySegmentValueExplicit({
                segments: { hour: i.toString(), minute: '00', second: '00' },
                is12HourFormat: true,
              }),
            ).toBe(true);
          });
        });
        describe('when double digit and value is greater than the min explicit value (2)', () => {
          test.each(range(11, 13))('%i', i => {
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

    describe('hour', () => {
      describe('returns false', () => {
        test.each(range(0, 3))('if hour is %i', i => {
          expect(
            isEverySegmentValueExplicit({
              segments: { hour: i.toString(), minute: '00', second: '00' },
              is12HourFormat: false,
            }),
          ).toBe(false);
        });
      });

      describe('returns true', () => {
        describe('if is single digit and greater than or equal to the min explicit value (3)', () => {
          test.each(range(3, 10))('%i', i => {
            expect(
              isEverySegmentValueExplicit({
                segments: { hour: i.toString(), minute: '00', second: '00' },
                is12HourFormat: false,
              }),
            ).toBe(true);
          });
        });

        describe('if is double digit and greater than the min explicit value (3)', () => {
          test.each(range(10, 24))('%i', i => {
            expect(
              isEverySegmentValueExplicit({
                segments: { hour: i.toString(), minute: '00', second: '00' },
                is12HourFormat: false,
              }),
            ).toBe(true);
          });
        });
      });
    });

    describe.each(['minute', 'second'])('%s', segment => {
      describe('returns false', () => {
        describe('if is single digit and less than the min explicit value (6)', () => {
          test.each(range(0, 6))('%i', i => {
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
          });
        });
        describe('if is double digit and greater than the min explicit value (6)', () => {
          test.each(range(10, 60))('%i', i => {
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
          });
        });
      });

      describe('returns true', () => {
        describe('if is single digit and greater than the min explicit value (6)', () => {
          test.each(range(6, 10))('%i', i => {
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
          });
        });
      });
    });
  });
});
