import {
  createDescendantsContext,
  useDescendantsContext,
} from '@leafygreen-ui/descendants';

export const TabDescendantsContext = createDescendantsContext<HTMLDivElement>(
  'TabDescendantsContext',
);

/**
 * Access list of tab descendants
 */
export function useTabDescendantsContext() {
  const { descendants } = useDescendantsContext(TabDescendantsContext);

  return { tabDescendants: descendants };
}
