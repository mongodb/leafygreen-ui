export const DEFAULT_LGID_ROOT = 'lg-table';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    cell: `${root}-cell`,
    row: `${root}-row`,
    header: `${root}-header`,
    selectAllCheckbox: `${root}-select_all`,
    checkbox: `${root}-checkbox`,
    sortIcon: `${root}-sort_button`,
    expandButton: `${root}-expand_button`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
