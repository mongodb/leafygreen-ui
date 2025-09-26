import { useEffect, useMemo, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import { consoleOnce } from '@leafygreen-ui/lib';

import { ControlledReturnObject } from './useControlled.types';

/**
 * A hook that enables a component to be both controlled or uncontrolled.
 *
 * Returns a {@link ControlledReturnObject}
 */
export const useControlled = <T extends any>(
  controlled?: T,
  onChange?: (val?: T) => void,
  initialValue?: T,
): ControlledReturnObject<T | undefined> => {
  // isControlled should only be computed once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isControlled = useMemo(() => !isUndefined(controlled), []);

  // Keep track of the uncontrolled value state internally
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
    initialValue,
  );

  // The returned value is either the provided value prop
  // or the uncontrolled value
  const value = useMemo(
    () => (isControlled ? controlled : uncontrolledValue),
    [isControlled, uncontrolledValue, controlled],
  );

  //
  const updateValue = (newVal: T | undefined) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }
    onChange?.(newVal);
  };

  useEffect(() => {
    // Log a warning if neither controlled value or initialValue is provided
    if (isUndefined(controlled) && isUndefined(initialValue)) {
      consoleOnce.error(
        `Warning: \`useControlled\` hook is being used without a value or initialValue. This will cause a React warning when the input changes. Please decide between using a controlled or uncontrolled input element, and provide either a controlled or initialValue to \`useControlled\``,
      );
    }
  }, [controlled, initialValue]);

  return {
    isControlled,
    value,
    updateValue,
    setUncontrolledValue,
  };
};
