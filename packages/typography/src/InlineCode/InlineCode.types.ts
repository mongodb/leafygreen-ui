import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { ResponsiveTypographyProps } from '../types';

export type BaseInlineCodeProps = ResponsiveTypographyProps;

// For external consumption only
export type InlineCodeProps<T extends PolymorphicAs = PolymorphicAs> =
  InferredPolymorphicProps<T, BaseInlineCodeProps>;
