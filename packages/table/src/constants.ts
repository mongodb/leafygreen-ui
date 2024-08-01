const LGID_ROOT = 'lg-table';

export const LGIDS = {
  root: LGID_ROOT,
  cell: `${LGID_ROOT}-cell`,
  row: `${LGID_ROOT}-row`,
  header: `${LGID_ROOT}-header`,
  selectAllCheckbox: `${LGID_ROOT}-select_all`,
  checkbox: `${LGID_ROOT}-checkbox`,
  sortIcon: `${LGID_ROOT}-sort_button`,
  expandButton: `${LGID_ROOT}-expand_button`,
} as const;
