import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

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
  // const [viewportSize, setViewportUpdateVal] = useState<ViewportSize | null>(
  //   null,
  // );

  const [viewportSize, setViewportUpdateVal] = useState<ViewportSize>(
    getViewportSize(),
  );

  useEffect(() => {
    // setViewportUpdateVal(getViewportSize());

    const calcResize = debounce(
      () => setViewportUpdateVal(getViewportSize()),
      100,
    );

    window.addEventListener('resize', calcResize);

    return () => window.removeEventListener('resize', calcResize);
  }, []);

  console.log('INNER');
  return viewportSize;
}
