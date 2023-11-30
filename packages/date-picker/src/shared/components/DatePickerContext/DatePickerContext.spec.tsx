import React, { PropsWithChildren } from 'react';
import { act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  DatePickerContextProps,
  DatePickerProvider,
  useDatePickerContext,
} from '.';

const renderDatePickerProvider = () => {
  const { result, rerender } = renderHook<
    PropsWithChildren<{}>,
    DatePickerContextProps
  >(useDatePickerContext, {
    wrapper: ({ children }) => (
      <DatePickerProvider label="">{children}</DatePickerProvider>
    ),
  });

  return { result, rerender };
};

// TODO: ADD MORE TESTS
describe('packages/date-picker-context', () => {
  describe('useDatePickerContext', () => {
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
