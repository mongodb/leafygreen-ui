export const DEFAULT_LGID_ROOT = 'lg-button';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  return {
    root,
  } as const;
};
