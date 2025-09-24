import { useEffect, useMemo, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import { consoleOnce } from '@leafygreen-ui/lib';

interface ControlledValueReturnObject<T extends any> {
  /** Whether the value is controlled */
  isControlled: boolean;

  /** The controlled or uncontrolled value */
  value: T;

  /**
   * Either updates the uncontrolled value,
   * or calls the provided `onChange` callback
   */
  updateValue: (newVal?: T) => void;

  /**
   * A setter for the internal value.
   * Does not change the controlled value if the provided value has not changed.
   * Prefer using `updateValue` to programmatically set the value.
   * @internal
   */
  setUncontrolledValue: React.Dispatch<React.SetStateAction<T>>;
}

/**
 * A hook that enables a component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledValueReturnObject}
 */
export const useControlledValue = <T extends any>(
  controlledValue?: T,
  onChange?: (val?: T) => void,
  initialValue?: T,
): ControlledValueReturnObject<T | undefined> => {
  // isControlled should only be computed once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isControlled = useMemo(() => !isUndefined(controlledValue), []);

  // Keep track of the uncontrolled value state internally
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
    initialValue,
  );

  // The returned value is either the provided value prop
  // or the uncontrolled value
  const value = useMemo(
    () => (isControlled ? controlledValue : uncontrolledValue),
    [isControlled, uncontrolledValue, controlledValue],
  );

  //
  const updateValue = (newVal: T | undefined) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }
    onChange?.(newVal);
  };

  useEffect(() => {
    // Log a warning if neither controlled value or initialValue is provided
    if (isUndefined(controlledValue) && isUndefined(initialValue)) {
      consoleOnce.error(
        `Warning: \`useControlledValue\` hook is being used without a value or initialValue. This will cause a React warning when the input changes. Please decide between using a controlled or uncontrolled input element, and provide either a controlledValue or initialValue to \`useControlledValue\``,
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
