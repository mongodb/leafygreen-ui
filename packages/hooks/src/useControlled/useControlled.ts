import { useEffect, useMemo, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import { consoleOnce } from '@leafygreen-ui/lib';

import { ControlledReturnObject } from './useControlled.types';

/**
 * A hook that enables a component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledReturnObject}
 */
export const useControlled = <T extends any = undefined>(
  controlledValue?: T,
  onChange?: (val: T) => void,
  initialValue?: T,
): ControlledReturnObject<T> => {
  /**
   * isControlled should only be computed once
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isControlled = useMemo(() => !isUndefined(controlledValue), []);

  /**
   * Keep track of the uncontrolled value state internally
   *
   * Note on type assertion:
   * if `controlledValue` is undefined _and_ `initialValue` is also undefined,
   * then T is necessarily `undefined`, so asserting `(initialValue as T)` is safe
   */
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(
    !isUndefined(controlledValue) ? controlledValue : (initialValue as T),
  );

  /**
   * The returned value.
   * If the component is uncontrolled, it will return the internal value.
   * If the component is controlled, it will return the controlled value.
   */
  const value = useMemo(
    () => (isControlled ? (controlledValue as T) : uncontrolledValue),
    [isControlled, uncontrolledValue, controlledValue],
  );

  /**
   * Updates the value of the component.
   * If the component is uncontrolled, it will update the internal value.
   * If the component is controlled, it will not update the controlled value.
   *
   * onChange callback is called if provided.
   */
  const updateValue = (newVal: T) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }
    onChange?.(newVal);
  };

  /**
   * Log a warning if neither controlled value or initialValue is provided
   */
  useEffect(() => {
    if (isUndefined(controlledValue) && isUndefined(initialValue)) {
      consoleOnce.error(
        `Warning: \`useControlled\` hook is being used without a value or initialValue. If using an input, this will cause a React warning when an input changes. Please decide between using a controlled or uncontrolled element, and provide either a controlledValue or initialValue to \`useControlled\``,
      );
    }
  }, [controlledValue, initialValue]);

  return {
    isControlled,
    value,
    updateValue,
    setUncontrolledValue,
  };
};
