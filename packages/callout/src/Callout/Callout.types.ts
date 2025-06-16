import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const Variant = {
  Note: 'note',
  Tip: 'tip',
  Important: 'important',
  Warning: 'warning',
  Example: 'example',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export interface CalloutProps extends HTMLElementProps<'div'>, DarkModeProps {
  /**
   * The variant of the callout that defines the icon and colors used.
   *
   * @default `note``
   */
  variant?: Variant;

  /**
   * The title text rendered above children.
   */
  title?: string;

  /**
   * The base font size of the title and text rendered in children.
   */
  baseFontSize?: BaseFontSize;
}
