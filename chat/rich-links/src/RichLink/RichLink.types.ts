import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { RichLinkBadgeProps } from './RichLinkBadge/RichLinkBadge.types';
import { RichLinkVariantName } from './RichLinkVariants';

export interface BaseRichLinkProps
  extends Omit<HTMLElementProps<'a', never>, 'href'>,
    DarkModeProps {
  /**
   * The text that shows on the rich link
   */
  text: string;

  /**
   * A URL for the background image of the rich link
   */
  imageUrl?: string;

  href: Required<HTMLElementProps<'a', never>>['href'];
}

export interface RichLinkVariantControlProps {
  /**
   * The variant of the rich link. This uses a pre-defined badge and sets styles for a known link type.
   */
  variant: RichLinkVariantName;
}

export interface RichLinkBadgeControlProps {
  /**
   * The glyph of the badge
   */
  badgeGlyph: RichLinkBadgeProps['glyph'];

  /**
   * The label of the badge
   */
  badgeLabel: RichLinkBadgeProps['label'];

  /**
   * The variant of the badge. This determines its background, text, and icon color.
   */
  badgeVariant?: RichLinkBadgeProps['variant'];
}

export type RichLinkWithVariantProps = BaseRichLinkProps &
  RichLinkVariantControlProps;

export type RichLinkWithBadgeProps = BaseRichLinkProps &
  RichLinkBadgeControlProps;

export type RichLinkProps =
  | BaseRichLinkProps
  | RichLinkWithVariantProps
  | RichLinkWithBadgeProps;
