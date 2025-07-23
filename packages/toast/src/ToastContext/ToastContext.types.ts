import { ToastProps } from '../Toast.types';

/**
 * The type of Toast ids
 */
export type ToastId = string;

export type ToastStack = Map<ToastId, ToastProps>;

export interface ToastWithId extends ToastProps {
  id: ToastId;
}
export interface ToastContextProps {
  pushToast: (payload: ToastProps) => ToastId;
  popToast: (payload: ToastId) => ToastProps | undefined;
  updateToast: (
    id: ToastId,
    props: Partial<ToastProps>,
  ) => ToastProps | undefined;
  getToast: (id: ToastId) => ToastProps | undefined;
  getStack: () => ToastStack | undefined;
  clearStack: () => void;
}

/**
 * Actions available on the toast reducer
 */
export enum ToastReducerActionType {
  Push = 'push',
  Pop = 'pop',
  Update = 'update',
  Clear = 'clear',
}

/**
 * A union combining action types with their respective payloads
 */
export type ToastReducerAction =
  | {
      type: ToastReducerActionType.Push;
      payload: ToastWithId;
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
    }
  | {
      type: ToastReducerActionType.Clear;
    };

export interface ToastReducerState {
  stack: ToastStack;
}

export interface ToastProviderProps {
  /**
   * The initial toasts in the stack.
   */
  initialValue?: ToastStack;

  /**
   * Class name applied to the containing Portal component
   */
  portalClassName?: string;
}
