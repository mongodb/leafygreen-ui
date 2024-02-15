import { DateType, Month, newUTC } from '@leafygreen-ui/date-utils';
import { renderHook } from '@leafygreen-ui/testing-lib';

import { useDateSegments } from './useDateSegments';
import { OnUpdateCallback } from './useDateSegments.types';

const renderUseDateSegmentsHook = (
  initialDate: DateType,
  callback?: OnUpdateCallback,
) => {
  return renderHook(
    props => useDateSegments(props.date, { onUpdate: props.callback }),
    {
      initialProps: {
        date: initialDate,
        callback,
      },
    },
  );
};

describe('packages/date-picker/shared/useDateSegments', () => {
  describe('initial render', () => {
    test('returns segments object and setter function', () => {
      const testDate = newUTC(2023, Month.December, 26);
      const callback = jest.fn();
      const { result } = renderUseDateSegmentsHook(testDate, callback);

      const { segments, setSegment } = result.current;

      expect(segments).toBeDefined();
      expect(setSegment).toBeDefined();
      expect(segments.day).toEqual('26');
      expect(segments.month).toEqual('12');
      expect(segments.year).toEqual('2023');
    });

    test('returns empty segments when date is null', () => {
      const callback = jest.fn();
      const { result } = renderUseDateSegmentsHook(null, callback);

      const { segments, setSegment } = result.current;

      expect(segments).toBeDefined();
      expect(setSegment).toBeDefined();
      expect(segments.day).toEqual('');
      expect(segments.month).toEqual('');
      expect(segments.year).toEqual('');
    });

    test('returns empty segments when date is invalid', () => {
      const invalidDate = new Date('invalid');

      const callback = jest.fn();
      const { result } = renderUseDateSegmentsHook(invalidDate, callback);

      const { segments, setSegment } = result.current;

      expect(segments).toBeDefined();
      expect(setSegment).toBeDefined();
      expect(segments.day).toEqual('');
      expect(segments.month).toEqual('');
      expect(segments.year).toEqual('');
    });
  });

  describe('re-rendering', () => {
    describe('with a valid value', () => {
      test('calls callback with new segments', () => {
        const testDate = newUTC(2023, Month.December, 26);
        const callback = jest.fn();
        const { rerender } = renderUseDateSegmentsHook(testDate, callback);

        rerender({ date: newUTC(2024, Month.September, 10), callback });

        expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({
            day: '10',
            month: '09',
            year: '2024',
          }),
          expect.objectContaining({
            day: '26',
            month: '12',
            year: '2023',
          }),
        );
      });
      test('returns new segments', () => {
        const testDate = newUTC(2023, Month.December, 26);
        const callback = jest.fn();
        const { rerender, result } = renderUseDateSegmentsHook(
          testDate,
          callback,
        );

        rerender({ date: newUTC(2024, Month.September, 10), callback });
        expect(result.current.segments.day).toEqual('10');
        expect(result.current.segments.month).toEqual('09');
        expect(result.current.segments.year).toEqual('2024');
      });
    });

    describe('with a null value', () => {
      test('calls callback with empty segments', () => {
        const testDate = newUTC(2023, Month.December, 26);
        const callback = jest.fn();
        const { rerender } = renderUseDateSegmentsHook(testDate, callback);

        rerender({ date: null, callback });

        expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({
            day: '',
            month: '',
            year: '',
          }),
          expect.objectContaining({
            day: '26',
            month: '12',
            year: '2023',
          }),
        );
      });
      test('returns empty segments', () => {
        const testDate = newUTC(2023, Month.December, 26);
        const callback = jest.fn();
        const { rerender, result } = renderUseDateSegmentsHook(
          testDate,
          callback,
        );

        rerender({ date: null, callback });
        expect(result.current.segments.day).toEqual('');
        expect(result.current.segments.month).toEqual('');
        expect(result.current.segments.year).toEqual('');
      });
    });

    describe('with an invalid Date value', () => {
      test('calls callback with previous segments', () => {
        const testDate = newUTC(2023, Month.December, 26);
        const callback = jest.fn();
        const { rerender } = renderUseDateSegmentsHook(testDate, callback);

        rerender({ date: new Date('invalid'), callback });

        expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({
            day: '26',
            month: '12',
            year: '2023',
          }),
          expect.objectContaining({
            day: '26',
            month: '12',
            year: '2023',
          }),
        );
      });
      test('returns previous segments', () => {
        const testDate = newUTC(2023, Month.December, 26);
        const callback = jest.fn();
        const { rerender, result } = renderUseDateSegmentsHook(
          testDate,
          callback,
        );

        rerender({ date: new Date('invalid'), callback });
        expect(result.current.segments.day).toEqual('26');
        expect(result.current.segments.month).toEqual('12');
        expect(result.current.segments.year).toEqual('2023');
      });
    });
  });

  describe('setSegment', () => {
    test('calls callback when setSegment is called', () => {
      const testDate = newUTC(2023, Month.December, 26);
      const callback = jest.fn();
      const { result } = renderUseDateSegmentsHook(testDate, callback);

      result.current.setSegment('day', '25');

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          day: '25',
          month: '12',
          year: '2023',
        }),
        expect.objectContaining({
          day: '26',
          month: '12',
          year: '2023',
        }),
        'day',
      );
    });
  });
});
