import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const Variant = {
  Note: 'note',
  Tip: 'tip',
  Important: 'important',
  Warning: 'warning',
  Example: 'example',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

export interface CalloutProps extends HTMLElementProps<'div'> {
  /**
   * The variant of the callout that defines the icon and colors used.
   *
   * @required
   * @default `note``
   */
  variant?: Variant;

  /**
   * The title text rendered above children.
   */
  title?: string;

  // TODO: Make sure this prop generates a Storybook control.
  /**
   * The base font size of the title and text rendered in children.
   */
  baseFontSize?: BaseFontSize;
  /**
   * Determines whether or not the component will be rendered in dark mode.
   *
   */
  darkMode?: boolean;
}
