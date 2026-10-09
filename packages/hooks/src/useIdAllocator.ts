import React, { useEffect, useState } from 'react';

interface Params {
  prefix?: string;
  id?: string;
}

let globalId = 0;

// Legacy fallback for React < 18, from Material UI's useId.
// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useId.ts
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

// useId was added in React 18; look it up defensively so this typechecks
// against older React types.
const reactUseId = (React as { useId?: () => string }).useId;

export default function useIdAllocator({ prefix, id: idOverride }: Params) {
  // React 18+: useId returns a stable id synchronously during render.
  if (typeof reactUseId === 'function') {
    // useId returns `:r0:`; colons are invalid in CSS selectors.
    const reactId = reactUseId().replace(/:/g, '');

    return idOverride ?? `${prefix ?? 'lg'}-${reactId}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLegacyId({ id: idOverride, prefix });
}
