import { useEffect } from 'react';
import { useSingleSelectStore } from './singleSelectStore';
import { OptionProperties, InternalFieldProperties } from '../../formStore';
import { action } from 'mobx';

interface SingleSelectOptionProps
  extends Omit<OptionProperties, InternalFieldProperties> {
  // The name of the option
  name: string;
}

function SingleSelectOption({ name, ...rest }: SingleSelectOptionProps) {
  const singleSelectStore = useSingleSelectStore();

  useEffect(
    action(() => {
      singleSelectStore.addOption(name, { name, ...rest });

      return action(() => singleSelectStore.removeOption(name));
    }),
  );

  return null;
}

SingleSelectOption.displayName = 'Field.SingleSelect.Option';

export default SingleSelectOption;
