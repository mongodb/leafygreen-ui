export const DEFAULT_LGID_ROOT = 'lg-tabs';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    tabList: `${root}-tab_list`,
    tabPanels: `${root}-tab_panels`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
