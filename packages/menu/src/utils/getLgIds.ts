export const DEFAULT_LGID_ROOT = 'lg-menu';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    item: `${root}-menu_item`,
    submenu: `${root}-submenu`,
    submenuToggle: `${root}-submenu_toggle`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
