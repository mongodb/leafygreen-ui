import React, { PropsWithChildren } from 'react';
import { act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { consoleOnce } from '@leafygreen-ui/lib';

import { MAX_DATE, MIN_DATE, Month } from '../../constants';
import { newUTC } from '../../utils';

import {
  DatePickerContextProps,
  DatePickerProvider,
  DatePickerProviderProps,
  useDatePickerContext,
} from '.';

const renderDatePickerProvider = (props?: Partial<DatePickerProviderProps>) => {
  const { result, rerender } = renderHook<
    PropsWithChildren<{}>,
    DatePickerContextProps
  >(useDatePickerContext, {
    wrapper: ({ children }) => (
      <DatePickerProvider label="" {...props}>
        {children}
      </DatePickerProvider>
    ),
  });

  return { result, rerender };
};

describe('packages/date-picker-context', () => {
  describe('useDatePickerContext', () => {
    describe('min/max', () => {
      afterEach(() => {
        jest.resetAllMocks();
      });
      test('uses default min/max values when not provided', () => {
        const { result } = renderDatePickerProvider();
        expect(result.current.min).toEqual(MIN_DATE);
        expect(result.current.max).toEqual(MAX_DATE);
      });

      test('uses provided min/max values', () => {
        const testMin = newUTC(1999, Month.September, 2);
        const testMax = newUTC(2011, Month.June, 22);

        const { result } = renderDatePickerProvider({
          min: testMin,
          max: testMax,
        });
        expect(result.current.min).toEqual(testMin);
        expect(result.current.max).toEqual(testMax);
      });

      test('if min is after max, sorts & console warns', () => {
        const warnSpy = jest.spyOn(consoleOnce, 'warn');

        const testMax = newUTC(1999, Month.September, 2);
        const testMin = newUTC(2011, Month.June, 22);

        const { result } = renderDatePickerProvider({
          min: testMin,
          max: testMax,
        });
        expect(result.current.min).toEqual(testMax);
        expect(result.current.max).toEqual(testMin);
        expect(warnSpy).toHaveBeenCalled();
      });

      test('if max is before default min, uses default & console errors', () => {
        const errorSpy = jest.spyOn(consoleOnce, 'error');
        const testMax = newUTC(1967, Month.March, 10);

        const { result } = renderDatePickerProvider({
          max: testMax,
        });
        expect(result.current.min).toEqual(MIN_DATE);
        expect(result.current.max).toEqual(MAX_DATE);
        expect(errorSpy).toHaveBeenCalled();
      });

      test('if min is after default max, uses default & console errors', () => {
        const errorSpy = jest.spyOn(consoleOnce, 'error');
        const testMin = newUTC(2067, Month.March, 10);

        const { result } = renderDatePickerProvider({
          min: testMin,
        });
        expect(result.current.min).toEqual(MIN_DATE);
        expect(result.current.max).toEqual(MAX_DATE);
        expect(errorSpy).toHaveBeenCalled();
      });
    });

    describe('isOpen', () => {
      test('is `false` by default', () => {
        const { result } = renderDatePickerProvider();
        expect(result.current.isOpen).toBeFalsy();
      });

      test('setter updates the value to `true`', async () => {
        const { result, rerender } = renderDatePickerProvider();

        act(() => result.current.setOpen(true));
        rerender();
        await waitFor(() => {
          expect(result.current.isOpen).toBe(true);
        });
      });
    });

    describe('isDirty', () => {
      test('is `false` by default', () => {
        const { result } = renderDatePickerProvider();
        expect(result.current.isDirty).toBeFalsy();
      });

      test('setter updates the value to `true`', async () => {
        const { result, rerender } = renderDatePickerProvider();

        act(() => result.current.setIsDirty(true));
        rerender();
        await waitFor(() => {
          expect(result.current.isDirty).toBe(true);
        });
      });
    });

    describe('isSelectOpen', () => {
      test('is `false` by default', () => {
        const { result } = renderDatePickerProvider();
        expect(result.current.isSelectOpen).toBeFalsy();
      });

      test('setter updates the value to `true`', async () => {
        const { result, rerender } = renderDatePickerProvider();

        act(() => result.current.setIsSelectOpen(true));
        rerender();
        await waitFor(() => {
          expect(result.current.isSelectOpen).toBe(true);
        });
      });
    });
  });
});
