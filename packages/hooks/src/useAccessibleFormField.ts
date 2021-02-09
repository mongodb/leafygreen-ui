import { useMemo } from 'react';
import { IdAllocator } from '@leafygreen-ui/lib';

const inputIdAllocator = IdAllocator.create('input');
const labelIdAllocator = IdAllocator.create('label');

/**
 * Hook that returns two sets of props that accessibly associate a label and its respective input element
 * @param id Describes the input element
 */
const useAccessibleFormField = (idProp: string) => {
  const inputId = useMemo(() => idProp ?? inputIdAllocator.generate(), [
    idProp,
  ]);
  const labelId = useMemo(() => labelIdAllocator.generate(), []);

  const labelProps = {
    id: labelId,
    htmlFor: inputId,
  };

  const inputProps = {
    id: inputId,
    ['aria-labelledby']: labelId,
  };

  return { labelProps, inputProps };
};

export default useAccessibleFormField;
