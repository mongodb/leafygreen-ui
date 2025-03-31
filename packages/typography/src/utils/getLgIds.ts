export const DEFAULT_LGID_ROOT = 'lg-typography';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    label: `${root}-label`,
    description: `${root}-description`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
