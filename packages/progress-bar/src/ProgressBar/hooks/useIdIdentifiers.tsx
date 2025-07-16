import { useIdAllocator } from '@leafygreen-ui/hooks';

import { Role } from '../ProgressBar.types';

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
