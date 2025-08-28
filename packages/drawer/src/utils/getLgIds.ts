import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-drawer';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) =>
  ({
    root,
    closeButton: `${root}-close_button`,
    scrollContainer: `${root}-scroll_container`,
    toolbar: `${root}-toolbar`,
  } as const);
