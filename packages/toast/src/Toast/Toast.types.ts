import { DarkModeProps } from '@leafygreen-ui/lib';

const Variant = {
  Success: 'success',
  Note: 'note',
  Warning: 'warning',
  Important: 'important',
  Progress: 'progress',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

export interface ToastProps
  extends DarkModeProps,
    Omit<React.ComponentProps<'div'>, 'title'> {
  /**
   * Primary text of the Toast
   */
  title: React.ReactNode;

  /**
   * Additional body text
   */
  description?: React.ReactNode;

  /**
   * Determines whether the Toast is rendered
   *
   * @default false
   */
  open?: boolean;

  /**
   * Click event handler fired when the close button
   */
  onClose?: React.MouseEventHandler;

  /**
   * Determines whether the close button is rendered
   */
  dismissible?: boolean;

  /**
   * Required style variant to render the Toast as.
   *
   * @default `note`
   */
  variant?: Variant;

  /**
   * Number between 0 and 1 that sets the progress bar's progress. Note that the progress bar is only rendered when the Toast variant is set to `'progress'`.
   *
   * @default 1
   */
  progress?: number;
}
