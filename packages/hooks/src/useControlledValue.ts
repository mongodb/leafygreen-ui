import {
  ChangeEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';

export const useControlledValue = <T extends string>(
  controlledValue?: T,
  _onChange?: ChangeEventHandler<any>,
  _onClear?: ReactEventHandler<any>,
) => {
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
