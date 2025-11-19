import { renderHook } from '@leafygreen-ui/testing-lib';

import { useSegmentRefs } from './useSegmentRefs';

describe('packages/input-box/hooks/useSegmentRefs', () => {
  describe('basic functionality', () => {
    test('returns an object with refs for each segment', () => {
      const segments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const { result } = renderHook(() => useSegmentRefs(segments));

      expect(result.current).toHaveProperty('month');
      expect(result.current).toHaveProperty('day');
      expect(result.current).toHaveProperty('year');
    });

    test('each returned value is a valid React ref object', () => {
      const segments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const { result } = renderHook(() => useSegmentRefs(segments));

      expect(result.current.month).toHaveProperty('current');
      expect(result.current.day).toHaveProperty('current');
      expect(result.current.year).toHaveProperty('current');
    });

    test('handles empty segments object', () => {
      const segments = {};

      const { result } = renderHook(() => useSegmentRefs(segments));

      expect(result.current).toEqual({});
    });

    test('handles single segment', () => {
      const segments = { input: 'input' };

      const { result } = renderHook(() => useSegmentRefs(segments));

      expect(result.current).toHaveProperty('input');
      expect(result.current.input).toHaveProperty('current');
    });
  });

  describe('memoization', () => {
    test('returns the same refs when rerendered with the same segments object', () => {
      const segments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const { result, rerender } = renderHook(() => useSegmentRefs(segments));

      const initialMonthRef = result.current.month;
      const initialDayRef = result.current.day;
      const initialYearRef = result.current.year;

      rerender();

      expect(result.current.month).toBe(initialMonthRef);
      expect(result.current.day).toBe(initialDayRef);
      expect(result.current.year).toBe(initialYearRef);
    });

    test('returns the same object structure when rerendered', () => {
      const segments = {
        month: 'month',
        day: 'day',
      };

      const { result, rerender } = renderHook(() => useSegmentRefs(segments));

      const initialResult = result.current;

      rerender();

      // The object itself should be the same (memoized)
      expect(result.current).toBe(initialResult);
    });
  });

  describe('with different segment configurations', () => {
    test('returns new object when segments change', () => {
      const initialSegments = {
        month: 'month',
        day: 'day',
      };

      const { result, rerender } = renderHook(
        ({ segments }) => useSegmentRefs(segments),
        {
          initialProps: { segments: initialSegments },
        },
      );

      const initialResult = result.current;

      const newSegments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      rerender({ segments: newSegments });

      // Should return a new object when segments change
      expect(result.current).not.toBe(initialResult);
      expect(Object.keys(result.current)).toHaveLength(3);
    });

    test('works with different key types', () => {
      const segments = {
        hour: 'hour',
        minute: 'minute',
        second: 'second',
        meridiem: 'meridiem',
      };

      const { result } = renderHook(() => useSegmentRefs(segments));

      expect(result.current).toHaveProperty('hour');
      expect(result.current).toHaveProperty('minute');
      expect(result.current).toHaveProperty('second');
      expect(result.current).toHaveProperty('meridiem');
      expect(Object.keys(result.current)).toHaveLength(4);
    });
  });

  describe('ref uniqueness', () => {
    test('each segment gets a unique ref', () => {
      const segments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const { result } = renderHook(() => useSegmentRefs(segments));

      expect(result.current.month).not.toBe(result.current.day);
      expect(result.current.day).not.toBe(result.current.year);
      expect(result.current.month).not.toBe(result.current.year);
    });

    test('different hook instances return different refs', () => {
      const segments = {
        month: 'month',
        day: 'day',
      };

      const { result: result1 } = renderHook(() => useSegmentRefs(segments));
      const { result: result2 } = renderHook(() => useSegmentRefs(segments));

      expect(result1.current.month).not.toBe(result2.current.month);
      expect(result1.current.day).not.toBe(result2.current.day);
    });
  });
});
