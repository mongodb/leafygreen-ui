import { ActionType } from '@leafygreen-ui/input-option';
import {
  InferredPolymorphicPropsWithRef,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { BaseItemProps } from '../types';

export type DropdownItemProps<T extends PolymorphicAs> =
  InferredPolymorphicPropsWithRef<T, BaseItemProps> & {
    actionType: ActionType;
  };
