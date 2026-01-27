import { LgIdString } from '@leafygreen-ui/lib';

import { Variant } from './shared.types';

export const MAX_FILTER_COUNT: Record<Variant, number> = {
  [Variant.Default]: 5,
  [Variant.Compact]: 3,
  [Variant.Collapsible]: 5,
} as const;

export const getMaxFilterCount = (variant: Variant) => {
  return MAX_FILTER_COUNT[variant];
}

export const DEFAULT_LGID_ROOT = 'lg-collection_toolbar';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    title: `${root}-title`,
    searchInput: `${root}-search-input`,
    actions: `${root}-actions`,
    button: `${root}-button`,
    filters: `${root}-filters`,
    pagination: `${root}-pagination`,
    menu: `${root}-menu`,
    menuItem: `${root}-menu-item`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
