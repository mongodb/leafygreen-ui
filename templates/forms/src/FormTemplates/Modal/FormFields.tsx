import React from 'react';
import { observer } from 'mobx-react-lite';
import { useFormStore } from '../../store/FormStoreContext';
import FieldRenderer from './FieldRenderer';

function FormFields() {
  const { fields } = useFormStore();

  // By converting fields.keys to an array, then mapping over it to return FieldRenderer,
  // FormFields will re-render only when fields Map keys change (field added/removed), rather
  // than on every field property update, isolating updates to a small subset of the form.
  return Array.from(fields.keys()).map(name => (
    <FieldRenderer key={name} name={name} />
  ));
}

FormFields.displayName = 'FormFields';

export default observer(FormFields);
