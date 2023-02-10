import { ChangeEvent } from 'react';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useControlledValue } from './useControlledValue';

describe('packages/lib/useControlledValue', () => {
  test('with controlled component', async () => {
    const value = 'apple';
    const handler = jest.fn();
    const {
      result: { current },
    } = renderHook(() => useControlledValue(value as string, handler));
    expect(current.isControlled).toBe(true);
    expect(current.value).toBe(value);

    act(() => {
      current.handleChange({ target: { value: 'banana' } } as ChangeEvent<any>);
      current.setInternalValue('banana');
    });
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: 'banana' } }),
    );
    expect(current.value).toBe('apple');
  });

  test('with uncontrolled component', async () => {
    const value = undefined;
    const handler = jest.fn();
    const {
      result: { current },
    } = renderHook(() => useControlledValue(value, handler));
    expect(current.isControlled).toBe(false);
    expect(current.value).toBe('');

    act(() => {
      current.handleChange({ target: { value: 'apple' } } as ChangeEvent<any>);
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ target: { value: 'apple' } }),
      );
    });
  });
});
