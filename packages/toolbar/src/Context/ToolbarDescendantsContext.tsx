import {
  createDescendantsContext,
  useDescendantsContext,
} from '@leafygreen-ui/descendants';

export const ToolbarDescendantsContext =
  createDescendantsContext<HTMLLIElement>('ToolbarDescendantsContext');

export function useToolbarDescendantsContext() {
  return useDescendantsContext(ToolbarDescendantsContext);
}
