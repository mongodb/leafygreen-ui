import React from 'react';
import { useFormStore, SingleSelectFieldProperties } from '../../../formStore';
import { Select, Option, SelectProps } from '@leafygreen-ui/select';
import { observer } from 'mobx-react-lite';
import renderFieldDescription from './renderFieldDescription';
import { action } from 'mobx';
import { ModalFormTemplateProps } from '../ModalFormTemplate.types';

interface ModalSingleSelectInputFieldViewProps {
  name: string;
  onChange: ModalFormTemplateProps['onChange'];
}

function ModalSingleSelectInputFieldView({
  name,
  onChange,
}: ModalSingleSelectInputFieldViewProps) {
  const formStore = useFormStore();
  const { value } = formStore.fieldValues[name];
  const { type, label, required, description, options } =
    (formStore.fields.get(name) as SingleSelectFieldProperties) ?? {};

  if (!options.size) {
    console.error('No options available to render.');
    return null;
  }

  const onChangeHandler: SelectProps['onChange'] = action(
    (
      fieldValue: string,
      event: React.MouseEvent | KeyboardEvent | React.KeyboardEvent,
    ) => {
      formStore.updateField(name, { value: fieldValue });

      onChange?.(formStore.fieldValues, event);
    },
  );

  const renderedOptions = Array.from(options).map(
    ([optionName, optionProperties]) => {
      return (
        <Option
          key={optionName}
          value={optionName}
          description={optionProperties.description}
        >
          {optionProperties.label}
        </Option>
      );
    },
  );

  return (
    <Select
      label={label}
      description={description && renderFieldDescription(description)}
      value={value}
      onChange={onChangeHandler}
      // required={required} // TODO: Deal with Select not supporting required later.
    >
      {renderedOptions}
    </Select>
  );
}

ModalSingleSelectInputFieldView.displayName = 'ModalSingleSelectInputFieldView';

export default observer(ModalSingleSelectInputFieldView);
