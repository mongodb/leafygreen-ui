import React, { useRef } from 'react';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { act } from 'react-test-renderer';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import { useControlledValue } from './useControlledValue';

const changeEventMock = {
  target: { value: 'banana' },
} as ChangeEvent<any>;

const mutableRefMock = {
  current: document.createElement('div'),
};

const errorSpy = jest.spyOn(console, 'error');

describe('packages/hooks/useControlledValue', () => {
  beforeEach(() => {
    errorSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  describe('with controlled component', () => {
    test('calling with a value sets value and isControlled', () => {
      const { result } = renderHook(v => useControlledValue(v), {
        initialProps: 'apple',
      });
      expect(result.current.isControlled).toBe(true);
      expect(result.current.value).toBe('apple');
    });

    test('calling with a new value changes the value', () => {
      const { result, rerender } = renderHook(v => useControlledValue(v), {
        initialProps: 'apple',
      });

      expect(result.current.value).toBe('apple');

      act(() => {
        rerender('banana');
      });

      expect(result.current.value).toBe('banana');
    });

    test('provided handler is called within returned hook handler', () => {
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

    test('setting value to undefined should keep the component controlled', () => {
      const { result, rerender } = renderHook(v => useControlledValue(v), {
        initialProps: 'apple',
      });
      expect(result.current.isControlled).toBe(true);
      act(() => rerender(undefined));
      expect(result.current.isControlled).toBe(true);
    });

    test('setUncontrolledValue does nothing for controlled components', () => {
      const { result } = renderHook(v => useControlledValue(v), {
        initialProps: 'apple',
      });
      act(() => {
        result.current.setUncontrolledValue('banana');
      });
      expect(result.current.value).toBe('apple');
    });

    test('updateValue triggers the provided handler', async () => {
      const handler = jest.fn();

      const { result } = renderHook(v => useControlledValue(v, handler), {
        initialProps: 'apple',
      });

      await act(() => {
        result.current.updateValue('banana', mutableRefMock);
      });

      expect(handler).toHaveBeenCalled();
    });

    test('initial value is ignored when controlled', () => {
      const { result } = renderHook(
        v => useControlledValue(v, null, 'foobar'),
        {
          initialProps: 'apple',
        },
      );
      expect(result.current.value).toBe('apple');
    });

    describe('value types', () => {
      test('accepts number values', () => {
        const { result } = renderHook(v => useControlledValue(v), {
          initialProps: 5,
        });
        expect(result.current.value).toBe(5);
      });

      test('accepts boolean values', () => {
        const { result } = renderHook(v => useControlledValue(v), {
          initialProps: false,
        });
        expect(result.current.value).toBe(false);
      });

      test('accepts array values', () => {
        const arr = ['foo', 'bar'];
        const { result } = renderHook(v => useControlledValue(v), {
          initialProps: arr,
        });
        expect(result.current.value).toBe(arr);
      });

      test('accepts object values', () => {
        const obj = { foo: 'foo', bar: 'bar' };
        const { result } = renderHook(v => useControlledValue(v), {
          initialProps: obj,
        });
        expect(result.current.value).toBe(obj);
      });

      test('accepts date values', () => {
        const date = new Date('2023-08-23');
        const { result } = renderHook(v => useControlledValue(v), {
          initialProps: date,
        });
        expect(result.current.value).toBe(date);
      });

      test('accepts multiple types', () => {
        const { result, rerender } = renderHook(
          v => useControlledValue<string | number>(v),
          {
            initialProps: 5 as string | number,
          },
        );
        expect(result.current.value).toBe(5);
        act(() => {
          rerender('foo');
        });
        expect(result.current.value).toBe('foo');
      });
    });
  });

  describe('with uncontrolled component', () => {
    test('calling without a value sets value to initialValue and isControlled: false', () => {
      const { result } = renderHook(v => useControlledValue(v, null, ''), {
        initialProps: undefined,
      });
      expect(result.current.isControlled).toBe(false);
      expect(result.current.value).toBe('');
    });

    test('setUncontrolledValue updates value', () => {
      const handler = jest.fn();
      const { result } = renderHook(
        v => useControlledValue<string>(v, handler, ''),
        {
          initialProps: undefined,
        },
      );

      act(() => {
        result.current.setUncontrolledValue('apple');
      });
      expect(result.current.value).toBe('apple');
      expect(handler).not.toHaveBeenCalled();
    });

    test('provided handler should be called', () => {
      const handler = jest.fn();
      const { result } = renderHook(v => useControlledValue(v, handler, ''), {
        initialProps: undefined,
      });

      act(() => {
        result.current.handleChange(changeEventMock);
      });
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining(changeEventMock),
      );
    });

    test('updateValue updates value & calls handler', () => {
      const handler = jest.fn();
      const { result } = renderHook(
        v => useControlledValue<string>(v, handler, ''),
        {
          initialProps: undefined,
        },
      );

      act(() => {
        result.current.updateValue('banana', mutableRefMock);
      });

      expect(handler).toHaveBeenCalled();
      expect(result.current.value).toBe('banana');
    });

    test('calling the returned handler sets the value', () => {
      const handler = jest.fn();
      const { result } = renderHook(v => useControlledValue(v, handler, ''), {
        initialProps: undefined,
      });

      act(() => {
        result.current.handleChange(changeEventMock);
      });
      expect(result.current.value).toBe('banana');
    });

    test('changing value prop from initial undefined is ignored', () => {
      const { result, rerender } = renderHook(
        v => useControlledValue<string>(v, null, ''),
        {
          initialProps: undefined,
        },
      );
      expect(result.current.isControlled).toBe(false);
      expect(result.current.value).toBe('');
      // @ts-ignore - picking up renderHook.options types, not actual hook types
      act(() => rerender('apple'));
      expect(result.current.isControlled).toBe(false);
      expect(result.current.value).toBe('');
      expect(errorSpy).not.toHaveBeenCalled();
    });
  });

  describe('with test component', () => {
    const TestComponent = ({
      valueProp,
      handlerProp,
    }: {
      valueProp?: string;
      handlerProp?: ChangeEventHandler;
    }) => {
      const initialVal = '';
      const inputRef = useRef<HTMLInputElement>(null);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { value, handleChange, updateValue } = useControlledValue(
        valueProp,
        handlerProp,
        initialVal,
      );

      return (
        <>
          <input
            ref={inputRef}
            data-testid="test-input"
            value={value}
            onChange={handleChange}
          />
          <button
            data-testid="test-button"
            onClick={() => updateValue('carrot', inputRef)}
          />
        </>
      );
    };

    describe('Controlled test component', () => {
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
        expect(handler).toHaveBeenCalled();
      });

      test('user interaction does not change the element value', () => {
        const handler = jest.fn();
        const result = render(
          <TestComponent valueProp="apple" handlerProp={handler} />,
        );
        const input = result.getByTestId('test-input');
        userEvent.type(input, 'b');
        expect(input).toHaveValue('apple');
      });

      test('clicking the button updates the value', () => {
        const result = render(<TestComponent valueProp="apple" />);
        const input = result.getByTestId('test-input');
        const button = result.getByTestId('test-button');
        userEvent.click(button);
        expect(input).toHaveValue('carrot');
      });
    });

    describe('Uncontrolled test component', () => {
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
