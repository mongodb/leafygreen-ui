import { useMemo } from 'react';
import { isUndefined } from 'lodash';

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
  // This hook causes a second re-render on initial load. `useAvailableSpace` uses `useViewportSize` internally, which has internal state that causes re-renders.
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
