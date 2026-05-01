import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-pagination';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    pageSize: `${root}-page_size`,
    navigation: `${root}-navigation`,
    summary: `${root}-summary`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
