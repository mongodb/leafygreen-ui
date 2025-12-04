import React, { useCallback } from 'react';
import { useFormStore, StringFieldProperties } from '../../../formStore';
import TextArea from '@leafygreen-ui/text-area';
import TextInput from '@leafygreen-ui/text-input';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import renderFieldDescription from './renderFieldDescription';
import { ModalFormTemplateProps } from '../ModalFormTemplate.types';

interface StringInputFieldViewProps {
  name: string;
  onChange: ModalFormTemplateProps['onChange'];
}

function StringInputFieldView({ name, onChange }: StringInputFieldViewProps) {
  const formStore = useFormStore();
  const { value } = formStore.fieldValues[name];
  const { type, label, required, description } =
    (formStore.fields.get(name) as StringFieldProperties) ?? {};

  const sharedProps = {
    value,
    label,
    description: description && renderFieldDescription(description),
    required,
    onChange: action(
      (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        formStore.updateField(name, { value: event.target?.value ?? '' });

        onChange?.(formStore.fieldValues, event);
      },
    ),
  } as const;

  if (type === 'textarea') {
    return <TextArea {...sharedProps} />;
  }

  return <TextInput type={type} optional={!required} {...sharedProps} />;
}

StringInputFieldView.displayName = 'StringInputFieldView';

export default observer(StringInputFieldView);
