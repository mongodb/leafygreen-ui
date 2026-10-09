import React, { useEffect, useState } from 'react';

interface Params {
  prefix?: string;
  id?: string;
}

let globalId = 0;

/**
 * Legacy id allocator, based on Material UI's useId hook.
 * Deferred to a `useEffect`, which under React 18's concurrent scheduler
 * can commit an `undefined` id to the DOM before the re-render lands.
 * Only used when `React.useId` is unavailable (React < 18).
 * https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useId.ts
 */
function useLegacyId({ id: idOverride, prefix }: Params): string {
  const [defaultId, setDefaultId] = useState<string | number | undefined>(
    idOverride,
  );

  useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(globalId);
    }
  }, [defaultId, prefix]);

  return idOverride ? idOverride : `${prefix ?? 'lg'}-${defaultId}`;
}

export default function useIdAllocator({ prefix, id: idOverride }: Params) {
  // `React.useId` generates a unique, stable id synchronously during render
  // (and during SSR), avoiding the deferred-effect bug above.
  // The check is constant for a given React version, so hook order is stable.
  if (typeof React.useId === 'function') {
    // React's ids look like `:r0:` — valid as an HTML id, but invalid as an
    // unescaped CSS selector — so strip the colons.
    const reactId = React.useId().replace(/:/g, '');

    return idOverride ?? `${prefix ?? 'lg'}-${reactId}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLegacyId({ id: idOverride, prefix });
}
