/**
 * Props for the JSX component
 */

import { ToastProps } from '../Toast.types';

export interface InternalToastProps extends ToastProps {
  /**
   * Required boolean that renders the Toast and makes it visible when true.
   *
   * Note: open is not a valid prop when rendering toasts programmatically
   *
   * @default false
   */
  open: boolean;
  onClose: React.EventHandler<any>;
}
