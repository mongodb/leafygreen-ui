import { useEffect, useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

let serverHandoffComplete = false;
const registry: Map<string, number> = new Map();

const genId = (prefix: string) => {
  if (registry.has(prefix)) {
    const val = registry.get(prefix);
    const update = val ? val + 1 : 1;
    registry.set(prefix, update);
    return update;
  } else {
    registry.set(prefix, 1);
    return 1;
  }
};

/**
 * useIdAllocator generates a unique id based on a prefix
 * or returns an idProp if one is provided.
 */
function useIdAllocator({
  prefix,
  id: idProp,
}: {
  prefix?: string;
  id?: undefined;
}) {
  const initialId = prefix && (serverHandoffComplete ? genId(prefix) : null);

  const [id, setId] = useState(initialId);

  useIsomorphicLayoutEffect(() => {
    if (prefix && id === null) {
      setId(genId(prefix));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  }, []);

  return idProp ? idProp : `${prefix}-${id}`;
}

export default useIdAllocator;
