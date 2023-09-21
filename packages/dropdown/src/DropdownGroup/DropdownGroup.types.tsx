import {
  InferredPolymorphicPropsWithRef,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { BaseItemProps } from '../types';

export interface BaseDropdownGroupProps extends BaseItemProps {
  title?: string;
}
export type DropdownGroupProps<T extends PolymorphicAs> =
  InferredPolymorphicPropsWithRef<T, BaseDropdownGroupProps>;
