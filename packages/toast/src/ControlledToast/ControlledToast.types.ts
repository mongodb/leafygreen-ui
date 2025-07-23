/**
 * Props for the JSX component
 */

import { ToastProps } from '../Toast.types';

type ToastCloseEvent = React.SyntheticEvent<HTMLDivElement, Event>;

export interface ControlledToastProps extends ToastProps {
  /**
   * Required boolean that renders the Toast and makes it visible when true.
   *
   * Note: open is not a valid prop when rendering toasts programmatically
   *
   * @default false
   */
  open: boolean;

  /**
   * An event handler fired when the close button is clicked, or when the timeout has elapsed.
   * Highly recommended when using a controlled Toast.
   *
   * When called via close button click, `event.type` will be `"click"`;
   * When called via timeout, `event.type` will be `"timeout"`
   */
  onClose?: React.EventHandler<ToastCloseEvent>;
}
