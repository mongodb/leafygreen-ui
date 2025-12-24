import { ComponentPropsWithRef } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

import { Size, Variant } from '../shared.types';

export interface CollectionToolbarProps
  extends ComponentPropsWithRef<'div'>,
    DarkModeProps,
    LgIdProps {
  /**
   * The size of the CollectionToolbar and it's sub-components.
   *
   * @default `'default'`
   */
  size?: typeof Size.Default | typeof Size.Small;
  /**
   * The variant of the CollectionToolbar. Determines the layout of the CollectionToolbar.
   *
   * @default `'default'`
   */
  variant?: Variant;
}

/**
 * Static property names used to identify CollectionToolbar compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const CollectionToolbarSubComponentProperty = {
  Title: 'isCollectionToolbarTitle',
  SearchInput: 'isCollectionToolbarSearchInput',
  Actions: 'isCollectionToolbarActions',
  Filters: 'isCollectionToolbarFilters',
} as const;

/**
 * Type representing the possible static property names for CollectionToolbar sub components.
 */
export type CollectionToolbarSubComponentProperty =
  (typeof CollectionToolbarSubComponentProperty)[keyof typeof CollectionToolbarSubComponentProperty];
