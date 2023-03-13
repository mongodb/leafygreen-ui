import { shortStackCount } from '../../../constants';
import { ToastProps } from '../../../Toast.types';
import { ToastId, ToastStack } from '../../ToastContext.types';

/**
 * Returns 2 arrays from the original toast stack.
 * `recentToasts`: The 3 most recent toasts, and
 * `remainingToasts`: the remaining N toasts
 */
export function getDividedStack(stack: ToastStack): {
  recentToasts: Array<[string, ToastProps]>;
  remainingToasts: Array<[string, ToastProps]>;
} {
  return Array.from(stack).reduce(
    (acc, toast, i) => {
      if (stack.size <= shortStackCount || i >= stack.size - shortStackCount) {
        acc.recentToasts.push(toast);
      } else {
        acc.remainingToasts.push(toast);
      }

      return acc;
    },
    {
      recentToasts: [] as Array<[ToastId, ToastProps]>,
      remainingToasts: [] as Array<[ToastId, ToastProps]>,
    },
  );
}
