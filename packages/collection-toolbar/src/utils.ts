import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-collection_toolbar';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    title: `${root}-title`,
    actions: `${root}-actions`,
    button: `${root}-button`,
    pagination: `${root}-pagination`,
    menu: `${root}-menu`,
    menuItem: `${root}-menu-item`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
