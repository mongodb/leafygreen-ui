/**
 * Props for the JSX component
 */

import { ToastProps } from '../Toast.types';

export interface InternalToastProps extends ToastProps {
  /**
   * defines whether the component is controlled
   *
   * @internal
   */
  isControlled?: boolean;

  /**
   * The index of the toast (from the top)
   */
  index?: number;

  /**
   * Whether the toast container is hovered (or being interacted with)
   */
  isHovered?: boolean;
}
