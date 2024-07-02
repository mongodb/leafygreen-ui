import { DescendantsList } from '@leafygreen-ui/descendants';
import { isDefined } from '@leafygreen-ui/lib';

export const isDescendantsSet = (
  descendants?: DescendantsList<any>,
): boolean => {
  return isDefined(descendants) && descendants.length > 0;
};
