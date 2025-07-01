export const DEFAULT_LGID_ROOT = 'lg-section-nav';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) =>
  ({
    root,
    title: `${root}-title`,
    item: `${root}-item`,
  } as const);

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
