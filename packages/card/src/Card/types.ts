import { DarkModeProps } from '@leafygreen-ui/lib';
import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

/**
 * @deprecated No longer supported. We don't want card to be clickable from a root level. Use interactive elements inside the card instead.
 */
export const ContentStyle = {
  None: 'none',
  Clickable: 'clickable',
} as const;

/**
 * @deprecated No longer supported. We don't want card to be clickable from a root level. Use interactive elements inside the card instead.
 */
export type ContentStyle = (typeof ContentStyle)[keyof typeof ContentStyle];

export interface InternalCardProps extends DarkModeProps {
  /**
   * The content that will appear inside of the `<Card />` component.
   */
  children?: React.ReactNode;

  /**
   * Determines whether the Card should be styled as clickable.
   *
   * Defaults to `'clickable'` (when a valid `onClick` handler or `href` link is provided
   *
   * @default 'clickable' | 'none'
   * @deprecated No longer supported. We don't want card to be clickable from a root level. Use interactive elements inside the card instead.
   */
  contentStyle?: ContentStyle;

  /**
   * Title for the Card component.
   *
   */
  title?: string;

  /**
   * Click handler for the Card component.
   *
   * @deprecated No longer supported. We don't want card to be clickable from a root level. Use interactive elements inside the card instead.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Link for the Card component.
   *
   * @deprecated No longer supported. We don't want card to be clickable from a root level. Use interactive elements inside the card instead.
   */
  href?: string;
}

// External only
export type CardProps<TAsProp extends PolymorphicAs = 'div'> =
  InferredPolymorphicProps<TAsProp, InternalCardProps>;
