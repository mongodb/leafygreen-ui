import {
  createDescendantsContext,
  useDescendantsContext,
} from '@leafygreen-ui/descendants';

export const OrderedListContext =
  createDescendantsContext<HTMLLIElement>('OrderedListContext');

export function useOrderedListContext() {
  return useDescendantsContext(OrderedListContext);
}
