import React from 'react';
import {
  FieldDetails,
  StringFieldProperties,
} from '../../FormTemplateContext/FormTemplateContext.types';
import { useFormTemplateContext } from '../../FormTemplateContext/FormTemplateContext';
import TextArea from '@leafygreen-ui/text-area';
import TextInput from '@leafygreen-ui/text-input';
import { spacing } from '@leafygreen-ui/tokens';
import { css } from '@leafygreen-ui/emotion';

const inputStyles = css`
  & + & {
    margin-top: ${spacing[600]}px;
  }
`;

function renderFieldDetails(details: FieldDetails) {
  if (!details) {
    return;
  }

  if (typeof details === 'string') {
    return details;
  }

  // TODO: Handle learn more/info sprinkle cases

  return details.displayText;
}

interface StringInputFieldViewProps extends StringFieldProperties {
  name: string;
}

export default function StringInputFieldView({
  type,
  label,
  name,
  value,
  required,
  description,
}: StringInputFieldViewProps) {
  const { setFieldValue } = useFormTemplateContext();

  const sharedProps = {
    value,
    label,
    description: description && renderFieldDetails(description),
    required,
    className: inputStyles,
  } as const;

  if (type === 'textarea') {
    return (
      <TextArea
        onChange={({ target }) => setFieldValue(name, target.value)}
        {...sharedProps}
      />
    );
  }

  return (
    <TextInput
      type={type}
      optional={!required}
      onChange={({ target }) => setFieldValue(name, target.value)}
      {...sharedProps}
    />
  );
}
