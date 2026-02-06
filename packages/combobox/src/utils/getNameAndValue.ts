import kebabCase from 'lodash/kebabCase';

import { ComboboxOptionProps } from '../ComboboxOption';

/**
 *
 * Returns an object with properties `value` & `displayName`
 * based on the props provided
 *
 * @property value: string
 * @property displayName: string
 * @internal
 */
export const getNameAndValue = ({
  value: valProp,
  displayName: nameProp,
}: ComboboxOptionProps): {
  value: string;
  displayName: string;
} => {
  // displayName is now always a string, so we can use it directly
  const displayNameStr = nameProp ?? '';

  return {
    value: valProp ?? kebabCase(displayNameStr),
    displayName: displayNameStr || valProp || '',
  };
};
