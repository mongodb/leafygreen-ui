import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';
import { FontWeight } from '@leafygreen-ui/tokens';

import { ResponsiveTypographyProps } from '../types';

export type BaseBodyProps = ResponsiveTypographyProps & {
  weight?: FontWeight;
};

// For external consumption only
export type BodyProps = PolymorphicProps<PolymorphicAs, BaseBodyProps>;
