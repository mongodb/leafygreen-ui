import * as React from 'react';

interface Params {
  prefix?: string;
  id?: string;
}

let globalId = 0;

function useGlobalId({ id: idOverride, prefix }: Params): string {
  const [defaultId, setDefaultId] = React.useState(idOverride ?? 'lg-default');
  const id = idOverride || defaultId;

  React.useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`${prefix ?? 'lg'}-${globalId}`);
    }
  }, [defaultId, prefix]);

  return id;
}

// eslint-disable-next-line no-useless-concat -- Workaround for https://github.com/webpack/webpack/issues/14814
const maybeReactUseId: undefined | (() => string) = (React as any)[
  'useId' + ''
];

export default function useId({ prefix, id: idOverride }: Params): string {
  if (maybeReactUseId !== undefined) {
    const reactId = maybeReactUseId();
    return idOverride ?? reactId;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.
  return useGlobalId({ id: idOverride, prefix });
}
