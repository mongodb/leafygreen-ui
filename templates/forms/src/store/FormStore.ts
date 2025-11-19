import { observable, action, computed } from 'mobx';
import {
  ValidatorFunction,
  FieldProperties,
  FieldMap,
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

export default class FormStore {
  @observable fields: FieldMap = observable.map(new Map(), {});
  @observable invalidFields: Set<string> = observable.set(new Set());
  @observable isLoading: boolean = false;

  @action addField(
    name: string,
    properties: Omit<FieldProperties, 'valid'> & { valid?: boolean },
  ) {
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
  }

  @action removeField(name: string) {
    this.fields.delete(name);
  }

  @action updateField(
    name: string,
    newProperties: Partial<
      Omit<FieldProperties, 'valid'> & { valid?: boolean }
    >,
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
  }

  @action setFieldValue(name: string, value: any) {
    this.updateField(name, { value });
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
