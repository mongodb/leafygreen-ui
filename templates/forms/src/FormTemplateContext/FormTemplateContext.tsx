import React, { createContext, useCallback, useContext } from 'react';
import { ProviderValue, FieldProperties } from './FormTemplateContext.types';
import { isStringInput } from '../Field/fieldTypeGuards';

const FormTemplateContext = createContext<ProviderValue>({
  fields: {
    invalidFields: [],
    fieldProperties: new Map(),
  },
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
  const [fields, setFields] = React.useState<ProviderValue['fields']>({
    fieldProperties: new Map(),
    invalidFields: [],
  });

  // Returns an array that omits the string that's passed to the function
  function removeStringFromArray(str: string, arr: Array<string>) {
    const newArray = [...arr];
    const index = newArray.indexOf(str);

    if (index > -1) {
      newArray.splice(index, 1);
    }

    return newArray;
  }

  const providerValue: ProviderValue = {
    fields,

    addField: (name, properties) => {
      // console.log('addField', name, properties);

      setFields(current => {
        const completeFieldProperties = {
          ...properties, // TODO: Handle default values here
          valid: properties.valid ?? !properties.required,
        } as FieldProperties;

        current.fieldProperties.set(name, completeFieldProperties);

        const newInvalidFields = [...current.invalidFields];

        if (!completeFieldProperties.valid) {
          newInvalidFields.push(name);
        }

        return {
          fieldProperties: current.fieldProperties,
          invalidFields: newInvalidFields,
        };
      });
    },

    removeField: name => {
      // console.log('removeField', name);

      setFields(current => {
        const newInvalidFields = removeStringFromArray(
          name,
          current.invalidFields,
        );

        current.fieldProperties.delete(name);

        return {
          fieldProperties: current.fieldProperties,
          invalidFields: newInvalidFields,
        };
      });
    },

    setFieldValue: (name, value) => {
      // console.log('setFieldValue', name, value);

      setFields(current => {
        const currentFieldProperties = current.fieldProperties.get(name);

        if (!currentFieldProperties) {
          console.error(`Field with name ${name} does not exist`);

          return current;
        }

        currentFieldProperties.value = value;

        // TODO: Add logic when validation function is supported. Must support return values of boolean | Promise<boolean>
        const valid = currentFieldProperties.required
          ? !!currentFieldProperties.value
          : true;

        let newInvalidFields = [...current.invalidFields];

        if (!valid && !newInvalidFields.includes(name)) {
          newInvalidFields.push(name);
        } else {
          newInvalidFields = removeStringFromArray(name, newInvalidFields);
        }

        currentFieldProperties.valid = valid;

        current.fieldProperties.set(name, currentFieldProperties);

        return {
          fieldProperties: current.fieldProperties,
          invalidFields: newInvalidFields,
        };
      });
    },

    clearFormValues: () => {
      console.log('clearFormValues');

      const newInvalidFields: Array<string> = [];

      setFields(current => {
        current.fieldProperties.forEach((properties, name) => {
          // Need to add type guard here to be able to reference .defaultValue
          if (isStringInput(properties)) {
            properties.value = properties.defaultValue || '';
          } else {
            properties.value = '';
          }
          properties.valid = !properties.required;

          if (!properties.valid) {
            newInvalidFields.push(name);
          }

          current.fieldProperties.set(name, properties);
        });

        return {
          fieldProperties: current.fieldProperties,
          invalidFields: newInvalidFields,
        };
      });
    },
  };

  return (
    <FormTemplateContext.Provider value={providerValue}>
      {children}
    </FormTemplateContext.Provider>
  );
};
