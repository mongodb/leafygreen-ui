import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

import { CommonTypographyProps } from '../types';

export type BaseSubtitleProps = CommonTypographyProps;

// For external consumption only
export type SubtitleProps = PolymorphicProps<PolymorphicAs, BaseSubtitleProps>;
