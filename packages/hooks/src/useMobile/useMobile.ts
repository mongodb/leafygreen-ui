import { breakpoints } from '@leafygreen-ui/tokens';

import useViewportSize from '../useViewportSize';

/**
 * Returns whether the viewport is mobile-sized
 */
export const useMobile = () => {
  const viewport = useViewportSize();

  const isMobileSize = viewport?.width
    ? viewport.width <= breakpoints.Tablet
    : false;

  return {
    isMobileSize,
  };
};
