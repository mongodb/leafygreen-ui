import { useCallback, useState } from 'react';

/**
 * Hook that forces a re-render.
 */
export function useForceRerender(): () => void {
  const [, updateState] = useState<Object>({});
  const forceRerender = useCallback(() => updateState({}), []);

  return forceRerender;
}
