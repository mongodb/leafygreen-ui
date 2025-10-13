import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-loading_spinner';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
