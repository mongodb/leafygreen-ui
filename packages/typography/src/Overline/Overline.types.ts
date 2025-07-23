import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { CommonTypographyProps } from '../types';

export type BaseOverlineProps = CommonTypographyProps;

// For external consumption only
export type OverlineProps = PolymorphicProps<PolymorphicAs, BaseOverlineProps>;
