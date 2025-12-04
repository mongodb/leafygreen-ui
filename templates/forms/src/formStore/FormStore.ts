import { observable, action, computed } from 'mobx';
import {
  ValidatorFunction,
  FieldProperties,
  FieldMap,
  StringFieldProperties,
  SingleSelectFieldProperties,
  MultiSelectFieldProperties,
  FieldValues,
  InvalidFieldSet,
} from './FormStore.types';

function fieldIsValid<T = any>(
  value: T,
  required: boolean = false,
  validator?: ValidatorFunction,
): boolean {
  // TODO: Support returning Promise<boolean>
  if (!value && required) {
    return false;
  }

  if (value && validator && typeof validator === 'function') {
    return validator(value);
  }

  return true;
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type FieldPropertiesWithOptionalValid =
  | PartialBy<StringFieldProperties, 'valid'>
  | PartialBy<SingleSelectFieldProperties, 'valid'>
  | PartialBy<MultiSelectFieldProperties, 'valid'>;

export default class FormStore {
  /**
   * FormStore.fields stores the order and properties of each field in the form.
   */
  @observable fields: FieldMap = observable.map(new Map(), {});

  /**
   * FormStore.invalidFields stores the name of all fields that are invalid in the form.
   */
  @observable invalidFields: Set<string> = observable.set(new Set());

  /**
   * FormStore.fieldValues stores the name of each field, and its current value for
   * onChange, validation, and submission handlers.
   */
  @observable fieldValues: FieldValues = observable.object({});

  /**
   * FormStore.isLoading represents whether or not the form as a whole is loading.
   * This may need to be changed down the line to reference whether specific fields are loading.
   */
  @observable isLoading: boolean = false;

  @action addField(name: string, properties: FieldPropertiesWithOptionalValid) {
    const { required, value } = properties;
    const valid = required ? !!value : true;

    if (!valid) {
      this.invalidFields.add(name);
    }

    const completeFieldProperties = {
      ...properties,
      valid,
    } as FieldProperties;

    this.fields.set(name, completeFieldProperties);
    this.fieldValues[name] = value;
  }

  @action removeField(name: string) {
    this.fields.delete(name);
    delete this.fieldValues[name];
  }

  @action updateField(
    name: string,
    newProperties: Partial<FieldPropertiesWithOptionalValid>,
  ) {
    const currentFieldProperties = this.fields.get(name);

    if (!currentFieldProperties) {
      console.warn(
        `Attempted to update field "${name}" that does not exist in the form.`,
      );

      return;
    }

    const { required, validator } = currentFieldProperties;
    const value = newProperties.value ?? currentFieldProperties.value;
    const valid = fieldIsValid(value, required, validator);

    if (!valid) {
      this.invalidFields.add(name);
    } else {
      this.invalidFields.delete(name);
    }

    this.fields.set(
      name,
      Object.assign({}, currentFieldProperties, newProperties, {
        value,
        valid,
      }),
    );

    if (value !== this.fieldValues[name]) {
      this.fieldValues[name] = value;
    }
  }

  @action resetFields() {
    this.invalidFields.clear();

    this.fields.forEach((properties, name) => {
      const valid = fieldIsValid(
        properties.defaultValue,
        properties.required,
        properties.validator,
      );

      if (!valid) {
        this.invalidFields.add(name);
      }

      this.fields.set(name, {
        ...properties,
        value: properties.defaultValue ?? '',
        valid,
      });
    });
  }

  @computed get isValid() {
    return !this.invalidFields.size;
  }
}
