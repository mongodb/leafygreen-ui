import React from 'react';

import { Size as ImportedSize } from '@leafygreen-ui/tokens';

export const Variant = {
  Compact: 'compact',
  Default: 'default',
  Collapsible: 'collapsible',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export const Size = {
  Default: ImportedSize.Default,
  Small: ImportedSize.Small,
} as const;
export type Size = (typeof Size)[keyof typeof Size];

export interface CollectionToolbarProps {
  size?: typeof ImportedSize.Default | typeof ImportedSize.Small;
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Static property names used to identify CollectionToolbar compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const CollectionToolbarSubComponentProperty = {
  Title: 'isCollectionToolbarTitle',
  SearchInput: 'isCollectionToolbarSearchInput',
  Actions: 'isCollectionToolbarActions',
  ActionsButtons: 'isCollectionToolbarActionsButtons',
  ActionsMenu: 'isCollectionToolbarActionsMenu',
  ActionsMenuItems: 'isCollectionToolbarActionsMenuItems',
  ActionsPaginationView: 'isCollectionToolbarActionsPaginationView',
  Filters: 'isCollectionToolbarFilters',
} as const;

/**
 * Type representing the possible static property names for CollectionToolbar sub components.
 */
export type CollectionToolbarSubComponentProperty =
  (typeof CollectionToolbarSubComponentProperty)[keyof typeof CollectionToolbarSubComponentProperty];
