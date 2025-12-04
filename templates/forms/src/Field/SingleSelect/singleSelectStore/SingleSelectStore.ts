import { observable, action } from 'mobx';
import { OptionProperties } from '../../../formStore';
import { OptionMap } from './SingleSelectStore.types';

export default class SingleSelectStore {
  @observable options: OptionMap = observable.map(new Map(), {});
  @observable invalidFields: Set<string> = observable.set(new Set());
  @observable isLoading: boolean = false;

  @action addOption(name: string, properties: OptionProperties) {
    this.options.set(name, properties);
    // console.log(this.options, name, properties);
  }

  @action removeOption(name: string) {
    this.options.delete(name);
  }

  @action updateOption(name: string, newProperties: Partial<OptionProperties>) {
    const currentFieldProperties = this.options.get(name);

    if (!currentFieldProperties) {
      console.warn(
        `Attempted to update field "${name}" that does not exist in the form.`,
      );

      return;
    }

    this.options.set(
      name,
      Object.assign({}, currentFieldProperties, newProperties),
    );
  }
}
