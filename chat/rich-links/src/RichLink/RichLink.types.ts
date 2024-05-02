import { GlyphName } from '@leafygreen-ui/icon/src/glyphs';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { Variant as RichLinkBadgeVariantName } from './RichLinkBadge/RichLinkBadge.types';
import { RichLinkVariantName } from './RichLinkVariants';

export interface BaseRichLinkProps
  extends HTMLElementProps<'a', never>,
    DarkModeProps {
  /**
   * The text that shows on the rich link
   */
  text: string;

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
  badgeGlyph: GlyphName;

  /**
   * The label of the badge
   */
  badgeLabel: string;

  /**
   * The variant of the badge. This determines its background, text, and icon color.
   */
  badgeVariant?: RichLinkBadgeVariantName;
}

export type RichLinkWithVariantProps = BaseRichLinkProps &
  RichLinkVariantControlProps;

export type RichLinkWithBadgeProps = BaseRichLinkProps &
  RichLinkBadgeControlProps;

export type RichLinkProps =
  | BaseRichLinkProps
  | RichLinkWithVariantProps
  | RichLinkWithBadgeProps;
