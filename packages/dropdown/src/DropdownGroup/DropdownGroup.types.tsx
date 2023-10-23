import {
  InferredPolymorphicPropsWithRef,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { BaseItemProps } from '../types';

export interface BaseDropdownGroupProps extends BaseItemProps {
  /*
   ** Title text for DropdownGroup
   */
  title?: string;

  /*
   ** Determines if the DropdownGroup both performs a function and opens a submenu
   */
  hasAction?: boolean;
}
export type DropdownGroupProps<T extends PolymorphicAs> =
  InferredPolymorphicPropsWithRef<T, BaseDropdownGroupProps>;
