import React, { useEffect } from 'react';
import {
  useFormStore,
  SingleSelectFieldProperties,
  InternalFieldProperties,
} from '../../formStore';
import { action } from 'mobx';
import { useSingleSelectStore } from './singleSelectStore';
import { observer } from 'mobx-react-lite';

interface SingleSelectProps
  extends Omit<SingleSelectFieldProperties, InternalFieldProperties> {
  // The name for the input
  name: string;

  // Option Definitions
  children: React.ReactNode;
}

function SingleSelectInternal({
  name,
  type = 'select',
  required = false,
  children,
  ...rest
}: SingleSelectProps) {
  const formStore = useFormStore();
  const singleSelectStore = useSingleSelectStore();

  const fieldProperties = {
    type,
    value: '',
    required,
    options: singleSelectStore.options,
    ...rest,
  };

  useEffect(
    action(() => {
      formStore.addField(name, fieldProperties);

      return action(() => {
        formStore.removeField(name);
      });
    }),
    [],
  );

  useEffect(
    action(() => {
      formStore.updateField(name, fieldProperties);
    }),
    Object.values(fieldProperties),
  );

  return children;
}

SingleSelectInternal.displayName = 'Field.SingleSelect';

export default observer(SingleSelectInternal);
