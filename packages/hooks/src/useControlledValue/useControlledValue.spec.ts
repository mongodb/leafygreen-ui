import { ChangeEvent, ChangeEventHandler } from 'react';
import { act } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';

import { useControlledValue } from './useControlledValue';

const changeEventMock = {
  target: { value: 'banana' },
} as ChangeEvent<any>;

describe('packages/lib/useControlledValue', () => {
  describe('with controlled component', () => {
    test('calling with a value sets value and isControlled', () => {
      const handler = jest.fn();
      const { result } = renderHook(v => useControlledValue(v, handler), {
        initialProps: 'apple',
      });
      expect(result.current.isControlled).toBe(true);
      expect(result.current.value).toBe('apple');
    });

    test('calling with a new value changes the value', () => {
      const handler = jest.fn();
      const { result, rerender } = renderHook(
        v => useControlledValue(v, handler),
        {
          initialProps: 'apple',
        },
      );

      expect(result.current.value).toBe('apple');

      act(() => {
        rerender('banana');
      });

      expect(result.current.value).toBe('banana');
    });

    test('provided handler should be called', () => {
      const handler = jest.fn();
      const { result } = renderHook(v => useControlledValue(v, handler), {
        initialProps: 'apple',
      });

      // simulate responding to an event
      act(() => {
        result.current.handleChange(changeEventMock);
      });
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining(changeEventMock),
      );
      // value doesn't change unless we explicitly change it
      expect(result.current.value).toBe('apple');
    });
  });

  describe('with uncontrolled component', () => {
    test('calling without a value sets value and isControlled', () => {
      const handler = jest.fn();
      const { result } = renderHook(v => useControlledValue(v, handler), {
        initialProps: undefined,
      });
      expect(result.current.isControlled).toBe(false);
      expect(result.current.value).toBe(undefined);
    });

    test('calling setter updates value', () => {
      const handler = jest.fn();
      const { result } = renderHook(
        v => useControlledValue<string>(v, handler),
        {
          initialProps: undefined,
        },
      );

      act(() => {
        result.current.setUncontrolledValue('apple');
      });
      expect(result.current.value).toBe('apple');
    });

    test('provided handler should be called', () => {
      const handler = jest.fn();
      const { result } = renderHook(v => useControlledValue(v, handler), {
        initialProps: undefined,
      });

      act(() => {
        result.current.handleChange(changeEventMock);
      });
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining(changeEventMock),
      );
    });
  });
});
