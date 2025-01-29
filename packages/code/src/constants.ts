export const numOfCollapsedLinesOfCode = 5;

const LGID_ROOT = 'lg-code';

export const LGIDs = {
  root: LGID_ROOT,
  panel: `${LGID_ROOT}-panel`,
  select: `${LGID_ROOT}-select`,
  copyButton: `${LGID_ROOT}-copy_button`,
  copyTooltip: `${LGID_ROOT}-copy_tooltip`,
  expandButton: `${LGID_ROOT}-expand_button`,
} as const;
