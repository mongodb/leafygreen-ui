import {
  InferredPolymorphicProps,
  PolymorphicAs,
  PolymorphicPropsWithRef,
} from '@leafygreen-ui/polymorphic';

import { ButtonProps } from '../types';

export type ButtonPolymorphicProps = PolymorphicPropsWithRef<
  PolymorphicAs,
  InferredPolymorphicProps<ButtonProps>
>;
