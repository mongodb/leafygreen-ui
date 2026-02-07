import { Variant } from '../../shared.types';

export const MAX_FILTER_COUNT: Record<Variant, number> = {
  [Variant.Compact]: 2,
  [Variant.Collapsible]: 5,
  [Variant.Default]: 5,
};

export const getIsFilterCountValid = (
  filterCount: number,
  variant: Variant,
) => {
  return filterCount <= MAX_FILTER_COUNT[variant];
};
