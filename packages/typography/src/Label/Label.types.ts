import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { ResponsiveTypographyProps } from '../types';

export type BaseLabelProps = ResponsiveTypographyProps & {
  htmlFor: string;
  disabled?: boolean;
};

// For external consumption only
export type LabelProps = PolymorphicProps<PolymorphicAs, BaseLabelProps>;
