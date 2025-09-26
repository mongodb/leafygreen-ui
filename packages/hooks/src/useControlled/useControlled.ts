import { useMemo, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import { ControlledReturnObject } from './useControlled.types';

/**
 * A hook that enables a component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledReturnObject}
 */
export const useControlled = <T extends any>(
  controlledValue?: T,
  onChange?: (val?: T) => void,
  initialValue?: T,
): ControlledReturnObject<T | undefined> => {
  /**
   * isControlled should only be computed once
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isControlled = useMemo(() => !isUndefined(controlledValue), []);

  /**
   * Keep track of the uncontrolled value state internally
   */
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
    initialValue,
  );

  /**
   * The returned value.
   * If the component is uncontrolled, it will return the internal value.
   * If the component is controlled, it will return the controlled value.
   */
  const value = useMemo(
    () => (isControlled ? controlledValue : uncontrolledValue),
    [isControlled, uncontrolledValue, controlledValue],
  );

  /**
   * Updates the value of the component.
   * If the component is uncontrolled, it will update the internal value.
   * If the component is controlled, it will not update the controlled value.
   *
   * onChange callback is called if provided.
   */
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
    setUncontrolledValue,
  };
};
