const Variant = {
  Success: 'success',
  Note: 'note',
  Warning: 'warning',
  Important: 'important',
  Progress: 'progress',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

export interface ToastProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  /**
   * Optional text shown in bold above the body text.
   */
  title?: React.ReactNode;

  /**
   * Required main text for the Toast.
   */
  body: React.ReactNode;

  /**
   * Optional className passed to the wrapping <div /> for the toast.
   */
  className?: string;

  /**
   * Required style variant to render the Toast as.
   *
   * @default `note`
   */
  variant?: Variant;

  /**
   * Optional number between 0 and 1 that sets the progress bar's progress. Note that the progress bar is only rendered when the Toast variant is set to `'progress'`.
   *
   * **Default:** `1`
   */
  progress?: number;

  /**
   * Optional boolean that renders the Toast and makes it visible when true.
   *
   * **Default:** `false`
   */
  open?: boolean;

  /**
   * Optional click event handler that, when set, renders a close button that receives the passed handler.
   */
  close?: React.MouseEventHandler;

  /**
   * Determines whether or not the component will be rendered in dark theme.
   *
   */
  darkMode?: boolean;
}
