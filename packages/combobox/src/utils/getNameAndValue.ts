import { kebabCase } from './lodash';
import { ComboboxOptionProps } from '../Combobox.types';

/**
 *
 * Returns an object with properties `value` & `displayName`
 * based on the props provided
 *
 * @property value: string
 * @property displayName: string
 */
export const getNameAndValue = ({
  value: valProp,
  displayName: nameProp,
}: ComboboxOptionProps): {
  value: string;
  displayName: string;
} => {
  return {
    value: valProp ?? kebabCase(nameProp),
    displayName: nameProp ?? valProp ?? '', // TODO consider adding a prop to customize displayName => startCase(valProp),
  };
};
