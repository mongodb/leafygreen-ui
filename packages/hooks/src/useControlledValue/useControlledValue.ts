import { useMemo, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

interface ControlledValueReturnObject<T extends any> {
  /** Whether the value is controlled */
  isControlled: boolean;

  /** The controlled or uncontrolled value */
  value: T;

  /**
   * Either updates the uncontrolled value,
   * or calls the provided `onChange` callback
   */
  updateValue: (newVal?: T, ...args: Array<any>) => void;
}

/**
 * A hook that enables a component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledValueReturnObject}
 */
export const useControlledValue = <T extends any>(
  valueProp?: T,
  onChange?: (val?: T, ...args: Array<any>) => void,
  initialProp?: T,
): ControlledValueReturnObject<T | undefined> => {
  // Initially set isControlled to the existence of `valueProp`.
  // If the value prop changes from undefined to something defined,
  // then isControlled is set to true,
  // and will remain true for the life of the component
  const isControlled: boolean = useMemo(() => {
    return isControlled || !isUndefined(valueProp);
  }, [valueProp]);

  // We set the initial value to either the `value`
  // or the temporary `initialValue` prop
  const initialValue = useMemo(
    () => (isControlled ? valueProp : initialProp),
    [initialProp, isControlled, valueProp],
  );

  // Keep track of the internal value state
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
    initialValue,
  );

  // The returned value is wither the provided value prop
  // or the uncontrolled value
  const value = useMemo(
    () => (isControlled ? valueProp : uncontrolledValue),
    [isControlled, uncontrolledValue, valueProp],
  );

  // A wrapper around `handleChange` that fires a simulated event
  const updateValue = (newVal: T | undefined) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }

    onChange?.(newVal);
  };

  return {
    isControlled,
    value,
    updateValue,
  };
};
