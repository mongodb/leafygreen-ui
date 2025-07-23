import { ToastId, ToastStack } from '../ToastContext.types';

/**
 * Generates a pseudo-random unique toast id
 *
 * Guaranteed to be unique to all toasts in the stack.
 * (Note: There's a possibility that an `id` _could_ be reused after a toast has been popped from the stack)
 *
 * @internal
 */
export const generateToastId = (map?: ToastStack): ToastId => {
  let id: ToastId;

  do {
    id = 'toast-' + (Math.random() * 10_000).toFixed(0).padStart(4, '0');
  } while (map?.has(id));

  return id;
};
