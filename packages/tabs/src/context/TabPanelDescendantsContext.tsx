import React from 'react';

import {
  createDescendantsContext,
  DescendantsProvider,
  useDescendant,
  useDescendantsContext,
  useInitDescendants,
} from '@leafygreen-ui/descendants';

export const TabPanelDescendantsContext =
  createDescendantsContext<HTMLDivElement>('TabPanelsDescendantsContext');

/**
 * Creates TabPanelDescendantsContext
 * Call `useTabPanelDescendantsContext` to access list of tab panel descendants
 */
export function TabPanelDescendantsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { descendants, dispatch } = useInitDescendants<HTMLDivElement>();

  return (
    <DescendantsProvider
      context={TabPanelDescendantsContext}
      descendants={descendants}
      dispatch={dispatch}
    >
      {children}
    </DescendantsProvider>
  );
}

/**
 * Establishes tab panel as a descendant
 */
export function useTabPanelDescendant() {
  const tabDescendant = useDescendant(TabPanelDescendantsContext);

  return {
    ...tabDescendant,
  };
}

/**
 * Access list of tab panel descendants
 */
export function useTabPanelDescendantsContext() {
  const { descendants } = useDescendantsContext(TabPanelDescendantsContext);

  return { tabPanelDescendants: descendants };
}
