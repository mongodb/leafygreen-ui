import React from 'react';
import { render } from '@testing-library/react';

import useMergeRefs from '.';

test('useMergeRefs', () => {
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

test('useMergeRefs with undefined and null refs', () => {
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
