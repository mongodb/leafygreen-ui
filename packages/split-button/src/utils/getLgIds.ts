export const DEFAULT_LGID_ROOT = 'lg-split_button';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    button: `${root}-button`,
    menu: `${root}-menu`,
    trigger: `${root}-trigger`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
