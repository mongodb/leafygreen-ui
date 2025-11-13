import {
  createDescendantsContext,
  useDescendantsContext,
} from '@leafygreen-ui/descendants';

export const AccordionDescendantsContext =
  createDescendantsContext<HTMLDivElement>('AccordionDescendantsContext');

export function useAccordionDescendantsContext() {
  return useDescendantsContext(AccordionDescendantsContext);
}
