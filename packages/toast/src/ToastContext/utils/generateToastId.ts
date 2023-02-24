import { ToastId, ToastStack } from '../ToastContext.types';

/**
 * Generates a pseudo-random unique toast id
 *
 * Guaranteed to be unique to all toasts in the stack.
 * An id could be reused after a toast is popped from the stack
 */
export const generateToastId = (map?: ToastStack): ToastId => {
  let id: ToastId;

  do {
    id = 'toast-' + (Math.random() * 10_000).toFixed(0).padStart(4, '0');
  } while (map?.has(id));

  return id;
};
