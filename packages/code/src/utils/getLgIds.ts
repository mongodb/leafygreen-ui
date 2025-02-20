export const DEFAULT_LGID_ROOT = 'lg-code';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    panel: `${root}-panel`,
    select: `${root}-select`,
    copyButton: `${root}-copy_button`,
    copyTooltip: `${root}-copy_tooltip`,
    expandButton: `${root}-expand_button`,
    skeleton: `${root}-skeleton`,
    pre: `${root}-pre`,
    title: `${root}-title`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
