const LGID_ROOT = 'lg-table';

export const LGIDS = {
  root: LGID_ROOT,
  cell: `${LGID_ROOT}-cell`,
  row: `${LGID_ROOT}-row`,
  header: `${LGID_ROOT}-header`,
  selectAllCheckbox: `${LGID_ROOT}-select_all`,
  sortIcon: `${LGID_ROOT}-sort_button`,
} as const;
