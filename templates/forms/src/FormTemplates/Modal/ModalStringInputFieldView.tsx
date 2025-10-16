import React from 'react';
import { StringFieldProperties } from '../../FormTemplateContext/FormTemplateContext.types';
import { useFormTemplateContext } from '../../FormTemplateContext/FormTemplateContext';
import TextInput from '@leafygreen-ui/text-input';
import { spacing } from '@leafygreen-ui/tokens';
import { css } from '@leafygreen-ui/emotion';

const inputStyles = css`
  & + & {
    margin-top: ${spacing[600]}px;
  }
`;

interface StringInputFieldViewProps extends StringFieldProperties {
  name: string;
}

export default function StringInputFieldView({
  type,
  label,
  name,
  value,
  required,
}: StringInputFieldViewProps) {
  const { setFieldValue } = useFormTemplateContext();

  if (type === 'textarea') {
    return null; // TODO: Implement TextArea component
  }

  return (
    <TextInput
      type={type}
      label={label}
      value={value}
      required={required}
      optional={!required}
      className={inputStyles}
      onChange={({ target }) => setFieldValue(name, target.value)}
    />
  );
}
