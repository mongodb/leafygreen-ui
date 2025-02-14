export const DEFAULT_LGID_ROOT = 'lg-drawer';

export const getLgIds = (root = DEFAULT_LGID_ROOT) => ({
  root,
  closeButton: `${root}-close_button`,
});
