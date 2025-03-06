export const DEFAULT_LGID_ROOT = 'lg-modal';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  return {
    root,
    close: `${root}-close`,
  } as const;
};
