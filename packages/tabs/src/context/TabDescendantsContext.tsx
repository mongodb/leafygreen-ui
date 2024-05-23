import React from 'react';

import {
  createDescendantsContext,
  DescendantsProvider,
  useDescendant,
  useDescendantsContext,
  useInitDescendants,
} from '@leafygreen-ui/descendants';

export const TabDescendantsContext = createDescendantsContext<HTMLDivElement>(
  'TabDescendantsContext',
);

/**
 * Creates TabDescendantsContext
 * Call `useTabDescendantsContext` to access list of tab descendants
 */
export function TabDescendantsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { descendants, dispatch } = useInitDescendants<HTMLDivElement>();

  return (
    <DescendantsProvider
      context={TabDescendantsContext}
      descendants={descendants}
      dispatch={dispatch}
    >
      {children}
    </DescendantsProvider>
  );
}

/**
 * Establishes tab as a descendant
 */
export function useTabDescendant() {
  const tabDescendant = useDescendant(TabDescendantsContext);

  return {
    ...tabDescendant,
  };
}

/**
 * Access list of tab descendants
 */
export function useTabDescendantsContext() {
  const { descendants } = useDescendantsContext(TabDescendantsContext);

  return { tabDescendants: descendants };
}
