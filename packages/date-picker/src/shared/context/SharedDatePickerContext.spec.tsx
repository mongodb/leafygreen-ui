import React from 'react';
import { act, waitFor } from '@testing-library/react';

import { Month, newUTC } from '@leafygreen-ui/date-utils';
import { consoleOnce } from '@leafygreen-ui/lib';
import { renderHook } from '@leafygreen-ui/testing-lib';

import { MAX_DATE, MIN_DATE } from '../constants';

import {
  SharedDatePickerContextProps,
  SharedDatePickerProvider,
  SharedDatePickerProviderProps,
  useSharedDatePickerContext,
} from '.';

const renderSharedDatePickerProvider = (
  props?: Partial<SharedDatePickerProviderProps>,
) => {
  const { result, rerender } = renderHook<SharedDatePickerContextProps, {}>(
    useSharedDatePickerContext,
    {
      wrapper: ({ children }) => (
        <SharedDatePickerProvider label="" {...props}>
          {children}
        </SharedDatePickerProvider>
      ),
    },
  );

  return { result, rerender };
};

describe('packages/date-picker-context', () => {
  describe('useSharedDatePickerContext', () => {
    describe('min/max', () => {
      afterEach(() => {
        jest.resetAllMocks();
      });
      test('uses default min/max values when not provided', () => {
        const { result } = renderSharedDatePickerProvider();
        expect(result.current.min).toEqual(MIN_DATE);
        expect(result.current.max).toEqual(MAX_DATE);
      });

      test('uses provided min/max values', () => {
        const testMin = newUTC(1999, Month.September, 2);
        const testMax = newUTC(2011, Month.June, 22);

        const { result } = renderSharedDatePickerProvider({
          min: testMin,
          max: testMax,
        });
        expect(result.current.min).toEqual(testMin);
        expect(result.current.max).toEqual(testMax);
      });

      test('if min is after max, uses default & console errors', () => {
        const errorSpy = jest.spyOn(consoleOnce, 'error');

        const testMax = newUTC(1999, Month.September, 2);
        const testMin = newUTC(2011, Month.June, 22);

        const { result } = renderSharedDatePickerProvider({
          min: testMin,
          max: testMax,
        });
        expect(result.current.min).toEqual(MIN_DATE);
        expect(result.current.max).toEqual(MAX_DATE);
        expect(errorSpy).toHaveBeenCalled();
      });

      test('if max is before default min, uses default & console errors', () => {
        const errorSpy = jest.spyOn(consoleOnce, 'error');
        const testMax = newUTC(1967, Month.March, 10);

        const { result } = renderSharedDatePickerProvider({
          max: testMax,
        });
        expect(result.current.min).toEqual(MIN_DATE);
        expect(result.current.max).toEqual(MAX_DATE);
        expect(errorSpy).toHaveBeenCalled();
      });

      test('if min is after default max, uses default & console errors', () => {
        const errorSpy = jest.spyOn(consoleOnce, 'error');
        const testMin = newUTC(2067, Month.March, 10);

        const { result } = renderSharedDatePickerProvider({
          min: testMin,
        });
        expect(result.current.min).toEqual(MIN_DATE);
        expect(result.current.max).toEqual(MAX_DATE);
        expect(errorSpy).toHaveBeenCalled();
      });
    });

    describe('isOpen', () => {
      test('is `false` by default', () => {
        const { result } = renderSharedDatePickerProvider();
        expect(result.current.isOpen).toBeFalsy();
      });

      test('setter updates the value to `true`', async () => {
        const { result, rerender } = renderSharedDatePickerProvider();

        act(() => result.current.setOpen(true));
        rerender();
        await waitFor(() => {
          expect(result.current.isOpen).toBe(true);
        });
      });
    });

    describe('isDirty', () => {
      test('is `false` by default', () => {
        const { result } = renderSharedDatePickerProvider();
        expect(result.current.isDirty).toBeFalsy();
      });

      test('setter updates the value to `true`', async () => {
        const { result, rerender } = renderSharedDatePickerProvider();

        act(() => result.current.setIsDirty(true));
        rerender();
        await waitFor(() => {
          expect(result.current.isDirty).toBe(true);
        });
      });
    });

    describe('isSelectOpen', () => {
      test('is `false` by default', () => {
        const { result } = renderSharedDatePickerProvider();
        expect(result.current.isSelectOpen).toBeFalsy();
      });

      test('setter updates the value to `true`', async () => {
        const { result, rerender } = renderSharedDatePickerProvider();

        act(() => result.current.setIsSelectOpen(true));
        rerender();
        await waitFor(() => {
          expect(result.current.isSelectOpen).toBe(true);
        });
      });
    });
  });
});
