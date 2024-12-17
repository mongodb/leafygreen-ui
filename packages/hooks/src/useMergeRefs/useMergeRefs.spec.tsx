import React from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { useMergeRefs } from '.';
test('should merge refs', () => {
  const callbackRefMockFunc = jest.fn();
  const callbackRef: React.SetStateAction<HTMLElement | null> = element =>
    callbackRefMockFunc(element);
  const mutableRef: React.MutableRefObject<HTMLElement | null> = {
    current: null,
  };

  const {
    result: { current: mergedCallbackRef },
  } = renderHook(() => useMergeRefs([callbackRef, mutableRef]));

  expect(mergedCallbackRef).toBeInstanceOf(Function);
  expect(callbackRefMockFunc).not.toHaveBeenCalled();
  expect(mutableRef.current).toBe(null);

  const element = document.createElement('div');
  mergedCallbackRef?.(element);

  expect(callbackRefMockFunc).toHaveBeenCalledTimes(1);
  expect(callbackRefMockFunc).toHaveBeenCalledWith(element);
  expect(mutableRef.current).toBe(element);
});

test('should return null when all refs are null or undefined', () => {
  const ref1 = null;
  const ref2 = undefined;

  const { result } = renderHook(() => useMergeRefs([ref1, ref2]));

  expect(result.current).toBe(null);
});

test('returns the correct value for multiple refs', () => {
  const TestForwardRefComponent = React.forwardRef(
    function TestForwardRefComponent(_, ref) {
      React.useImperativeHandle(ref, () => 'refValue');
      return null;
    },
  );
  const refAsFunc = jest.fn();
  const refAsObj1 = { current: undefined };
  const refAsObj2 = { current: undefined };

  const Example: React.FC = () => {
    return (
      <TestForwardRefComponent
        ref={useMergeRefs([refAsObj1, refAsObj2, refAsFunc])}
      />
    );
  };

  render(<Example />);
  expect(refAsFunc).toHaveBeenCalledTimes(1);
  expect(refAsFunc).toHaveBeenCalledWith('refValue');
  expect(refAsObj1.current).toBe('refValue');
  expect(refAsObj2.current).toBe('refValue');
});

test('returns the correct value with undefined and null refs', () => {
  const TestForwardRefComponent = React.forwardRef(
    function TestForwardRefComponent(_, ref) {
      React.useImperativeHandle(ref, () => 'refValue');
      return null;
    },
  );
  const refAsFunc = jest.fn();
  const refAsObj = { current: undefined };

  const Example: React.FC = () => {
    return (
      <TestForwardRefComponent
        ref={useMergeRefs([null, undefined, refAsFunc, refAsObj])}
      />
    );
  };

  render(<Example />);
  expect(refAsFunc).toHaveBeenCalledTimes(1);
  expect(refAsFunc).toHaveBeenCalledWith('refValue');
  expect(refAsObj.current).toBe('refValue');
});
