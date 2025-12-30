export const CollectionToolbarActionsSubComponentProperty = {
  Button: 'isCollectionToolbarActionsButton',
  Menu: 'isCollectionToolbarActionsMenu',
  MenuItems: 'isCollectionToolbarActionsMenuItems',
  PaginationView: 'isCollectionToolbarActionsPaginationView',
} as const;

export type CollectionToolbarActionsSubComponentProperty =
  (typeof CollectionToolbarActionsSubComponentProperty)[keyof typeof CollectionToolbarActionsSubComponentProperty];
