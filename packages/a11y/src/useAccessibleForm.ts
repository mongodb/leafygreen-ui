import { useIdAllocator } from '@leafygreen-ui/hooks';

/**
 * Hook that returns two sets of props that accessibly associate a label and its respective input element
 * @param id Describes the input element
 */
const useAccessibleForm = (idProp: string) => {
  const inputId = useIdAllocator({ prefix: 'lgui-input', id: idProp });
  const labelId = useIdAllocator({ prefix: 'lgui-label' });

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

export default useAccessibleForm;
