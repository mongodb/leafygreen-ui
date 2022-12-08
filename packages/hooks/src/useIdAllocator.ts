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
 * Generates an SSR-compatible unique id based on a prefix string and an optional idProp parameter.
 * @param options {prefix: string; id: string;}
 * @param options.prefix string that prefixes the generated id
 * @param options.id string that represents an already-created id
 */
function useIdAllocator({
  prefix,
  id: idProp,
}: {
  prefix?: string;
  id?: string;
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
