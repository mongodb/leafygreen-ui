import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { CommonTypographyProps } from '../types';

export type BaseH1Props = CommonTypographyProps;

// For external consumption only
export type H1Props = PolymorphicProps<PolymorphicAs, BaseH1Props>;
