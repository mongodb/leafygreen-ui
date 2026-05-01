import { Size as ImportedSize } from '@leafygreen-ui/tokens';

/**
 * Forces TypeScript to fully expand the type structure,
 * avoiding references to internal (non-exported) types in declarations.
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Distributive Omit that preserves discriminated unions.
 * Standard `Omit` flattens unions; this distributes over each union member.
 * Uses `Prettify` to inline type structure and avoid declaration emit errors.
 */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Prettify<Omit<T, K>>
  : never;

/**
 * Variant options for CollectionToolbar.
 *
 * @default 'default'
 */
export const Variant = {
  Compact: 'compact',
  Default: 'default',
  Collapsible: 'collapsible',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

/**
 * Size options for CollectionToolbar.
 *
 * @default 'default'
 */
export const Size = {
  Default: ImportedSize.Default,
  Small: ImportedSize.Small,
} as const;
export type Size = (typeof Size)[keyof typeof Size];

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

/**
 * Static property names used to identify CollectionToolbarActions compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const CollectionToolbarActionsSubComponentProperty = {
  Button: 'isCollectionToolbarActionsButton',
  Pagination: 'isCollectionToolbarActionsPagination',
  Menu: 'isCollectionToolbarActionsMenu',
  MenuItem: 'isCollectionToolbarActionsMenuItem',
} as const;
export type CollectionToolbarActionsSubComponentProperty =
  (typeof CollectionToolbarActionsSubComponentProperty)[keyof typeof CollectionToolbarActionsSubComponentProperty];
