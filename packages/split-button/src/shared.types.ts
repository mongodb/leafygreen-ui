import { ReactElement } from 'react';

import { type MenuItemProps } from '@leafygreen-ui/menu';
import {
  type InferredPolymorphicProps,
  type PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

export type MenuItemType = ReactElement<
  InferredPolymorphicProps<PolymorphicAs, MenuItemProps>
>;

/**
 * Static property names used to identify SplitButton compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const SplitButtonSubcomponentProperty = {
  MenuItem: 'isSplitButtonMenuItem',
} as const;

/**
 * Type representing the possible static property names for SplitButton subcomponents.
 */
export type SplitButtonSubcomponentProperty =
  (typeof SplitButtonSubcomponentProperty)[keyof typeof SplitButtonSubcomponentProperty];
