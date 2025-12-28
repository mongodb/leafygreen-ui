import { CollectionToolbarProps } from '../CollectionToolbar.types';

export interface CollectionToolbarActionsProps
  extends Pick<CollectionToolbarProps, 'children' | 'variant' | 'className'> {}

export const CollectionToolbarActionsSubComponentProperty = {
  Button: 'isCollectionToolbarActionsButton',
  Menu: 'isCollectionToolbarActionsMenu',
  MenuItems: 'isCollectionToolbarActionsMenuItems',
  PaginationView: 'isCollectionToolbarActionsPaginationView',
} as const;

export type CollectionToolbarActionsSubComponentProperty =
  (typeof CollectionToolbarActionsSubComponentProperty)[keyof typeof CollectionToolbarActionsSubComponentProperty];
