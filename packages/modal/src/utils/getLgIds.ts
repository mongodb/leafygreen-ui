import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-modal';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  return {
    root,
    modal: `${root}-modal`,
    close: `${root}-close`,
  } as const;
};
