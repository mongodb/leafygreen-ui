import { useEffect, useMemo, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import { usePrevious } from '@leafygreen-ui/hooks';
import { consoleOnce } from '@leafygreen-ui/lib';

/**
 * TODO: move this to `packages/hooks`
 * https://jira.mongodb.org/browse/LG-3608
 */

interface ControlledValueReturnObject<T extends any> {
  /** Whether the value is controlled */
  isControlled: boolean;

  /** The controlled or uncontrolled value */
  value: T;

  /**
   * Either updates the uncontrolled value,
   * or calls the provided `onChange` callback
   */
  setValue: (newVal?: T, ...args: Array<any>) => void;
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
  const setValue = (newVal: T | undefined) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }

    onChange?.(newVal);
  };

  return {
    isControlled,
    value,
    setValue,
  };
};
