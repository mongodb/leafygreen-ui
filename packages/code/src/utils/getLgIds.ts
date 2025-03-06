export const DEFAULT_LGID_ROOT = 'lg-code';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    panel: `${DEFAULT_LGID_ROOT}-panel`,
    select: `${root}-select`,
    copyButton: `${DEFAULT_LGID_ROOT}-copy_button`,
    copyTooltip: `${DEFAULT_LGID_ROOT}-copy_tooltip`,
    expandButton: `${root}-expand_button`,
    skeleton: `${root}-skeleton`,
    pre: `${root}-pre`,
    title: `${DEFAULT_LGID_ROOT}-title`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
