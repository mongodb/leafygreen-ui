import { useIdAllocator } from '@leafygreen-ui/hooks';

import { Role } from '../ProgressBar.types';

interface UseIdIdentifiersParams {
  /** ARIA role of the component (e.g., progressbar, meter). */
  role: Role;
  /** Optional label for the progress bar. */
  label?: React.ReactNode;
  /** Optional description for the progress bar. */
  description?: React.ReactNode;
}

interface UseIdIdentifiersReturnType {
  /** Unique ID for the progress bar element. */
  barId: string;
  /** Optional ID for the label element, or undefined if no label is provided. */
  labelId?: string;
  /** Optional ID for the description element, or undefined if no description is provided. */
  descId?: string;
}

/**
 * Generates unique DOM IDs for progress bar accessibility attributes.
 */
export const useIdIdentifiers = ({
  role,
  label,
  description,
}: UseIdIdentifiersParams): UseIdIdentifiersReturnType => {
  const baseId = useIdAllocator({
    prefix: role,
  });

  return {
    barId: baseId,
    labelId: label ? `label-for-${baseId}` : undefined,
    descId: description ? `desc-for-${baseId}` : undefined,
  };
};
