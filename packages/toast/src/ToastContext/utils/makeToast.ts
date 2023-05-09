import { ToastProps } from '../../Toast.types';
import { ToastStack, ToastWithId } from '../ToastContext.types';

import { generateToastId } from './generateToastId';

/**
 * Adds a generated `id` prop to toast props
 * @internal
 */
export function makeToast(props: ToastProps): ToastWithId {
  const id = generateToastId();

  return {
    id,
    ...props,
  } as ToastWithId;
}

/**
 * Converts an array of toasts into a toast stack
 * @internal
 */
export function makeToastStack(toasts: Array<ToastWithId>): ToastStack {
  const stack: ToastStack = new Map();

  toasts.forEach(toast => {
    const { id, ...props } = toast;
    stack.set(id, props);
  });

  return stack;
}
