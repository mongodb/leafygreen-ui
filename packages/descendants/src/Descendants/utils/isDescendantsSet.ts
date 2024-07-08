import { isDefined } from '@leafygreen-ui/lib';

import { DescendantsList } from '../../Descendants';

export const isDescendantsSet = (
  descendants?: DescendantsList<any>,
): boolean => {
  return isDefined(descendants) && descendants.length > 0;
};
