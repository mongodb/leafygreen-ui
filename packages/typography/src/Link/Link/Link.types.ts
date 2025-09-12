import {
  InferredPolymorphicPropsWithRef,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { ResponsiveTypographyProps } from '../../types';

const ArrowAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;

type ArrowAppearance = (typeof ArrowAppearance)[keyof typeof ArrowAppearance];

export { ArrowAppearance };

export interface BaseLinkProps extends ResponsiveTypographyProps {
  /**
   * Displays a right arrow adjacent to the anchor tag. When set to `persist` the arrow will always be present. When set to `hover`, the arrow will only appear when hovering over the arrow.
   */
  arrowAppearance?: ArrowAppearance;
  /**
   * Hides the external icon when the current host name is different from the host of the destination URL
   */
  hideExternalIcon?: boolean;
}

// For external consumption only
export type LinkProps<T extends PolymorphicAs = PolymorphicAs> =
  InferredPolymorphicPropsWithRef<T, BaseLinkProps>;
