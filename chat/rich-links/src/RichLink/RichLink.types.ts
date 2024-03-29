import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { Variant as RichLinkBadgeVariantName } from './RichLinkBadge/RichLinkBadge.types';
import { RichLinkVariantName } from './RichLinkVariants';

export interface BaseRichLinkProps
  extends HTMLElementProps<'a', HTMLAnchorElement>,
    DarkModeProps {
  /**
   * The URL that the rich link points to
   */
  url: string;

  /**
   * The text that shows on the rich link
   */
  text: string;

  /**
   * A URL for the background image of the rich link
   */
  imageUrl?: string;

  /**
   * Props to be spread on the anchor element
   */
  anchorProps?: Pick<JSX.IntrinsicElements['a'], 'target' | 'rel'>;
}

export type RichLinkProps = BaseRichLinkProps &
  (RichLinkBadgeControlProps | RichLinkVariantControlProps);

export interface RichLinkBadgeControlProps {
  /**
   * The glyph of the badge
   */
  badgeGlyph: string;

  /**
   * The label of the badge
   */
  badgeLabel: string;

  /**
   * The variant of the badge. This determines its background, text, and icon color.
   */
  badgeVariant?: RichLinkBadgeVariantName;
}

export interface RichLinkVariantControlProps {
  /**
   * The variant of the rich link. This determines its background color.
   */
  variant: RichLinkVariantName;
}
