import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import { consoleOnce, isDefined } from '@leafygreen-ui/lib';

export const useControlledState = <T extends any>(
  initialState: T,
  controlledState?: T,
  setControlledState?: Dispatch<SetStateAction<T>>,
): [T, Dispatch<SetStateAction<T>>] => {
  const isControlled =
    isDefined(controlledState) && isDefined(setControlledState);
  const [internalState, setInternalState] = useState(initialState);

  useEffect(() => {
    // Log a warning if neither controlled value or initialValue is provided
    if (!isControlled && isUndefined(initialState)) {
      consoleOnce.error(
        `Warning: \`useControlledState\` hook is being used without a \`controlledState\` or \`initialState\`.` +
          `This will cause a React warning when the input changes.` +
          `Please decide between using a controlled or uncontrolled input element, and provide either a \`controlledState\` or \`initialState\` to \`useControlledState\``,
      );
    }
  }, [isControlled, initialState]);

  return [
    isControlled ? controlledState : internalState,
    isControlled ? setControlledState : setInternalState,
  ];
};
