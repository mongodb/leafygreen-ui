import { Reducer, useReducer } from 'react';

import { ToastProps } from '../Toast.types';

import { generateToastId } from './utils/generateToastId';
import {
  ToastContextProps,
  ToastId,
  ToastReducerAction,
  ToastReducerActionType,
  ToastReducerState,
  ToastStack,
} from './ToastContext.types';

/**
 *
 * The reducer function
 *
 * @param state The current reducer state
 * @param action The action type and payload
 */
const toastReducer = (
  state: ToastReducerState,
  action: ToastReducerAction,
): ToastReducerState => {
  switch (action.type) {
    case ToastReducerActionType.Push: {
      const { stack } = state;
      const { id, props } = action.payload;
      return {
        stack: stack.set(id, props),
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

    default:
      return state;
  }
};

export const useToastReducer = () => {
  const [{ stack }, dispatch] = useReducer<
    Reducer<ToastReducerState, ToastReducerAction>
  >(toastReducer, {
    stack: new Map<ToastId, ToastProps>() as ToastStack,
  });

  const getToast: ToastContextProps['getToast'] = (id: ToastId) =>
    stack.get(id);

  const popToast: ToastContextProps['popToast'] = (payload: ToastId) => {
    dispatch({
      type: ToastReducerActionType.Pop,
      payload,
    });

    // console.log('popping toast', { id: payload });

    return getToast(payload);
  };

  const pushToast: ToastContextProps['pushToast'] = (props: ToastProps) => {
    const id = generateToastId();

    dispatch({
      type: ToastReducerActionType.Push,
      payload: { id, props },
    });

    // console.log('pushing toast', { ...props, id });

    return id;
  };

  const updateToast: ToastContextProps['updateToast'] = (payload: {
    id: ToastId;
    props: Partial<ToastProps>;
  }) => {
    dispatch({
      type: ToastReducerActionType.Update,
      payload,
    });
    return getToast(payload.id);
  };

  return {
    stack,
    pushToast,
    popToast,
    updateToast,
    getToast,
  };
};
