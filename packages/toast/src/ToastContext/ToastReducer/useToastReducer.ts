import { Reducer, useReducer } from 'react';
import { faker } from '@faker-js/faker';
import { random, range, sample } from 'lodash';

import { defaultToastProps } from '../../InternalToast/defaultProps';
import { ToastProps, Variant } from '../../Toast.types';
import {
  ToastContextProps,
  ToastId,
  ToastReducerAction,
  ToastReducerActionType,
  ToastReducerState,
  ToastStack,
} from '../ToastContext.types';
import { generateToastId } from '../utils/generateToastId';

const _DEBUG_TOASTS: Array<[ToastId, ToastProps]> = range(12).map(i => {
  const variant = sample(Variant);
  return [
    generateToastId(),
    {
      title: `I'm a ${variant} toast`,
      description: faker.lorem.lines(random(1, 2)),
      variant,
    },
  ];
});

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
        stack: stack.set(id, { ...defaultToastProps, ...props }),
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

    default:
      return state;
  }
};

export const useToastReducer = () => {
  const [{ stack }, dispatch] = useReducer<
    Reducer<ToastReducerState, ToastReducerAction>
  >(toastReducer, {
    stack: new Map<ToastId, ToastProps>(
      // TODO: REMOVE DEBUG
      _DEBUG_TOASTS,
    ) as ToastStack,
  });

  const getToast: ToastContextProps['getToast'] = (id: ToastId) =>
    stack.get(id);

  const popToast: ToastContextProps['popToast'] = (payload: ToastId) => {
    dispatch({
      type: ToastReducerActionType.Pop,
      payload,
    });

    return getToast(payload);
  };

  const pushToast: ToastContextProps['pushToast'] = (props: ToastProps) => {
    const id = generateToastId();

    dispatch({
      type: ToastReducerActionType.Push,
      payload: { id, props },
    });

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

  const clearStack: ToastContextProps['clearStack'] = () => {
    dispatch({
      type: ToastReducerActionType.Clear,
    });
  };

  return {
    stack,
    pushToast,
    popToast,
    updateToast,
    getToast,
    clearStack,
  };
};
