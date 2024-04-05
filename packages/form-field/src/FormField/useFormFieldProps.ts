import { useIdAllocator } from '@leafygreen-ui/hooks';

import { FormFieldProps, FormFieldState } from './FormField.types';

export interface FormFieldInputElementProps {
  id: string;
  'aria-describedby': string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
  'aria-disabled'?: boolean;
  'aria-invalid'?: FormFieldProps['aria-invalid'];
  readOnly?: boolean;
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
  disabled,
  ...rest
}: Partial<FormFieldProps>): FormFieldElementProps => {
  const labelId = useIdAllocator({ prefix: 'lg-form-field-label' });
  const descriptionId = useIdAllocator({
    prefix: 'lg-form-field-description',
  });
  const errorId = useIdAllocator({ prefix: 'lg-form-field-description' });
  const generatedInputId = useIdAllocator({ prefix: 'lg-form-field-input' });
  const inputId = id ?? generatedInputId;

  const hasError = state === FormFieldState.Error;

  const ariaLabelledby = label ? labelId : rest['aria-labelledby'];
  const ariaLabel = label || ariaLabelledby ? undefined : rest['aria-label'];
  const ariaDescribedby = `${description ? descriptionId : ''} ${
    hasError ? errorId : ''
  }`.trim();
  const ariaInvalid = rest['aria-invalid'] ?? hasError;

  const inputProps: FormFieldInputElementProps = {
    id: inputId,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-disabled': disabled,
    readOnly: disabled,
    'aria-invalid': ariaInvalid,
  };

  return {
    labelId,
    descriptionId,
    errorId,
    inputId,
    inputProps,
  };
};
