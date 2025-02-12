import React, { useEffect, useRef, useState } from 'react';

interface UseScrollShadowTopReturnObj {
  /**
   * Boolean indicating whether the shadow at the top of the scroll container is visible
   */
  hasShadowTop: boolean;

  /**
   * Ref to be attached to the scroll container
   */
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Custom hook to manage the visibility of a shadow at the top of a scrollable container.
 *
 * This hook provides a reference to a scrollable container and a boolean state indicating
 * whether the shadow at the top of the container should be visible. The shadow becomes
 * visible when the container is scrolled down from the top.
 */
export const useScrollShadowTop = (): UseScrollShadowTopReturnObj => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasShadowTop, setHasShadowTop] = useState(false);

  useEffect(() => {
    const scrollContainerEl = scrollContainerRef.current;
    if (!scrollContainerEl) return;

    const handleScroll = () => {
      setHasShadowTop(scrollContainerEl.scrollTop > 0);
    };

    scrollContainerEl.addEventListener('scroll', handleScroll);
    return () => scrollContainerEl.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, setHasShadowTop]);

  return {
    scrollContainerRef,
    hasShadowTop,
  };
};
