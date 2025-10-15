import React, { createContext, useCallback, useContext } from 'react';
import {
  ProviderValue,
  FieldProperties,
  FieldMap,
} from './FormTemplateContext.types';

const FormTemplateContext = createContext<ProviderValue>({
  invalidFields: [],
  fieldProperties: new Map(),
  addField: () => new Map(),
  removeField: () => new Map(),
  setFieldValue: () => new Map(),
  clearFormValues: () => new Map(),
});

export const useFormTemplateContext = () => {
  const context = useContext(FormTemplateContext);

  if (!context) {
    throw new Error(
      'useFormTemplateContext must be used within a FormTemplateProvider',
    );
  }

  return context;
};

interface FormTemplateProviderProps {
  children: React.ReactNode;
}

export const FormTemplateProvider: React.FC<FormTemplateProviderProps> = ({
  children,
}) => {
  const [fieldProperties, setFieldProperties] = React.useState<FieldMap>(
    new Map(),
  );
  const [invalidFields, setInvalidFields] = React.useState<Array<string>>([]);

  function addInvalidField(name: string) {
    if (!invalidFields.includes(name)) {
      setInvalidFields([...invalidFields, name]);
    }
  }

  function removeInvalidField(name: string) {
    if (invalidFields.includes(name)) {
      const newInvalidFields = [...invalidFields];
      const index = newInvalidFields.indexOf(name);

      if (index > -1) {
        newInvalidFields.splice(index, 1);
      }

      setInvalidFields(newInvalidFields);
    }
  }

  const providerValue: ProviderValue = {
    fieldProperties,
    invalidFields,

    addField: (name, value) => {
      console.log('addField', name, value);

      const completeFieldProperties = {
        ...value,
        valid: value.valid ?? !value.required,
      } as FieldProperties;

      if (!completeFieldProperties.valid) {
        addInvalidField(name);
      }

      const newFieldMap = new Map(fieldProperties).set(
        name,
        completeFieldProperties,
      );

      setFieldProperties(newFieldMap);

      console.log('old: ', fieldProperties);
      console.log('new: ', newFieldMap);

      return newFieldMap;
    },

    removeField: name => {
      console.log('removeField', name);

      const newFieldMap = new Map(fieldProperties);
      newFieldMap.delete(name);

      setFieldProperties(newFieldMap);
      removeInvalidField(name);

      return newFieldMap;
    },

    setFieldValue: (name, value) => {
      console.log('setFieldValue', name, value);

      const newFieldMap = new Map(fieldProperties);
      const currentFieldProperties = newFieldMap.get(name);

      if (!currentFieldProperties) {
        console.error(`Field with name ${name} does not exist`);

        return fieldProperties;
      }

      currentFieldProperties.value = value;

      const valid = currentFieldProperties.required
        ? !!currentFieldProperties.value
        : true;

      currentFieldProperties.valid = valid;

      if (!valid) {
        addInvalidField(name);
      } else {
        removeInvalidField(name);
      }

      // TODO: Add logic when validation function is supported. Must support return values of boolean | Promise<boolean>
      newFieldMap.set(name, currentFieldProperties);

      setFieldProperties(newFieldMap);

      return newFieldMap;
    },

    clearFormValues: () => {
      console.log('clearFormValues');

      const newFieldMap = new Map(fieldProperties);

      newFieldMap.forEach((properties, name) => {
        properties.value = '';
        properties.valid = !properties.required;
        newFieldMap.set(name, properties);
      });

      setFieldProperties(newFieldMap);

      return newFieldMap;
    },
  };

  return (
    <FormTemplateContext.Provider value={providerValue}>
      {children}
    </FormTemplateContext.Provider>
  );
};
