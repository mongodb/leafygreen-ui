import React from 'react';
import {
  FieldDetails,
  StringFieldProperties,
} from '../../store/FormStore.types';
import { useFormStore } from '../../store/FormStoreContext';
import TextArea from '@leafygreen-ui/text-area';
import TextInput from '@leafygreen-ui/text-input';
import { spacing } from '@leafygreen-ui/tokens';
import { css } from '@leafygreen-ui/emotion';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

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

interface StringInputFieldViewProps {
  name: string;
}

function StringInputFieldView({ name }: StringInputFieldViewProps) {
  const formStore = useFormStore();
  const { type, label, value, required, description } =
    (formStore.fields.get(name) as StringFieldProperties) ?? {};

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
        onChange={action(({ target }) =>
          formStore.setFieldValue(name, target.value),
        )}
        {...sharedProps}
      />
    );
  }

  return (
    <TextInput
      type={type}
      optional={!required}
      onChange={action(({ target }) =>
        formStore.setFieldValue(name, target.value),
      )}
      {...sharedProps}
    />
  );
}

StringInputFieldView.displayName = 'StringInputFieldView';

export default observer(StringInputFieldView);
