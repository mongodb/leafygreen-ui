import { LgIdProps } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT: LgIdProps['data-lgid'] = 'lg-modal';

export const getLgIds = (root = DEFAULT_LGID_ROOT) => {
  return {
    root,
    close: `${root}-close`,
  } as const;
};
