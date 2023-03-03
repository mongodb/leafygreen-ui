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
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * Primary text for the toast
   */
  title: React.ReactNode;

  /**
   * Additional body text
   */
  description?: React.ReactNode;

  /**
   * Fired either when the close button is clicked, or when timeout has elapsed.
   *
   * You can detect the reason for close by looking at `e.target` or `e.type`
   * (TODO: exact event type & target TBD)
   */
  onClose?: React.EventHandler<any>;

  /**
   * Optional action button (only rendered if variant==='progress')
   *
   * This should be a shortcut only—and not the _only_ way to perform the action.
   *
   * The provided action element should have an `aria-description` attribute
   * that describes how to alternatively perform the action
   */
  action?: React.ReactNode;

  /**
   * Required style variant to render the Toast as.
   *
   * Progress variants will ignore the `timeout` prop
   *
   * @default `note`
   */
  variant?: Variant;

  /**
   * Optional number between 0 and 1 that sets the progress bar's progress.
   *
   * Note: the progress bar is only rendered when the Toast variant is set to `'progress'`.
   */
  progress?: number;

  /**
   * Dismiss the Toast after `timeout` milliseconds
   *
   * If timeout is `null | 0`, the Toast will never dismiss automatically.
   *
   * Note: Timeout timer will be paused when a user is interacting with a Toast
   *
   * @default 6_000
   */
  timeout?: number | null;
  /**
   * Determines whether to render the close button.
   *
   * If `timeout === null`, then `dismissible` is forced to `true`
   *
   * @default true
   */
  dismissible?: boolean;

  /**
   * Whether the toast has been rendered with the context
   * or the controolled JSX component
   */
  isControlled?: boolean;
}
