import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { ResponsiveTypographyProps } from '../types';

const ArrowAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;

type ArrowAppearance = (typeof ArrowAppearance)[keyof typeof ArrowAppearance];

export { ArrowAppearance };

export interface BaseLinkProps extends ResponsiveTypographyProps {
  /**
   * Determines the variant of the link arrow to provide feedforward for how the link wil behave
   */
  arrowAppearance?: ArrowAppearance;
  /**
   * The external icon will be hidden if true
   */
  hideExternalIcon?: boolean;
  /**
   * Determines if the Link should be inherit font size from the parent
   */
  inline?: boolean;
}

// For external consumption only
export type LinkProps<T extends PolymorphicAs = PolymorphicAs> =
  InferredPolymorphicProps<T, BaseLinkProps>;
