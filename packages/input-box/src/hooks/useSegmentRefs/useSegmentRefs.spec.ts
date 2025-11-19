import { renderHook } from '@leafygreen-ui/testing-lib';

import { useSegmentRefs } from './useSegmentRefs';

describe('packages/input-box/hooks/useSegmentRefs', () => {
  describe('basic functionality', () => {
    test('returns an object with segments with their refs', () => {
      const segments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const { result } = renderHook(() => useSegmentRefs({ segments }));

      expect(result.current).toHaveProperty('month');
      expect(result.current.month).toHaveProperty('current');
      expect(result.current).toHaveProperty('day');
      expect(result.current.day).toHaveProperty('current');
      expect(result.current).toHaveProperty('year');
      expect(result.current.year).toHaveProperty('current');
    });

    test('handles empty segments object', () => {
      const segments = {};

      const { result } = renderHook(() => useSegmentRefs({ segments }));

      expect(result.current).toEqual({});
    });

    test('handles single segment', () => {
      const segments = { input: 'input' };

      const { result } = renderHook(() => useSegmentRefs({ segments }));

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

      const { result, rerender } = renderHook(
        ({ segments }) => useSegmentRefs({ segments }),
        {
          initialProps: { segments },
        },
      );

      const initialMonthRef = result.current.month;
      const initialDayRef = result.current.day;
      const initialYearRef = result.current.year;

      rerender({ segments });

      expect(result.current.month).toBe(initialMonthRef);
      expect(result.current.day).toBe(initialDayRef);
      expect(result.current.year).toBe(initialYearRef);
    });

    test('returns the same refs when rerendered with a different segments object reference but the same values', () => {
      const segments1 = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const segments2 = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const { result, rerender } = renderHook(
        ({ segments }) => useSegmentRefs({ segments }),
        {
          initialProps: { segments: segments1 },
        },
      );

      const initialMonthRef = result.current.month;
      const initialDayRef = result.current.day;
      const initialYearRef = result.current.year;

      rerender({ segments: segments2 });

      expect(result.current.month).toBe(initialMonthRef);
      expect(result.current.day).toBe(initialDayRef);
      expect(result.current.year).toBe(initialYearRef);
    });

    test('returns different refs when segments change', () => {
      const segments1 = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const segments2 = {
        hour: 'hour',
        minute: 'minute',
        second: 'second',
      };

      const { result, rerender } = renderHook(
        ({ segments }) => useSegmentRefs({ segments }),
        {
          initialProps: { segments: segments1 },
        },
      );

      const initialMonthRef = result.current.month;
      const initialDayRef = result.current.day;
      const initialYearRef = result.current.year;

      // @ts-expect-error - segments2 has a different shape than segments1
      rerender({ segments: segments2 });

      // After rerender with different keys, the result should have new properties
      expect(result.current).toHaveProperty('hour');
      expect(result.current).toHaveProperty('minute');
      expect(result.current).toHaveProperty('second');

      // Old properties should not exist
      expect(result.current).not.toHaveProperty('month');
      expect(result.current).not.toHaveProperty('day');
      expect(result.current).not.toHaveProperty('year');

      // The new refs should have different values
      expect((result.current as any).hour).not.toBe(initialMonthRef);
      expect((result.current as any).minute).not.toBe(initialDayRef);
      expect((result.current as any).second).not.toBe(initialYearRef);
    });

    test('returns updated object when segments are added', () => {
      const initialSegments = {
        month: 'month',
        day: 'day',
      };

      const { result, rerender } = renderHook(
        ({ segments }) => useSegmentRefs({ segments }),
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
      expect(result.current).toHaveProperty('year');
    });

    test('returns updated object when segments are removed', () => {
      const initialSegments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const newSegments = {
        month: 'month',
        day: 'day',
      };

      const { result, rerender } = renderHook(
        ({ segments }) => useSegmentRefs({ segments }),
        {
          initialProps: { segments: initialSegments },
        },
      );

      const initialResult = result.current;

      // @ts-expect-error - newSegments has a different shape than initialSegments
      rerender({ segments: newSegments });

      expect(result.current).not.toBe(initialResult);
      expect(Object.keys(result.current)).toHaveLength(2);
      expect(result.current).not.toHaveProperty('year');
    });
  });

  describe('with provided segmentRefs', () => {
    test('returns provided segmentRefs instead of creating a new object', () => {
      const segments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const providedRefs = {
        month: { current: null },
        day: { current: null },
        year: { current: null },
      };

      const { result } = renderHook(() =>
        useSegmentRefs({ segments, segmentRefs: providedRefs }),
      );

      // Should return the exact same ref objects that were provided
      expect(result.current).toBe(providedRefs);
      expect(result.current.month).toBe(providedRefs.month);
      expect(result.current.day).toBe(providedRefs.day);
      expect(result.current.year).toBe(providedRefs.year);
    });

    test('creates new segmentRefs object when provided segmentRefs is empty', () => {
      const segments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const providedRefs = {};

      const { result } = renderHook(() =>
        // @ts-expect-error - providedRefs is empty but that's okay in this case
        useSegmentRefs({ segments, segmentRefs: providedRefs }),
      );

      expect(result.current.month).toBeDefined();
      expect(result.current.day).toBeDefined();
      expect(result.current.year).toBeDefined();
    });
  });

  describe('ref uniqueness', () => {
    test('each segment gets a unique ref', () => {
      const segments = {
        month: 'month',
        day: 'day',
        year: 'year',
      };

      const { result } = renderHook(() => useSegmentRefs({ segments }));

      expect(result.current.month).not.toBe(result.current.day);
      expect(result.current.day).not.toBe(result.current.year);
      expect(result.current.month).not.toBe(result.current.year);
    });

    test('different hook instances return different refs', () => {
      const segments = {
        month: 'month',
        day: 'day',
      };

      const { result: result1 } = renderHook(() =>
        useSegmentRefs({ segments }),
      );
      const { result: result2 } = renderHook(() =>
        useSegmentRefs({ segments }),
      );

      expect(result1.current.month).not.toBe(result2.current.month);
      expect(result1.current.day).not.toBe(result2.current.day);
    });
  });
});
