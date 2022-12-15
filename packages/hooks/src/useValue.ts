import { ChangeEventHandler, EventHandler, SyntheticEvent, useEffect, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

export const useValue = <T extends string>(
  controlledValue?: T,
  onChangeArg?: ChangeEventHandler<any>,
  onClearArg?: EventHandler<SyntheticEvent<any>>
) => {

  const isControlled = !isUndefined(controlledValue)

  // Keep track of state internally, initializing it to the controlled value
  const [value, setInternalValue] = useState<T>(
    controlledValue ?? '' as T,
  );

  // If the controlled value changes, update the internal state variable
  useEffect(() => {
    if (!isUndefined(controlledValue)) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // Create a change event handler that either updates the internal state
  // or fires an external change handler
  const onChange: ChangeEventHandler<any> = e => {
    onChangeArg?.(e);
    if (!isControlled) {
      setInternalValue(e.target.value as T);
    }
  };

  const onClear: EventHandler<SyntheticEvent<any>> = e => {
    onClearArg?.(e);
    if (!isControlled) {
      setInternalValue("" as T);
    }
  }

  return {
    isControlled,
    value,
    onChange,
    onClear,
    setInternalValue,
  };
};
