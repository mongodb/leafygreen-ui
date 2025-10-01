import React from 'react';
import { act } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  TimeInputProvider,
  TimeInputProviderProps,
  useTimeInputContext,
} from '.';

const renderTimeInputProvider = (props?: Partial<TimeInputProviderProps>) => {
  const defaultProps: TimeInputProviderProps = {
    value: undefined,
    setValue: jest.fn(),
    handleValidation: jest.fn(),
  };

  const { result, rerender } = renderHook(() => useTimeInputContext(), {
    wrapper: ({ children }: { children?: React.ReactNode }) => (
      <TimeInputProvider {...defaultProps} {...props}>
        {children}
      </TimeInputProvider>
    ),
  });

  return { result, rerender };
};

describe('packages/time-input-context', () => {
  describe('useTimeInputContext', () => {
    describe('value', () => {
      test('returns undefined values by default', () => {
        const { result } = renderTimeInputProvider({});

        expect(result.current.value).toBeUndefined();
      });

      test('provides the correct value when passed', () => {
        const testDate = new Date('2023-12-25T10:30:00');
        const mockSetValue = jest.fn();

        const { result } = renderTimeInputProvider({
          value: testDate,
          setValue: mockSetValue,
        });

        expect(result.current.value).toBe(testDate);
      });

      test('provides null value correctly', () => {
        const mockSetValue = jest.fn();

        const { result } = renderTimeInputProvider({
          value: null,
          setValue: mockSetValue,
        });

        expect(result.current.value).toBeNull();
      });
    });

    describe('setValue', () => {
      test('calls the provided setValue function with the correct value', () => {
        const mockSetValue = jest.fn();
        const testDate = new Date('2023-12-25T10:30:00');

        const { result } = renderTimeInputProvider({
          setValue: mockSetValue,
        });

        act(() => {
          result.current.setValue(testDate);
        });

        expect(mockSetValue).toHaveBeenCalledWith(testDate);
      });

      test('handles invalid date objects', () => {
        const mockSetValue = jest.fn();
        const invalidDate = new Date('invalid');

        const { result } = renderTimeInputProvider({
          setValue: mockSetValue,
        });

        act(() => {
          result.current.setValue(invalidDate);
        });

        expect(mockSetValue).toHaveBeenCalledWith(invalidDate);
      });

      test('calls setValue with null when undefined is passed', () => {
        const mockSetValue = jest.fn();

        const { result } = renderTimeInputProvider({
          setValue: mockSetValue,
        });

        act(() => {
          result.current.setValue(undefined);
        });

        expect(mockSetValue).toHaveBeenCalledWith(null);
      });

      test('handles null value correctly', () => {
        const mockSetValue = jest.fn();

        const { result } = renderTimeInputProvider({
          setValue: mockSetValue,
        });

        act(() => {
          result.current.setValue(null);
        });

        expect(mockSetValue).toHaveBeenCalledWith(null);
      });
    });

    describe('handleValidation', () => {
      test('calls the provided handleValidation function when provided', () => {
        const mockHandleValidation = jest.fn();
        const testDate = new Date('2023-12-25T10:30:00');

        const { result } = renderTimeInputProvider({
          handleValidation: mockHandleValidation,
        });

        act(() => {
          result.current.handleValidation(testDate);
        });

        expect(mockHandleValidation).toHaveBeenCalledWith(testDate);
      });

      test('handles undefined value correctly', () => {
        const mockHandleValidation = jest.fn();

        const { result } = renderTimeInputProvider({
          handleValidation: mockHandleValidation,
        });

        act(() => {
          result.current.handleValidation(undefined);
        });

        expect(mockHandleValidation).toHaveBeenCalledWith(undefined);
      });
    });
  });
});
