import React from 'react';
import {
  isStringInput,
  isSingleSelect,
  isMultiSelect,
} from '../../Field/fieldTypeGuards';
import StringInputFieldView from './ModalStringInputFieldView';
import { observer } from 'mobx-react-lite';
import { useFormStore } from '../../store/FormStoreContext';
import { FieldProperties } from '../../store/FormStore.types';

function FieldRenderer({ name }: { name: string }) {
  const formStore = useFormStore();
  const properties = formStore.fields.get(name) ?? ({} as FieldProperties);

  if (isStringInput(properties)) {
    return <StringInputFieldView name={name} />;
  } else if (isSingleSelect(properties)) {
    return null; // TODO: Handle Single Select
  } else if (isMultiSelect(properties)) {
    return null; // TODO: Handle Multi Select
  } else {
    return null;
  }
}

FieldRenderer.displayName = 'FieldRenderer';

export default observer(FieldRenderer);
