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

type ArrowAppearance = typeof ArrowAppearance[keyof typeof ArrowAppearance];

export { ArrowAppearance };

export interface BaseLinkProps extends ResponsiveTypographyProps {
  arrowAppearance?: ArrowAppearance;
  hideExternalIcon?: boolean;
}

// For external consumption only
export type LinkProps<T extends PolymorphicAs = PolymorphicAs> =
  InferredPolymorphicProps<T, BaseLinkProps>;
