import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import useSsrCheck from './useSsrCheck';

interface ViewportSize {
  width: number;
  height: number;
}

function getViewportSize(): ViewportSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function useViewportSize(): ViewportSize | null {
  const isSsr = useSsrCheck();

  const [viewportSize, setViewportUpdateVal] = useState<ViewportSize | null>(
    isSsr ? null : getViewportSize(), // window undefined on server
  );

  useEffect(() => {
    const calcResize = debounce(
      () => setViewportUpdateVal(getViewportSize()),
      100,
    );

    // useEffect callback only runs on client, so safe to assume window is defined here
    window.addEventListener('resize', calcResize);
    return () => window.removeEventListener('resize', calcResize);
  }, []);

  return viewportSize;
}
