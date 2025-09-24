import { ChangeEventHandler, MutableRefObject } from 'react';

import { consoleOnce, createSyntheticEvent } from '@leafygreen-ui/lib';

import { useControlledValue } from '../useControlledValue';

interface ControlledValueReturnObject<T extends any> {
  /** Whether the value is controlled */
  isControlled: boolean;

  /** The controlled or uncontrolled value */
  value: T;

  /** A ChangeEventHandler to assign to any onChange event */
  handleChange: ChangeEventHandler<any>;

  /**
   * A setter for the internal value.
   * Does not change the controlled value if the provided value has not changed.
   * Prefer using `updateValue` to programmatically set the value.
   * @internal
   */
  setUncontrolledValue: React.Dispatch<React.SetStateAction<T>>;

  /**
   * Synthetically triggers a change event within the `handleChange` callback.
   * Signals that the value should change for controlled components,
   * and updates the internal value for uncontrolled components
   */
  updateValue: (newVal: T, ref: MutableRefObject<any>) => void;
}

/**
 * A hook that enables a component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledValueReturnObject} with the controlled or uncontrolled `value`,
 * `onChange` & `onClear` handlers, a `setInternalValue` setter, and a boolean `isControlled`
 */
export const useControlledInputValue = <T>(
  controlledValue?: T,
  changeHandler?: ChangeEventHandler<any> | null,
  initialValue?: T,
): ControlledValueReturnObject<T | undefined> => {
  // Use the new useControlledValue hook under the hood
  const { isControlled, value, setUncontrolledValue } = useControlledValue(
    controlledValue,
    undefined, // We'll handle onChange differently for input-specific logic
    initialValue,
  );

  // Create a change event handler that either updates the internal state
  // or fires an external change handler
  const handleChange: ChangeEventHandler<any> = e => {
    changeHandler?.(e);
    if (!isControlled) {
      setUncontrolledValue(e.target.value as T);
    }
  };

  // A wrapper around `handleChange` that fires a simulated event
  const updateValue = (newVal: T | undefined, ref: MutableRefObject<any>) => {
    if (ref.current) {
      ref.current.value = newVal;
      const synthEvt = createSyntheticEvent(
        new Event('change', {
          cancelable: true,
          bubbles: true,
        }),
        ref.current,
      );

      handleChange(synthEvt);
    }
  };

  return {
    isControlled,
    value,
    handleChange,
    setUncontrolledValue,
    updateValue,
  };
};
