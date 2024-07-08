import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { RichLinkBadgeProps } from './RichLinkBadge/RichLinkBadge.types';
import { RichLinkVariantName } from './RichLinkVariants';

export interface BaseRichLinkProps
  extends DarkModeProps,
    HTMLElementProps<'a', never> {
  /**
   * The text that shows on the rich link
   */
  children: string;

  /**
   * A URL for the background image of the rich link
   */
  imageUrl?: string;
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
  badgeColor?: RichLinkBadgeProps['color'];
}

export type RichLinkWithVariantProps = BaseRichLinkProps &
  RichLinkVariantControlProps;

export type RichLinkWithBadgeProps = BaseRichLinkProps &
  RichLinkBadgeControlProps;

export type RichLinkProps =
  | BaseRichLinkProps
  | RichLinkWithVariantProps
  | RichLinkWithBadgeProps;
