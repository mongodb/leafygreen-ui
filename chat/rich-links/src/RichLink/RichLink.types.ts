import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { RichLinkBadgeProps } from './RichLinkBadge/RichLinkBadge.types';
import { RichLinkVariantName } from './RichLinkVariants';

export interface BaseRichLinkProps extends DarkModeProps {
  /**
   * The text that shows on the rich link
   */
  text: string;

  /**
   * A URL for the background image of the rich link
   */
  imageUrl?: string;

  /**
   * The URL that the rich link navigates to
   */
  href: Required<HTMLElementProps<'a', never>>['href'];

  /**
   * Props to spread on the anchor element
   */
  anchorProps?: Omit<HTMLElementProps<'a', never>, 'children' | 'href'>;
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
