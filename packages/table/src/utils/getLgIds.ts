import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-table';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    cell: `${root}-cell`,
    row: `${root}-row`,
    headerCell: `${root}-header_cell`,
    headerRow: `${root}-header_row`,
    header: `${root}-header`, // deprecating in favor of headerRow
    selectAllCheckbox: `${root}-select_all`,
    checkbox: `${root}-checkbox`,
    sortIcon: `${root}-sort_button`,
    expandButton: `${root}-expand_button`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
