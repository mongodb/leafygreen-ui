import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { ResponsiveTypographyProps } from '../types';

export type BodyFontWeight = 'regular' | 'medium';
export type BaseBodyProps = ResponsiveTypographyProps & {
  weight?: BodyFontWeight;
};

// For external consumption only
export type BodyProps = PolymorphicProps<PolymorphicAs, BaseBodyProps>;
