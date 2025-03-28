export const DEFAULT_LGID_ROOT = 'lg-checkbox';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
