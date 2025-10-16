import React, { useEffect } from 'react';
import { useFormTemplateContext } from '../FormTemplateContext/FormTemplateContext';
import {
  StringFieldProperties,
  InternalFieldProperties,
} from '../FormTemplateContext/FormTemplateContext.types';

interface StringProps
  extends Omit<StringFieldProperties, InternalFieldProperties> {
  // The name for the input
  name: string;
}

function String({
  name,
  type = 'text',
  required = false,
  defaultValue = '',
  ...rest
}: StringProps) {
  const { addField, removeField } = useFormTemplateContext();

  useEffect(() => {
    addField(name, {
      type,
      value: defaultValue,
      required,
      ...rest,
    });

    return () => {
      removeField(name);
    };
  }, []);

  // Fields are not responsible for rendering themselves.
  return null;
}

String.displayName = 'String';

export default String;
