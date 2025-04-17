export const DEFAULT_LGID_ROOT = 'lg-toolbar';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    iconButton: `${DEFAULT_LGID_ROOT}-icon_button`,
    tooltip: `${DEFAULT_LGID_ROOT}-tooltip`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
