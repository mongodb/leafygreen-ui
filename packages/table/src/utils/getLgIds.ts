import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-table';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    cell: `${root}-cell`,
    row: `${root}-row`,
    headerRow: `${root}-header_row`,
    headerCell: `${root}-header_cell`,
    header: `${root}-header`, // TODO: deprecate all usage of lgIds.header in favor of headerCell
    selectAllCheckbox: `${root}-select_all`,
    checkbox: `${root}-checkbox`,
    sortIcon: `${root}-sort_button`,
    expandButton: `${root}-expand_button`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
