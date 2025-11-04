import React, { createContext, useCallback, useContext } from 'react';
import { ProviderValue, FieldProperties } from './FormTemplateContext.types';
import { isStringInput } from '../Field/fieldTypeGuards';
import { isPromise } from '../utils/typeGuards';
import { ValidatorFunction } from './FormTemplateContext.types';
import { isEqual } from 'lodash';

const FormTemplateContext = createContext<ProviderValue>({
  fields: {
    invalidFields: [],
    fieldProperties: new Map(),
  },
  addField: () => {},
  removeField: () => {},
  setFieldValue: () => {},
  clearFormValues: () => {},
  upsertField: () => {},
  updateField: () => {},
});

export function useFormTemplateContext() {
  const context = useContext(FormTemplateContext);

  if (!context) {
    throw new Error(
      'useFormTemplateContext must be used within a FormTemplateProvider.',
    );
  }

  return context;
}

function fieldIsValid<T = any>(
  value: T,
  required: boolean = false,
  validator?: ValidatorFunction,
): boolean | Promise<boolean> {
  if (!value && required) {
    return false;
  }

  if (value && validator && typeof validator === 'function') {
    return validator(value);
  }

  return true;
}

// Returns an array that omits the string that's passed to the function
function removeStringFromArray(str: string, arr: Array<string>) {
  const newArray = [...arr];
  const index = newArray.indexOf(str);

  if (index > -1) {
    newArray.splice(index, 1);
  }

  return newArray;
}

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

  const providerValue: ProviderValue = {
    fields,

    // Updates the full field. Does not modify the value of the field if it already exists.
    upsertField: (name, properties) => {
      if (fields.fieldProperties.get(name)) {
        providerValue.updateField(name, properties);
      } else {
        // Field does not exist, add it
        providerValue.addField(name, properties);
      }
    },

    addField: (name, properties) => {
      const { required, value } = properties;
      const completeFieldProperties = {
        ...properties,
        valid: required ? !!value : true,
      } as FieldProperties;

      setFields(current => {
        current.fieldProperties.set(name, completeFieldProperties);

        const newInvalidFields = [...current.invalidFields];

        if (
          !completeFieldProperties.valid &&
          !newInvalidFields.includes(name)
        ) {
          newInvalidFields.push(name);
        }

        return {
          fieldProperties: current.fieldProperties,
          invalidFields: newInvalidFields,
        };
      });
    },

    removeField: name => {
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

    // Sets the value of an existing field and updates its validity.
    updateField: (name, properties) => {
      const currentFieldProperties = fields.fieldProperties.get(name);

      if (!currentFieldProperties) {
        console.error(`Field with name ${name} does not exist`);
        return;
      }

      const { required, validator } = currentFieldProperties;
      const newValue =
        properties.value != null
          ? properties.value
          : currentFieldProperties.value;
      const isValid = fieldIsValid(newValue, required, validator);

      function getNewFields(current: ProviderValue['fields'], valid: boolean) {
        const completeFieldProperties = {
          ...currentFieldProperties,
          value: newValue,
          valid: isValid,
        } as FieldProperties;

        current.fieldProperties.set(name, completeFieldProperties);

        let newInvalidFields = [...current.invalidFields];

        if (
          !completeFieldProperties.valid &&
          !newInvalidFields.includes(name)
        ) {
          newInvalidFields.push(name);
        } else if (
          completeFieldProperties.valid &&
          newInvalidFields.includes(name)
        ) {
          newInvalidFields = removeStringFromArray(name, newInvalidFields);
        }

        return {
          fieldProperties: current.fieldProperties,
          invalidFields: newInvalidFields,
        };
      }

      if (isPromise(isValid)) {
        setFields(current => getNewFields(current, false));

        isValid.then((res: boolean) => {
          setFields(current => getNewFields(current, res));
        });
      } else {
        setFields(current => getNewFields(current, isValid));
      }
    },

    setFieldValue: (name, newValue) => {
      const currentFieldProperties = fields.fieldProperties.get(name);

      if (!currentFieldProperties) {
        console.error(`Field with name ${name} does not exist`);

        setFields(current => ({
          fieldProperties: current.fieldProperties,
          invalidFields: current.invalidFields,
        }));

        return;
      }

      console.log(newValue);

      providerValue.updateField(name, {
        ...currentFieldProperties,
        value: newValue,
      } as FieldProperties);
    },

    clearFormValues: () => {
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
