import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { CardProps as ICardProps } from './types';

export { Card } from './Card';
export { ContentStyle } from './types';

// For external consumption only
export type CardProps<T extends PolymorphicAs = PolymorphicAs> =
  InferredPolymorphicProps<T, ICardProps>;
