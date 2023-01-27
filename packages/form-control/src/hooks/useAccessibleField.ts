import { useMemo } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { AccessibleFieldProps,LabelProps } from './types';

export const useLabel = ({
  label,
  id: idProp,
  'aria-labelledby': ariaLabelledby,
  'aria-label': ariaLabel,
}: LabelProps) => {
  const id = useIdAllocator({ prefix: 'lg-input', id: idProp });
  const labelId = useIdAllocator({ prefix: 'lg-label' });

  const labelProps = {
    id: labelId,
    htmlFor: id,
  };

  if (!label && !ariaLabelledby && !ariaLabel) {
    console.warn(
      'For screen-reader accessibility, label, aria-labelledby, or aria-label must be provided',
    );
  }

  const fieldProps = {
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby
      ? `${ariaLabelledby} ${labelId}`
      : labelId,
  };

  return {
    labelProps,
    fieldProps,
  };
};

export const useAccessibleField = ({
  label,
  id,
  'aria-labelledby': ariaLabelledby,
  'aria-label': ariaLabel,
  description,
  errorMessage,
  validationState,
}: AccessibleFieldProps) => {
  const { labelProps, fieldProps } = useLabel({
    label,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  });

  const descriptionId = useIdAllocator({ prefix: 'lg-description' });
  const errorMessageId = useIdAllocator({ prefix: 'lg-errorMessage' });

  const ariaDescribedby = useMemo(
    () =>
      `${description ? descriptionId : ''} ${
        errorMessage && validationState === 'error' ? errorMessageId : ''
      }`.trim(),
    [description, errorMessage, validationState, descriptionId, errorMessageId],
  );

  return {
    labelProps,
    fieldProps: { ...fieldProps, ['aria-describedby']: ariaDescribedby },
    descriptionProps: { id: descriptionId },
    errorMessageProps: { id: errorMessageId },
  };
};
