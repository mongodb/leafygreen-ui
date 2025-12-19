import {
  ButtonProps,
  Size,
  Variant as ButtonVariant,
} from '@leafygreen-ui/button';

export { Size };

export const Variant = {
  Default: ButtonVariant.Default,
  Primary: ButtonVariant.Primary,
  BaseGreen: ButtonVariant.BaseGreen,
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export type ChatButtonProps = Omit<
  Exclude<ButtonProps<'button'>, { href: string }>,
  'as' | 'leftGlyph' | 'rightGlyph'
> & {
  /**
   * Sets the variant for the ChatButton
   *
   * @default "default"
   */
  variant?: Variant;
};
