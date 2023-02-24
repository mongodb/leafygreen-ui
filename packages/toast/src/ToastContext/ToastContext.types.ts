import { ToastProps } from '../Toast/Toast.types';

/**
 * The type of Toast ids
 */
export type ToastId = string;

export type ToastStack = Map<ToastId, ToastProps>;
export interface ToastContextProps {
  pushToast: (payload: ToastProps) => ToastId;
  popToast: (payload: ToastId) => ToastProps | undefined;
  updateToast: (payload: {
    id: ToastId;
    props: Partial<ToastProps>;
  }) => ToastProps | undefined;
  getToast: (id: ToastId) => ToastProps | undefined;
}

/**
 * Actions available on the toast reducer
 */
export enum ToastReducerActionType {
  Push = 'push',
  Pop = 'pop',
  Update = 'update',
}

/**
 * A union combining action types with their respective payloads
 */
export type ToastReducerAction =
  | {
      type: ToastReducerActionType.Push;
      payload: {
        id: ToastId;
        props: ToastProps;
      };
    }
  | {
      type: ToastReducerActionType.Pop;
      payload: ToastId;
    }
  | {
      type: ToastReducerActionType.Update;
      payload: {
        id: ToastId;
        props: Partial<ToastProps>;
      };
    };

export interface ToastReducerState {
  stack: ToastStack;
}
