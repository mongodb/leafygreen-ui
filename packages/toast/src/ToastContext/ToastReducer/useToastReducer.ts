import { Reducer, useCallback, useMemo, useReducer } from 'react';

import { defaultToastProps } from '../../InternalToast/defaultProps';
import { ToastProps } from '../../Toast.types';
import {
  ToastContextProps,
  ToastId,
  ToastReducerAction,
  ToastReducerActionType,
  ToastReducerState,
  ToastStack,
} from '../ToastContext.types';
import { makeToast } from '../utils/makeToast';

/**
 *
 * The reducer function
 *
 * @param state The current reducer state
 * @param action The action type and payload
 *
 * @internal
 */
const toastReducer = (
  state: ToastReducerState,
  action: ToastReducerAction,
): ToastReducerState => {
  switch (action.type) {
    case ToastReducerActionType.Push: {
      const { stack } = state;
      const { id, ...toast } = action.payload;
      return {
        stack: stack.set(id, { ...defaultToastProps, ...toast }),
      };
    }

    case ToastReducerActionType.Pop: {
      const { stack } = state;
      const id = action.payload;
      const poppedToast = stack.get(id);

      if (poppedToast) {
        stack.delete(id);
      }

      return { stack };
    }

    case ToastReducerActionType.Update: {
      const { stack } = state;
      const { id, props } = action.payload;
      const updatedToast = stack.get(id);

      if (updatedToast) {
        stack.set(id, { ...updatedToast, ...props });
      }

      return { stack };
    }

    case ToastReducerActionType.Clear: {
      const { stack } = state;
      stack.clear();
      return { stack };
    }
  }
};

/**
 * An abstraction of `useReducer` for the toast context
 *
 * @internal
 */
export const useToastReducer = (initialValue?: ToastStack) => {
  const [{ stack }, dispatch] = useReducer<
    Reducer<ToastReducerState, ToastReducerAction>
  >(toastReducer, {
    stack: initialValue ?? (new Map<ToastId, ToastProps>() as ToastStack),
  });

  const pushToast: ToastContextProps['pushToast'] = useCallback(
    (props: ToastProps) => {
      const toast = makeToast(props);

      dispatch({
        type: ToastReducerActionType.Push,
        payload: toast,
      });

      return toast.id;
    },
    [],
  );

  const getToast: ToastContextProps['getToast'] = useCallback(
    (id: ToastId) => stack.get(id),
    [stack],
  );

  const popToast: ToastContextProps['popToast'] = useCallback(
    (id: ToastId) => {
      const toastProps = getToast(id);

      dispatch({
        type: ToastReducerActionType.Pop,
        payload: id,
      });

      return toastProps;
    },
    [getToast],
  );

  const updateToast: ToastContextProps['updateToast'] = useCallback(
    (id: ToastId, props: Partial<ToastProps>) => {
      const action: ToastReducerAction = {
        type: ToastReducerActionType.Update,
        payload: {
          id,
          props,
        },
      };

      dispatch(action);

      // `getToast` will return the previous toast value,
      // so we need to apply the state change manually
      // in order to return the updated value
      const { stack: newStack } = toastReducer({ stack }, action);
      const updatedToast = newStack.get(id);

      return updatedToast;
    },
    [stack],
  );

  const clearStack: ToastContextProps['clearStack'] = useCallback(() => {
    dispatch({
      type: ToastReducerActionType.Clear,
    });
  }, []);

  return useMemo(() => {
    return {
      pushToast,
      popToast,
      updateToast,
      getToast,
      clearStack,
      stack,
    };
  }, [pushToast, popToast, updateToast, stack, getToast, clearStack]);
};
