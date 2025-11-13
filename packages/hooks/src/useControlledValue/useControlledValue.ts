import { ChangeEventHandler, MutableRefObject } from 'react';

import { createSyntheticEvent } from '@leafygreen-ui/lib';

import { useControlled } from '../useControlled';

import { ControlledValueReturnObject } from './useControlledValue.types';

/**
 * A hook that enables an input component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledValueReturnObject} with the controlled or uncontrolled `value`,
 * `onChange` & `onClear` handlers, a `setInternalValue` setter, and a boolean `isControlled`
 */
export const useControlledValue = <T>(
  controlledValue?: T,
  changeHandler?: ChangeEventHandler<any> | null,
  initialValue?: T,
): ControlledValueReturnObject<T> => {
  // Use the new useControlled hook under the hood
  const { isControlled, value, setUncontrolledValue } = useControlled(
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
