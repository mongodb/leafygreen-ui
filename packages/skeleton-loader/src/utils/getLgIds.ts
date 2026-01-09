import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-skeleton_loader';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    line: `${root}-line`,
    form: `${root}-form`,
    listItemWrapper: `${root}-list_item_wrapper`,
    listItem: `${root}-list_item`,
    paragraph: `${root}-paragraph`,
    paragraphHeader: `${root}-paragraph_header`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
