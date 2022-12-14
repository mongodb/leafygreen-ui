import { ChangeEventHandler, EventHandler, SyntheticEvent, useEffect, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

export const useValue = <T extends string>(
  controlledValue?: T,
  onChangeArg?: ChangeEventHandler<any>,
  onClearArg?: EventHandler<SyntheticEvent<any>>
) => {

  const isControlled = !isUndefined(controlledValue)

  // Keep track of state internally, initializing it to the controlled value
  const [value, setInternalValue] = useState<T | undefined>(
    controlledValue,
  );

  // If the controlled value changes, update the internal state variable
  useEffect(() => {
    setInternalValue(controlledValue);
  }, [controlledValue]);

  // Create a change event handler that either updates the internal state
  // or fires an external change handler
  const onChange: ChangeEventHandler<any> = e => {
    if (isControlled) {
      // we fire an external change handler,
      // expecting that `controlledValue` will be updated
      onChangeArg?.(e);
    } else {
      setInternalValue(e.target.value as T);
    }
  };

  const onClear: EventHandler<SyntheticEvent<any>> = e => {
    if (isControlled) {
      onClearArg?.(e);
    } else {
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
