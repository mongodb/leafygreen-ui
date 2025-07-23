import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { CommonTypographyProps } from '../types';

export type BaseErrorProps = CommonTypographyProps;

// For external consumption only
export type ErrorProps = PolymorphicProps<PolymorphicAs, BaseErrorProps>;
