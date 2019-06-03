import { useEffect, useState } from 'react';

function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Hook to subscribe to changes in viewport size.
 */
const useViewportSize = () => {
  const [viewportSize, setViewportUpdateVal] = useState(getViewportSize);

  useEffect(() => {
    const calcResize = () => setViewportUpdateVal(getViewportSize());

    window.addEventListener('resize', calcResize);

    return () => window.removeEventListener('resize', calcResize);
  }, []);

  return viewportSize;
};

export default useViewportSize;
