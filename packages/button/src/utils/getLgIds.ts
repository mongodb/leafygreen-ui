import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-button';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  return {
    root,
  } as const;
};
