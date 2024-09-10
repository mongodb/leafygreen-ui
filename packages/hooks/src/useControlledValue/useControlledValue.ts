import {
  ChangeEventHandler,
  MutableRefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';

import { consoleOnce, createSyntheticEvent } from '@leafygreen-ui/lib';

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
export const useControlledValue = <T>(
  controlledValue?: T,
  changeHandler?: ChangeEventHandler<any> | null,
  initialValue?: T,
): ControlledValueReturnObject<T | undefined> => {
  // isControlled should only be computed once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isControlled = useMemo(() => !isUndefined(controlledValue), []);

  // Keep track of the uncontrolled value state internally
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
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
    value: isControlled ? controlledValue : uncontrolledValue,
    handleChange,
    setUncontrolledValue,
    updateValue,
  };
};
