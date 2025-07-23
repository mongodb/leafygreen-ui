import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { CommonTypographyProps } from '../types';

export type BaseH2Props = CommonTypographyProps;

// For external consumption only
export type H2Props = PolymorphicProps<PolymorphicAs, BaseH2Props>;
