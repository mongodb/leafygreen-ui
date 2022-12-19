import {
  ChangeEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';

interface ControlledValueReturnObject<T extends string> {
  /** Whether the value is controlled */
  isControlled: boolean,
  /** The controlled or uncontrolled value */
  value: T,
  /** A ChangeEventHandler to assign to any onChange event */
  onChange: ChangeEventHandler<any>,
  /** A ReactEventHandler to assign to any onClear event */
  onClear: ReactEventHandler<any>,
  /**
   * A setter for the internal value.
   * Does not change the controlled value if the provided value has not changed.
   */
  setInternalValue: React.Dispatch<React.SetStateAction<T>>,
};

/**
 * A hook that enables a component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledValueReturnObject} with the controlled or uncontrolled `value`,
 * `onChange` & `onClear` handlers, a `setInternalValue` setter, and a boolean `isControlled`
 */
export const useControlledValue = <T extends string>(
  controlledValue?: T,
  _onChange?: ChangeEventHandler<any>,
  _onClear?: ReactEventHandler<any>,
): ControlledValueReturnObject<T> => {
  const isControlled = !isUndefined(controlledValue);

  // Keep track of state internally, initializing it to the controlled value
  const [value, setInternalValue] = useState<T>(controlledValue ?? ('' as T));

  // If the controlled value changes, update the internal state variable
  useEffect(() => {
    if (!isUndefined(controlledValue)) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // Create a change event handler that either updates the internal state
  // or fires an external change handler
  const onChange: ChangeEventHandler<any> = e => {
    _onChange?.(e);
    if (!isControlled) {
      setInternalValue(e.target.value as T);
    }
  };

  const onClear: ReactEventHandler<any> = e => {
    _onClear?.(e);
    if (!isControlled) {
      setInternalValue('' as T);
    }
  };

  return {
    isControlled,
    value,
    onChange,
    onClear,
    setInternalValue,
  };
};
