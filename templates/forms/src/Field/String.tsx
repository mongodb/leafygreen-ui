import { useEffect } from 'react';
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
  placeholder,
  validator,
  label,
  description,
  errorMessage,
  ...rest
}: StringProps) {
  const { addField, upsertField, removeField } = useFormTemplateContext();

  useEffect(() => {
    const properties: Omit<StringFieldProperties, 'name' | 'valid'> = {
      type,
      value: defaultValue,
      required,
      placeholder,
      validator,
      label,
      description,
      errorMessage,
    };

    upsertField(name, properties);
  }, [
    type,
    required,
    placeholder,
    validator,
    label,
    description,
    errorMessage,
  ]);

  // Only fires on unmount
  useEffect(() => () => removeField(name), []);

  // useEffect(() => {
  //   // TODO: Handle changing field names more gracefully.
  //   console.error('Error: Do not change the field name for "Field.String".');
  // }, [name]);

  useEffect(() => {
    console.warn(
      'Changing the defaultValue for "Field.String" after mount has no effect.',
    );
  }, [defaultValue]);

  // useEffect(() => {
  //   return () => {
  //     setFieldValue(name, {
  //       type,
  //       required,
  //       ...rest,
  //     });
  //   };
  // }, [type, required, rest]);

  // Fields are not responsible for rendering themselves.
  return null;
}

String.displayName = 'Field.String';

export default String;
