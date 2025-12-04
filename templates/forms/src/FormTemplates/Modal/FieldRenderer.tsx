import React from 'react';
import {
  isStringInput,
  isSingleSelect,
  isMultiSelect,
} from '../../Field/fieldTypeGuards';
import { ModalStringInput, ModalSingleSelectInput } from './fieldViews';
import { observer } from 'mobx-react-lite';
import { useFormStore, FieldProperties } from '../../formStore';
import { ModalFormTemplateProps } from './ModalFormTemplate.types';

interface FieldRendererProps {
  name: string;
  onChange: ModalFormTemplateProps['onChange'];
}

function FieldRenderer({ name, onChange }: FieldRendererProps) {
  const formStore = useFormStore();
  const properties = formStore.fields.get(name) ?? ({} as FieldProperties);

  if (isStringInput(properties)) {
    return <ModalStringInput name={name} onChange={onChange} />;
  } else if (isSingleSelect(properties)) {
    return <ModalSingleSelectInput name={name} onChange={onChange} />; // TODO: Handle Single Select
  } else if (isMultiSelect(properties)) {
    return null; // TODO: Handle Multi Select
  } else {
    return null;
  }
}

FieldRenderer.displayName = 'FieldRenderer';

export default observer(FieldRenderer);
