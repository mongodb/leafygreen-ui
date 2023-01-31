import { useMemo } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { AccessibleFieldProps, LabelProps } from './types';

export const useLabel = ({
  label,
  id: idProp,
  'aria-labelledby': ariaLabelledby,
  'aria-label': ariaLabel,
}: LabelProps) => {
  const inputId = useIdAllocator({ prefix: 'lg-input', id: idProp });
  const labelId = useIdAllocator({ prefix: 'lg-label' });

  const labelProps = {
    id: labelId,
    htmlFor: inputId,
  };

  if (!label && !ariaLabelledby && !ariaLabel) {
    console.warn(
      'For screen-reader accessibility, label, aria-labelledby, or aria-label must be provided',
    );
  }

  const fieldProps = {
    id: inputId,
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
  'aria-describedby': ariaDescribedbyProp,
  'aria-labelledby': ariaLabelledby,
  'aria-label': ariaLabel,
  description,
  message,
  isMessageShown,
}: AccessibleFieldProps) => {
  const { labelProps, fieldProps } = useLabel({
    label,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  });

  const descriptionId = useIdAllocator({ prefix: 'lg-description' });
  const messageId = useIdAllocator({ prefix: 'lg-message' });

  const ariaDescribedby = useMemo(
    () =>
      `${description ? descriptionId : ''} ${
        message && isMessageShown ? messageId : ''
      } ${ariaDescribedbyProp ? ariaDescribedbyProp : ''}`.trim(),
    [description, message, isMessageShown, descriptionId, messageId],
  );

  return {
    labelProps,
    fieldProps: { ...fieldProps, ['aria-describedby']: ariaDescribedby },
    descriptionProps: { id: descriptionId },
    errorMessageProps: { id: messageId },
  };
};
