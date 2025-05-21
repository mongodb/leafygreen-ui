export const DEFAULT_LGID_ROOT = 'lg-drawer';
export const DEFAULT_LGID_DRAWER_TOOLBAR = 'lg-drawer-toolbar';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) =>
  ({
    root,
    closeButton: `${root}-close_button`,
  } as const);
