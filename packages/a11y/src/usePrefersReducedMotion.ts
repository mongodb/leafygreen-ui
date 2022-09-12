import { useEffect, useState } from 'react';

/**
 * Returns whether the user has `prefers-reduced-motion: reduce`
 * set in their browser.
 *
 * @returns boolean
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPreference] = useState<boolean>(false);

  const handler = (event: MediaQueryListEvent) => {
    setPreference(event.matches);
  };

  useEffect(() => {
    if (
      window &&
      window.matchMedia &&
      typeof window.matchMedia === 'function'
    ) {
      const MQ = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPreference(MQ.matches);
      MQ.addEventListener('change', handler);

      return () => MQ.removeEventListener('change', handler);
    }
  }, []);

  return prefersReducedMotion;
}
