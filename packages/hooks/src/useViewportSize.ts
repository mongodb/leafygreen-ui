import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Hook to subscribe to changes in viewport size.
*/
export default function useViewportSize() {
  const [viewportSize, setViewportUpdateVal] = useState(getViewportSize);

  useEffect(() => {
    const calcResize = debounce(
      () => setViewportUpdateVal(getViewportSize()),
      100,
    );

    window.addEventListener('resize', calcResize);

    return () => window.removeEventListener('resize', calcResize);
  }, []);

  return viewportSize;
}
