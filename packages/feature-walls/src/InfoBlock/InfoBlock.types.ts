import { BadgeProps } from '@leafygreen-ui/badge';
import { ButtonProps } from '@leafygreen-ui/button';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

type BadgePropsOmittingVariant = Omit<BadgeProps, 'variant'>;

export const Variant = {
  Card: 'card',
  Icon: 'icon',
  Image: 'image',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export interface BaseInfoBlockProps
  extends HTMLElementProps<'div'>,
    DarkModeProps {
  /**
   * Sets the variant of the InfoBlock which determines component UI:
   * - `card`: `media` and text will render in a joint card, and a badge will render above the `label`
   * - `icon`: `media` will render above the text, and badges will not render
   * - `image`: `media` will render above the text, and badges will render below the `description`
   *
   * @default 'card'
   */
  variant?: Variant;

  /**
   * Optional element, typically an image, icon, or illustration, that renders above the text
   */
  media?: React.ReactElement;

  /**
   * Required label text
   */
  label: string;

  /**
   * Optional description text that renders below the label
   */
  description?: React.ReactNode;

  /**
   * An optional object that accepts all `Button` props.
   *
   * darkMode is handled internally so you do not have to pass the `darkMode` prop.
   */
  buttonProps?: ButtonProps;
}

export interface CardInfoBlockProps extends BaseInfoBlockProps {
  /** With this variant, `media` and text will render in a joint card, and badges will render above the label */
  variant: 'card';

  /**
   * An object that accepts all badge props for customizing badge
   */
  badgeProps?: BadgePropsOmittingVariant;

  /** Not used in this variant */
  badgePropsArray?: never;
}

export interface IconInfoBlockProps extends BaseInfoBlockProps {
  /** With this variant, `media` will render above the text, and badges will not render */
  variant: 'icon';

  /** Not used in this variant */
  badgeProps?: never;

  /** Not used in this variant */
  badgePropsArray?: never;
}

export interface ImageInfoBlockProps extends BaseInfoBlockProps {
  /** With this variant, `media` will render above the text, and badges will render below the description */
  variant: 'image';

  /** Not used in this variant */
  badgeProps?: never;

  /**
   * An array of objects that accept all badge props for customizing badges
   */
  badgePropsArray?: Array<BadgePropsOmittingVariant>;
}

export type InfoBlockProps =
  | CardInfoBlockProps
  | IconInfoBlockProps
  | ImageInfoBlockProps;
