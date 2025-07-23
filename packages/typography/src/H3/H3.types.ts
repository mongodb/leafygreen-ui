import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { CommonTypographyProps } from '../types';

export type BaseH3Props = CommonTypographyProps;

// For external consumption only
export type H3Props = PolymorphicProps<PolymorphicAs, BaseH3Props>;
