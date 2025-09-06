import {
  InferredPolymorphicPropsWithRef,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { ResponsiveTypographyProps } from '../../types';

export type BaseBackLinkProps = ResponsiveTypographyProps;

// For external consumption only
export type BackLinkProps<T extends PolymorphicAs = PolymorphicAs> =
  InferredPolymorphicPropsWithRef<T, BaseBackLinkProps>;
