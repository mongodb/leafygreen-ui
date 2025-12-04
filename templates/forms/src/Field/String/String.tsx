import { useEffect } from 'react';
import {
  useFormStore,
  StringFieldProperties,
  InternalFieldProperties,
} from '../../formStore';
import { action } from 'mobx';

export interface StringProps
  extends Omit<StringFieldProperties, InternalFieldProperties> {
  // The name for the input
  name: string;
}

function String({
  name,
  type = 'text',
  defaultValue = '',
  ...rest
}: StringProps) {
  const formStore = useFormStore();

  const fieldProperties: Omit<StringFieldProperties, 'valid'> = {
    type,
    value: defaultValue,
    ...rest,
  };

  // Effect to add to store on mount, remove from store on unmount
  useEffect(
    action(() => {
      formStore.addField(name, fieldProperties);

      return action(() => formStore.removeField(name));
    }),
    [],
  );

  useEffect(
    action(() => {
      formStore.updateField(name, fieldProperties);
    }),
    Object.values(fieldProperties),
  );

  return null;
}

String.displayName = 'Field.String';

export default String;
