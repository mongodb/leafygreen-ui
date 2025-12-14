import { Month, newUTC } from '@leafygreen-ui/date-utils';

import { TimeSegmentsState } from '../../shared.types';

import { shouldSetValue } from './shouldSetValue';

describe('packages/time-input/utils/shouldSetValue', () => {
  describe('when the date is valid', () => {
    describe('should return true', () => {
      describe('when all the segments are explicit', () => {
        test('12 hour format', () => {
          const newDate = new Date(newUTC(2021, Month.January, 1));
          const segments: TimeSegmentsState = {
            hour: '01',
            minute: '01',
            second: '01',
          };

          const shouldSetNewValue = shouldSetValue({
            newDate,
            isDirty: true,
            segments,
            is12HourFormat: true,
          });

          expect(shouldSetNewValue).toBe(true);
        });
        test('24 hour format', () => {
          const newDate = new Date(newUTC(2021, Month.January, 1));
          const segments: TimeSegmentsState = {
            hour: '13',
            minute: '01',
            second: '01',
          };

          const shouldSetNewValue = shouldSetValue({
            newDate,
            isDirty: true,
            segments,
            is12HourFormat: false,
          });

          expect(shouldSetNewValue).toBe(true);
        });
      });
    });
    describe('should return false', () => {
      describe('when not all the segments are explicit', () => {
        test('12 hour format', () => {
          const newDate = new Date(newUTC(2021, Month.January, 1));
          const segments: TimeSegmentsState = {
            hour: '1',
            minute: '01',
            second: '01',
          };

          const shouldSetNewValue = shouldSetValue({
            newDate,
            isDirty: true,
            segments,
            is12HourFormat: true,
          });

          expect(shouldSetNewValue).toBe(false);
        });
        test('24 hour format', () => {
          const newDate = new Date(newUTC(2021, Month.January, 1));
          const segments: TimeSegmentsState = {
            hour: '2',
            minute: '01',
            second: '01',
          };
          const shouldSetNewValue = shouldSetValue({
            newDate,
            isDirty: true,
            segments,
            is12HourFormat: false,
          });

          expect(shouldSetNewValue).toBe(false);
        });
      });
    });
  });
  describe('when the date is invalid', () => {
    describe('should return true', () => {
      test('when the date is invalid and the component is dirty', () => {
        const newDate = new Date('invalid');
        const segments: TimeSegmentsState = {
          hour: '01',
          minute: '01',
          second: '01',
        };
        const shouldSetNewValue = shouldSetValue({
          newDate,
          isDirty: true,
          segments,
          is12HourFormat: true,
        });

        expect(shouldSetNewValue).toBe(true);
      });
      test('when the date is invalid and the component is not dirty and every segment is filled', () => {
        const newDate = new Date('invalid');
        const segments: TimeSegmentsState = {
          hour: '01',
          minute: '01',
          second: '01',
        };
        const shouldSetNewValue = shouldSetValue({
          newDate,
          isDirty: false,
          segments,
          is12HourFormat: true,
        });

        expect(shouldSetNewValue).toBe(true);
      });
    });
    describe('should return false', () => {
      test('when the date is invalid and the component is not dirty and not every segment is filled', () => {
        const newDate = new Date('invalid');
        const segments: TimeSegmentsState = {
          hour: '',
          minute: '01',
          second: '01',
        };
        const shouldSetNewValue = shouldSetValue({
          newDate,
          isDirty: false,
          segments,
          is12HourFormat: true,
        });

        expect(shouldSetNewValue).toBe(false);
      });
    });

    describe('when the date is null', () => {
      test('should return true', () => {
        const newDate = null;
        const segments: TimeSegmentsState = {
          hour: '01',
          minute: '01',
          second: '01',
        };
        const shouldSetNewValue = shouldSetValue({
          newDate,
          isDirty: true,
          segments,
          is12HourFormat: true,
        });

        expect(shouldSetNewValue).toBe(true);
      });
    });
  });
});
