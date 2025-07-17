import { useIdAllocator } from '@leafygreen-ui/hooks';

import { Role } from '../ProgressBar.types';

/**
 * Generates unique DOM IDs for progress bar accessibility attributes.
 *
 * @param param.role - ARIA role of the component (e.g., progressbar, meter).
 * @param [param.label] - Optional React node used to generate a corresponding label ID (e.g., for `aria-labelledby`).
 * @param [param.description] - Optional React node used to generate a corresponding description ID (e.g., for `aria-describedby`).
 * @returns An object containing:
 * - `barId`: base unique ID string for the bar element.
 * - `labelId`: derived ID string for the label, or `undefined` if no label is provided.
 * - `descId`: derived ID string for the description, or `undefined` if no description is provided.
 */
export const useIdIdentifiers = (
  role: Role,
  label?: React.ReactNode,
  description?: React.ReactNode,
): {
  barId: string;
  labelId?: string;
  descId?: string;
} => {
  const baseId = useIdAllocator({
    prefix: role,
  });

  return {
    barId: baseId,
    labelId: label ? `label-for-${baseId}` : undefined,
    descId: description ? `desc-for-${baseId}` : undefined,
  };
};
