import { useIdAllocator } from '@leafygreen-ui/hooks';

import { LGIDS_FORM_FIELD } from '../constants';

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
  feedbackId: string;
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
  const labelId = useIdAllocator({ prefix: LGIDS_FORM_FIELD.label });
  const descriptionId = useIdAllocator({
    prefix: LGIDS_FORM_FIELD.description,
  });
  const feedbackId = useIdAllocator({ prefix: LGIDS_FORM_FIELD.feedback });
  const generatedInputId = useIdAllocator({ prefix: LGIDS_FORM_FIELD.input });
  const inputId = id ?? generatedInputId;

  const hasError = state === FormFieldState.Error;
  const hasFeedback = state !== FormFieldState.None;

  const ariaLabelledby = label ? labelId : rest['aria-labelledby'];
  const ariaLabel = label || ariaLabelledby ? undefined : rest['aria-label'];
  const ariaDescribedby = `${description ? descriptionId : ''} ${
    hasFeedback ? feedbackId : ''
  }`.trim();
  const ariaInvalid = rest['aria-invalid'] ?? hasError;

  const inputProps: FormFieldInputElementProps = {
    id: inputId,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-disabled': disabled,
    readOnly: rest.readOnly ? rest.readOnly : disabled,
    'aria-invalid': ariaInvalid,
  };

  return {
    labelId,
    descriptionId,
    feedbackId,
    inputId,
    inputProps,
  };
};
