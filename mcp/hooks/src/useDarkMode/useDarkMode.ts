import { useEffect, useState } from 'react';

/**
 * Returns whether the user has `prefers-color-scheme: dark`
 * set in their browser, or the override value if provided.
 *
 * @param override - Optional boolean to override the system preference
 * @returns boolean
 */
export function useDarkMode(override?: boolean): boolean {
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(false);

  const handler = (event: MediaQueryListEvent) => {
    setPrefersDarkMode(event.matches);
  };

  useEffect(() => {
    if (
      window &&
      window.matchMedia &&
      typeof window.matchMedia === 'function'
    ) {
      const MQ = window.matchMedia('(prefers-color-scheme: dark)');
      setPrefersDarkMode(MQ.matches);
      MQ.addEventListener('change', handler);

      return () => MQ.removeEventListener('change', handler);
    }
  }, []);

  return override ?? prefersDarkMode;
}
