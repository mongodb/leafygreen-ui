import React, { ChangeEvent, ChangeEventHandler, useRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act, renderHook } from '@leafygreen-ui/testing-lib';

import { useControlledInputValue } from './useControlledInputValue';

const changeEventMock = {
  target: { value: 'banana' },
} as ChangeEvent<any>;

const mutableRefMock = {
  current: document.createElement('div'),
};

const errorSpy = jest.spyOn(console, 'error');

describe('packages/hooks/useControlledInputValue', () => {
  beforeEach(() => {
    errorSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  describe('controlled input behavior', () => {
    test('handleChange calls provided handler with ChangeEvent', () => {
      const handler = jest.fn();
      const { result } = renderHook(v => useControlledInputValue(v, handler), {
        initialProps: 'apple',
      });

      // simulate responding to an event
      act(() => {
        result.current.handleChange(changeEventMock);
      });
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining(changeEventMock),
      );
      // value doesn't change unless we explicitly change it for controlled components
      expect(result.current.value).toBe('apple');
    });

    test('updateValue triggers the provided handler', async () => {
      const handler = jest.fn();

      const { result } = renderHook(v => useControlledInputValue(v, handler), {
        initialProps: 'apple',
      });

      await act(() => {
        result.current.updateValue('banana', mutableRefMock);
      });

      expect(handler).toHaveBeenCalled();
    });
  });

  describe('uncontrolled input behavior', () => {
    test('handleChange updates internal value for uncontrolled inputs', () => {
      const handler = jest.fn();
      const { result } = renderHook(
        v => useControlledInputValue(v, handler, ''),
        {
          initialProps: undefined,
        },
      );

      act(() => {
        result.current.handleChange(changeEventMock);
      });
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining(changeEventMock),
      );
      expect(result.current.value).toBe('banana'); // e.target.value from mock
    });

    test('updateValue triggers the provided handler and updates the value', () => {
      const handler = jest.fn();
      const { result } = renderHook(
        v => useControlledInputValue<string>(v, handler, ''),
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
  });

  describe('Within test component', () => {
    const TestComponent = ({
      valueProp,
      handlerProp,
    }: {
      valueProp?: string;
      handlerProp?: ChangeEventHandler;
    }) => {
      const initialVal = '';
      const inputRef = useRef<HTMLInputElement | null>(null);

      const { value, handleChange, updateValue } = useControlledInputValue(
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

    test('clicking the button updates the value', () => {
      const result = render(<TestComponent valueProp="apple" />);
      const input = result.getByTestId('test-input');
      const button = result.getByTestId('test-button');

      // Initial value
      expect(input).toHaveValue('apple');

      // Click button to trigger updateValue with ref
      userEvent.click(button);
      expect(input).toHaveValue('carrot');
    });
  });
});
