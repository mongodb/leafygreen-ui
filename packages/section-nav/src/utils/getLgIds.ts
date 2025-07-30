import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-section_nav';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) =>
  ({
    root,
    title: `${root}-title`,
    item: `${root}-item`,
  } as const);

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
