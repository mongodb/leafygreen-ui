import { getDefaultMax } from '../getDefaultMax';
import { getDefaultMin } from '../getDefaultMin';

import { isEverySegmentValid } from './isEverySegmentValid';

describe('isEverySegmentValueValid', () => {
  describe('12 hour format', () => {
    const defaultMinValues = getDefaultMin({ is12HourFormat: true });
    const defaultMaxValues = getDefaultMax({ is12HourFormat: true });

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
            hour: defaultMinValues['hour'].toString(),
            minute: defaultMinValues['minute'].toString(),
            second: defaultMinValues['second'].toString(),
          },
          is12HourFormat: true,
        }),
      ).toBe(true);
    });

    test('returns true if all segments are at the default max', () => {
      expect(
        isEverySegmentValid({
          segments: {
            hour: defaultMaxValues['hour'].toString(),
            minute: defaultMaxValues['minute'].toString(),
            second: defaultMaxValues['second'].toString(),
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
              hour: (defaultMaxValues['hour'] + 1).toString(),
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
              minute: (defaultMaxValues['minute'] + 1).toString(),
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
              second: (defaultMaxValues['second'] + 1).toString(),
            },
            is12HourFormat: true,
          }),
        ).toBe(false);
      });
    });
  });

  describe('24 hour format', () => {
    const defaultMaxValues = getDefaultMax({ is12HourFormat: false });

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
              hour: (defaultMaxValues['hour'] + 1).toString(),
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
              minute: (defaultMaxValues['minute'] + 1).toString(),
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
              second: (defaultMaxValues['second'] + 1).toString(),
            },
            is12HourFormat: false,
          }),
        ).toBe(false);
      });
    });
  });
});
