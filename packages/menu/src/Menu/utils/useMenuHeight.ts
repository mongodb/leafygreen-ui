import { useMemo } from 'react';
import isUndefined from 'lodash/isUndefined';

import { useAvailableSpace } from '@leafygreen-ui/hooks';

interface MenuHeightArgs {
  refEl: React.RefObject<HTMLElement>;
  spacing: number;
  maxHeight: number;
}

export const useMenuHeight = ({
  refEl,
  spacing,
  maxHeight,
}: MenuHeightArgs) => {
  const availableSpace = useAvailableSpace(refEl, spacing);

  const memoizedAvailableSpace = useMemo(
    () => availableSpace,
    [availableSpace],
  );
  const maxMenuHeightValue = !isUndefined(memoizedAvailableSpace)
    ? `${Math.min(memoizedAvailableSpace, maxHeight)}px`
    : 'unset';
  return maxMenuHeightValue;
};
