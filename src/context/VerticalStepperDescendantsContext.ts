import {
  createDescendantsContext,
  useDescendantsContext,
} from '@leafygreen-ui/descendants';

export const VerticalStepperDescendantsContext =
  createDescendantsContext<HTMLLIElement>('VerticalStepperDescendantsContext');

export function useVerticalStepperDescendantsContext() {
  return useDescendantsContext(VerticalStepperDescendantsContext);
}
