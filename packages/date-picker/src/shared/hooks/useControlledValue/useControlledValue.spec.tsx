import React from 'react';
import { ChangeEventHandler } from 'react';
import { render } from '@testing-library/react';
import { RenderHookResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act, renderHook } from '@leafygreen-ui/testing-lib';

import { useControlledValue } from './useControlledValue';

const errorSpy = jest.spyOn(console, 'error');

const renderUseControlledValueHook = <T extends any>(
  ...[valueProp, callback, initial]: Parameters<typeof useControlledValue<T>>
): RenderHookResult<
  ReturnType<typeof useControlledValue<T>>,
  typeof valueProp
> => {
  const result = renderHook(v => useControlledValue(v, callback, initial), {
    initialProps: valueProp,
  });

  return { ...result };
};

describe('packages/date-picker/hooks/useControlledValue', () => {
  beforeEach(() => {
    errorSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  test('rendering without any arguments sets hook to uncontrolled', () => {
    const { result } = renderUseControlledValueHook();
    expect(result.current.isControlled).toEqual(false);
  });

  describe('accepts various value types', () => {
    test('accepts number values', () => {
      const { result } = renderUseControlledValueHook(5);
      expect(result.current.value).toBe(5);
    });

    test('accepts boolean values', () => {
      const { result } = renderUseControlledValueHook(false);
      expect(result.current.value).toBe(false);
    });

    test('accepts array values', () => {
      const arr = ['foo', 'bar'];
      const { result } = renderUseControlledValueHook(arr);
      expect(result.current.value).toBe(arr);
    });

    test('accepts object values', () => {
      const obj = { foo: 'foo', bar: 'bar' };
      const { result } = renderUseControlledValueHook(obj);
      expect(result.current.value).toBe(obj);
    });

    test('accepts date values', () => {
      const date = new Date('2023-08-23');
      const { result } = renderUseControlledValueHook(date);
      expect(result.current.value).toBe(date);
    });

    test('accepts multiple/union types', () => {
      const { result, rerender } = renderUseControlledValueHook<
        string | number
      >(5);
      expect(result.current.value).toBe(5);
      rerender('foo');
      expect(result.current.value).toBe('foo');
    });
  });

  describe('Controlled', () => {
    test('rendering with a value sets value and isControlled', () => {
      const { result } = renderUseControlledValueHook('apple');
      expect(result.current.isControlled).toBe(true);
      expect(result.current.value).toBe('apple');
    });

    test('rerendering from initial undefined sets value and isControlled', async () => {
      const { rerender, result } = renderUseControlledValueHook();
      rerender('apple');
      expect(result.current.isControlled).toBe(true);
      expect(result.current.value).toEqual('apple');
    });

    test('rerendering with a new value changes the value', () => {
      const { rerender, result } = renderUseControlledValueHook('apple');
      expect(result.current.value).toBe('apple');
      rerender('banana');
      expect(result.current.value).toBe('banana');
    });

    test('provided handler is called within `setValue`', () => {
      const handler = jest.fn();
      const { result } = renderUseControlledValueHook<string>('apple', handler);
      result.current.setValue('banana');
      expect(handler).toHaveBeenCalledWith('banana');
    });

    test('hook value does not change when `setValue` is called', () => {
      const { result } = renderUseControlledValueHook<string>('apple');
      result.current.setValue('banana');
      // value doesn't change unless we explicitly change it
      expect(result.current.value).toBe('apple');
    });

    test('setting value to undefined should keep the component controlled', () => {
      const { rerender, result } = renderUseControlledValueHook('apple');
      expect(result.current.isControlled).toBe(true);
      act(() => rerender(undefined));
      expect(result.current.isControlled).toBe(true);
    });

    test('initial value is ignored when controlled', () => {
      const { result } = renderUseControlledValueHook<string>(
        'apple',
        () => {},
        'banana',
      );
      expect(result.current.value).toBe('apple');
    });
  });

  describe('Uncontrolled', () => {
    test('calling without a value sets value to `initialValue`', () => {
      const {
        result: { current },
      } = renderUseControlledValueHook(undefined, () => {}, 'apple');

      expect(current.isControlled).toBe(false);
      expect(current.value).toBe('apple');
    });

    test('provided handler is called within `setValue`', () => {
      const handler = jest.fn();
      const {
        result: { current },
      } = renderUseControlledValueHook(undefined, handler);

      current.setValue('apple');
      expect(handler).toHaveBeenCalledWith('apple');
    });

    test('setValue updates the value', () => {
      const { result, rerender } =
        renderUseControlledValueHook<string>(undefined);
      result.current.setValue('banana');
      rerender();
      expect(result.current.value).toBe('banana');
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { value, setValue } = useControlledValue(
        valueProp,
        handlerProp,
        initialVal,
      );

      const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setValue(e.target.value);
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
            onClick={() => setValue('carrot')}
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

      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('user interaction does not change the element value when initially undefined', () => {
        const handler = jest.fn();
        const result = render(
          <TestComponent valueProp={undefined} handlerProp={handler} />,
        );
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

      test('user interaction does not change the element value', () => {
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
