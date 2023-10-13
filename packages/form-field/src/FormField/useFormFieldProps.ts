import { useIdAllocator } from '@leafygreen-ui/hooks';

import { FormFieldProps, FormFieldState } from './FormField.types';

export interface FormFieldInputElementProps {
  id: string;
  'aria-describedby': string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
}

export interface FormFieldElementProps {
  labelId: string;
  descriptionId: string;
  errorId: string;
  inputId: string;
  inputProps: FormFieldInputElementProps;
}

export const useFormFieldProps = ({
  label,
  description,
  state,
  id,
  ...rest
}: Partial<FormFieldProps>): FormFieldElementProps => {
  const labelId = useIdAllocator({ prefix: 'lg-form-field-label' });
  const descriptionId = useIdAllocator({
    prefix: 'lg-form-field-description',
  });
  const errorId = useIdAllocator({ prefix: 'lg-form-field-description' });
  const generatedInputId = useIdAllocator({ prefix: 'lg-form-field-input' });
  const inputId = id ?? generatedInputId;

  const ariaLabelledby = label ? labelId : rest['aria-labelledby'];
  const ariaLabel = label ? '' : rest['aria-label'];
  const describedBy = `${description ? descriptionId : ''} ${
    state === FormFieldState.Error ? errorId : ''
  }`.trim();

  const inputProps: FormFieldInputElementProps = {
    id: inputId,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': describedBy,
    'aria-label': ariaLabel,
  };

  return {
    labelId,
    descriptionId,
    errorId,
    inputId,
    inputProps,
  };
};
