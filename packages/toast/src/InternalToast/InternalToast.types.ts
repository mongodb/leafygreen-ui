/**
 * Props for the JSX component
 */

import { ToastProps } from '../Toast.types';

export interface InternalToastProps extends ToastProps {
  /**
   * defines whether the component is controlled
   */
  isControlled?: boolean;
}
