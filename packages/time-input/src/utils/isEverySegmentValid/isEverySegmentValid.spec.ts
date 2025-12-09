import { getDefaultMax, getDefaultMin } from '../../constants';
import { isEverySegmentValid } from './isEverySegmentValid';

describe('isEverySegmentValueValid', () => {
  describe('12 hour format', () => {
    test('returns false if all segments are 00', () => {
      // when 12 hour format, 00 is not a valid value for the hour segment
      expect(
        isEverySegmentValid({
          segments: { hour: '00', minute: '00', second: '00' },
          is12HourFormat: true,
        }),
      ).toBe(false);
    });

    test('returns true if all segments are at the default min', () => {
      expect(
        isEverySegmentValid({
          segments: {
            hour: getDefaultMin({ is12HourFormat: true })['hour'].toString(),
            minute: getDefaultMin({ is12HourFormat: true })[
              'minute'
            ].toString(),
            second: getDefaultMin({ is12HourFormat: true })[
              'second'
            ].toString(),
          },
          is12HourFormat: true,
        }),
      ).toBe(true);
    });

    test('returns true if all segments are at the default max', () => {
      expect(
        isEverySegmentValid({
          segments: {
            hour: getDefaultMax({ is12HourFormat: true })['hour'].toString(),
            minute: getDefaultMax({ is12HourFormat: true })[
              'minute'
            ].toString(),
            second: getDefaultMax({ is12HourFormat: true })[
              'second'
            ].toString(),
          },
          is12HourFormat: true,
        }),
      ).toBe(true);
    });

    describe('hour', () => {
      test('returns false if hour is greater than the default max', () => {
        expect(
          isEverySegmentValid({
            segments: {
              hour: (
                getDefaultMax({ is12HourFormat: true })['hour'] + 1
              ).toString(),
              minute: '00',
              second: '00',
            },
            is12HourFormat: true,
          }),
        ).toBe(false);
      });
    });

    describe('minute', () => {
      test('returns false if minute is greater than the default max', () => {
        expect(
          isEverySegmentValid({
            segments: {
              hour: '00',
              minute: (
                getDefaultMax({ is12HourFormat: true })['minute'] + 1
              ).toString(),
              second: '00',
            },
            is12HourFormat: true,
          }),
        ).toBe(false);
      });
    });

    describe('second', () => {
      test('returns false if second is greater than the default max', () => {
        expect(
          isEverySegmentValid({
            segments: {
              hour: '00',
              minute: '00',
              second: (
                getDefaultMax({ is12HourFormat: true })['second'] + 1
              ).toString(),
            },
            is12HourFormat: true,
          }),
        ).toBe(false);
      });
    });
  });

  describe('24 hour format', () => {
    test('returns true if all segments are 00', () => {
      expect(
        isEverySegmentValid({
          segments: { hour: '00', minute: '00', second: '00' },
          is12HourFormat: false,
        }),
      ).toBe(true);
    });

    test('returns true if all segments are valid', () => {
      expect(
        isEverySegmentValid({
          segments: { hour: '12', minute: '00', second: '00' },
          is12HourFormat: false,
        }),
      ).toBe(true);
    });

    describe('hour', () => {
      test('returns false if hour is greater than the default max', () => {
        expect(
          isEverySegmentValid({
            segments: {
              hour: (
                getDefaultMax({ is12HourFormat: false })['hour'] + 1
              ).toString(),
              minute: '00',
              second: '00',
            },
            is12HourFormat: false,
          }),
        ).toBe(false);
      });
    });

    describe('minute', () => {
      test('returns false if minute is greater than the default max', () => {
        expect(
          isEverySegmentValid({
            segments: {
              hour: '00',
              minute: (
                getDefaultMax({ is12HourFormat: false })['minute'] + 1
              ).toString(),
              second: '00',
            },
            is12HourFormat: false,
          }),
        ).toBe(false);
      });
    });

    describe('second', () => {
      test('returns false if second is greater than the default max', () => {
        expect(
          isEverySegmentValid({
            segments: {
              hour: '00',
              minute: '00',
              second: (
                getDefaultMax({ is12HourFormat: false })['second'] + 1
              ).toString(),
            },
            is12HourFormat: false,
          }),
        ).toBe(false);
      });
    });
  });
});
