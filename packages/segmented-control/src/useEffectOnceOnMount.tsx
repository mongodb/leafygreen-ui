import { useEffect, useRef } from 'react';

/**
 * Runs an effect on the first render only
 * @param effect
 */
export function useEffectOnceOnMount(effect: React.EffectCallback): void {
  const didComponentMount = useRef(false);

  useEffect(() => {
    if (!didComponentMount.current) {
      didComponentMount.current = true;
      effect();
    }
  }, [effect]);
}
