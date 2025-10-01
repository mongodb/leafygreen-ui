import React, { ChangeEventHandler } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act, renderHook } from '@leafygreen-ui/testing-lib';

import { useControlled } from './useControlled';

const errorSpy = jest.spyOn(console, 'error');

const renderUseControlledHook = <T extends any>(
  ...[valueProp, callback, initial]: Parameters<typeof useControlled<T>>
) => {
  const result = renderHook(v => useControlled(v, callback, initial), {
    initialProps: valueProp,
  });

  return result;
};

describe('packages/hooks/useControlled', () => {
  beforeEach(() => {
    errorSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  test('rendering without any arguments sets hook to uncontrolled', () => {
    const { result } = renderUseControlledHook();
    expect(result.current.isControlled).toEqual(false);
  });

  describe('accepts various value types', () => {
    test('accepts number values', () => {
      const { result } = renderUseControlledHook(5);
      expect(result.current.value).toBe(5);
    });

    test('accepts boolean values', () => {
      const { result } = renderUseControlledHook(false);
      expect(result.current.value).toBe(false);
    });

    test('accepts array values', () => {
      const arr = ['foo', 'bar'];
      const { result } = renderUseControlledHook(arr);
      expect(result.current.value).toBe(arr);
    });

    test('accepts object values', () => {
      const obj = { foo: 'foo', bar: 'bar' };
      const { result } = renderUseControlledHook(obj);
      expect(result.current.value).toBe(obj);
    });

    test('accepts date values', () => {
      const date = new Date('2023-08-23');
      const { result } = renderUseControlledHook(date);
      expect(result.current.value).toBe(date);
    });

    test('accepts multiple/union types', () => {
      const { result, rerender } = renderUseControlledHook<string | number>(5);
      expect(result.current.value).toBe(5);
      rerender('foo');
      expect(result.current.value).toBe('foo');
    });
  });

  describe('Controlled', () => {
    test('rendering with a value sets value and isControlled', () => {
      const { result } = renderUseControlledHook('apple');
      expect(result.current.isControlled).toBe(true);
      expect(result.current.value).toBe('apple');
    });

    test('rerendering with a new value changes the value', () => {
      const { rerender, result } = renderUseControlledHook('apple');
      expect(result.current.value).toBe('apple');
      rerender('banana');
      expect(result.current.value).toBe('banana');
    });

    test('provided handler is called within `updateValue`', () => {
      const handler = jest.fn();
      const { result } = renderUseControlledHook<string>('apple', handler);
      result.current.updateValue('banana');
      expect(handler).toHaveBeenCalledWith('banana');
    });

    test('hook value does not change when `updateValue` is called', () => {
      const { result } = renderUseControlledHook<string>('apple');
      result.current.updateValue('banana');
      // value doesn't change unless we explicitly change it
      expect(result.current.value).toBe('apple');
    });

    test('setting value to undefined should keep the component controlled', () => {
      const { rerender, result } = renderUseControlledHook('apple');
      expect(result.current.isControlled).toBe(true);
      act(() => rerender(undefined));
      expect(result.current.isControlled).toBe(true);
    });

    test('initial value is ignored when controlled', () => {
      const { result } = renderUseControlledHook<string>(
        'apple',
        () => {},
        'banana',
      );
      expect(result.current.value).toBe('apple');
    });

    test('setUncontrolledValue does nothing for controlled components', () => {
      const { result } = renderUseControlledHook('apple');
      act(() => {
        result.current.setUncontrolledValue('banana');
      });
      expect(result.current.value).toBe('apple');
    });
  });

  describe('Uncontrolled', () => {
    test('calling without a value sets value to `initialValue`', () => {
      const {
        result: { current },
      } = renderUseControlledHook(undefined, () => {}, 'apple');

      expect(current.isControlled).toBe(false);
      expect(current.value).toBe('apple');
    });

    test('provided handler is called within `updateValue`', () => {
      const handler = jest.fn();
      const {
        result: { current },
      } = renderUseControlledHook(undefined, handler);

      current.updateValue('apple');
      expect(handler).toHaveBeenCalledWith('apple');
    });

    test('updateValue updates the value', () => {
      const { result, rerender } = renderUseControlledHook<string>(undefined);
      result.current.updateValue('banana');
      rerender();
      expect(result.current.value).toBe('banana');
    });

    test('rerendering from initial undefined does not set value and isControlled', async () => {
      const { rerender, result } = renderUseControlledHook();
      rerender('apple');
      expect(result.current.isControlled).toBe(false);
      expect(result.current.value).toBeUndefined();
    });

    test('setUncontrolledValue updates value', () => {
      const handler = jest.fn();
      const { result } = renderUseControlledHook<string>(
        undefined,
        handler,
        '',
      );

      act(() => {
        result.current.setUncontrolledValue('apple');
      });
      expect(result.current.value).toBe('apple');
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Within test component', () => {
    const TestComponent = ({
      valueProp,
      handlerProp,
    }: {
      valueProp?: string;
      handlerProp?: (val?: string) => void;
    }) => {
      const initialVal = '';

      const { value, updateValue } = useControlled(
        valueProp,
        handlerProp,
        initialVal,
      );

      const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        updateValue(e.target.value);
      };

      return (
        <>
          <input
            data-testid="test-input"
            value={value}
            onChange={handleChange}
          />
          <button
            data-testid="test-button"
            onClick={() => updateValue('carrot')}
          />
        </>
      );
    };

    describe('Controlled', () => {
      test('initially renders with a value', () => {
        const result = render(<TestComponent valueProp="apple" />);
        const input = result.getByTestId('test-input');
        expect(input).toHaveValue('apple');
      });

      test('responds to value changes', () => {
        const result = render(<TestComponent valueProp="apple" />);
        const input = result.getByTestId('test-input');
        result.rerender(<TestComponent valueProp="banana" />);
        expect(input).toHaveValue('banana');
      });

      test('user interaction triggers handler', () => {
        const handler = jest.fn();
        const result = render(
          <TestComponent valueProp="apple" handlerProp={handler} />,
        );
        const input = result.getByTestId('test-input');
        userEvent.type(input, 'b');
        expect(handler).toHaveBeenCalledWith(expect.stringContaining('b'));
      });

      test('user interaction does not change the element value', () => {
        const result = render(<TestComponent valueProp="apple" />);
        const input = result.getByTestId('test-input');
        userEvent.type(input, 'b');
        expect(input).toHaveValue('apple');
      });
    });

    describe('Uncontrolled', () => {
      test('initially renders without a value', () => {
        const result = render(<TestComponent />);
        const input = result.getByTestId('test-input');
        expect(input).toHaveValue('');
        expect(errorSpy).not.toHaveBeenCalled();
      });

      test('user interaction triggers handler', () => {
        const handler = jest.fn();
        const result = render(<TestComponent handlerProp={handler} />);
        const input = result.getByTestId('test-input');
        userEvent.type(input, 'b');
        expect(handler).toHaveBeenCalled();
      });

      test('user interaction changes the element value', () => {
        const handler = jest.fn();
        const result = render(<TestComponent handlerProp={handler} />);
        const input = result.getByTestId('test-input');
        userEvent.type(input, 'banana');
        expect(input).toHaveValue('banana');
      });

      test('clicking the button updates the value', () => {
        const result = render(<TestComponent />);
        const input = result.getByTestId('test-input');
        const button = result.getByTestId('test-button');
        userEvent.click(button);
        expect(input).toHaveValue('carrot');
      });
    });
  });
});
