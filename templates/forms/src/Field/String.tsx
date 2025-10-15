import React, { useEffect } from 'react';
import { useFormTemplateContext } from '../FormTemplateContext/FormTemplateContext';
import { UniversalFieldProps } from './Field.types';
import { StringFieldProperties } from '../FormTemplateContext/FormTemplateContext.types';

interface StringProps extends UniversalFieldProps {
  required?: boolean; // Default false
  type?: StringFieldProperties['type']; // Default 'text'
  defaultValue?: string; // No default
  placeholder?: string; // No default
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

    // console.log('added input', fields);

    return () => {
      removeField(name);
      // console.log('removed input', newFields);
    };
  }, []);

  // Fields are not responsible for rendering themselves.
  return null;
}

String.displayName = 'String';

export default String;
