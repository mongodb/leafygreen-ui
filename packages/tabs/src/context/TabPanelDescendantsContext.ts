import {
  createDescendantsContext,
  useDescendantsContext,
} from '@leafygreen-ui/descendants';

export const TabPanelDescendantsContext =
  createDescendantsContext<HTMLDivElement>('TabPanelsDescendantsContext');

/**
 * Access list of tab panel descendants
 */
export function useTabPanelDescendantsContext() {
  const { descendants } = useDescendantsContext(TabPanelDescendantsContext);

  return { tabPanelDescendants: descendants };
}
