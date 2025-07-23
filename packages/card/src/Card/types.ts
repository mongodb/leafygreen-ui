import { DarkModeProps } from '@leafygreen-ui/lib';
import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

export const ContentStyle = {
  None: 'none',
  Clickable: 'clickable',
} as const;

export type ContentStyle = (typeof ContentStyle)[keyof typeof ContentStyle];

export interface InternalCardProps extends DarkModeProps {
  /**
   * Determines whether the Card should be styled as clickable.
   *
   * Defaults to `'clickable'` (when a valid `onClick` handler or `href` link is provided
   *
   * @default 'clickable' | 'none'
   */
  contentStyle?: ContentStyle;

  /**
   * Title for the Card component.
   *
   */
  title?: string;
}

// External only
export type CardProps<TAsProp extends PolymorphicAs = 'div'> =
  InferredPolymorphicProps<TAsProp, InternalCardProps>;
