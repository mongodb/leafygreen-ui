import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import { usePrevious } from '@leafygreen-ui/hooks';
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
  setValue: Dispatch<SetStateAction<T>>;
}

/**
 * A hook that enables a component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledValueReturnObject}
 * @deprecated Use `useControlled` from `@leafygreen-ui/hooks` instead
 * https://github.com/mongodb/leafygreen-ui/pull/3153
 */
export const useWizardControlledValue = <T extends any>(
  valueProp?: T,
  onChange?: (val?: T, ...args: Array<any>) => void,
  initialProp?: T,
): ControlledValueReturnObject<T> => {
  // Initially set isControlled to the existence of `valueProp`.
  // If the value prop changes from undefined to something defined,
  // then isControlled is set to true,
  // and will remain true for the life of the component
  const [isControlled, setControlled] = useState(!isUndefined(valueProp));
  useEffect(() => {
    setControlled(isControlled || !isUndefined(valueProp));
  }, [isControlled, valueProp]);

  const wasControlled = usePrevious(isControlled);

  useEffect(() => {
    if (isUndefined(isControlled) || isUndefined(wasControlled)) return;

    if (isControlled !== wasControlled) {
      const err = `WARN: A component changed from ${
        wasControlled ? 'controlled' : 'uncontrolled'
      } to ${
        isControlled ? 'controlled' : 'uncontrolled'
      }. This can cause issues with React states. ${
        isControlled
          ? 'To control a component, but have an initially empty input, consider setting the `value` prop to `null`.'
          : ''
      }`;

      consoleOnce.warn(err);
    }
  }, [isControlled, wasControlled]);

  // We set the initial value to either the `value`
  // or the temporary `initialValue` prop
  const initialValue: T = useMemo(
    () => (isControlled ? (valueProp as T) : (initialProp as T)),
    [initialProp, isControlled, valueProp],
  );

  // Keep track of the internal value state
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(
    initialValue as T,
  );

  // The returned value is wither the provided value prop
  // or the uncontrolled value
  const value = useMemo(
    () => (isControlled ? (valueProp as T) : (uncontrolledValue as T)),
    [isControlled, uncontrolledValue, valueProp],
  );

  // A wrapper around `handleChange` that fires a simulated event
  const setValue: Dispatch<SetStateAction<T>> = newVal => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }

    const val = typeof newVal === 'function' ? (newVal as Function)() : newVal;
    onChange?.(val);
  };

  return {
    isControlled,
    value,
    setValue,
  };
};
