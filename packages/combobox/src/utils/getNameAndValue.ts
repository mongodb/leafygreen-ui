import { ReactNode } from 'react';
import kebabCase from 'lodash/kebabCase';

import { getNodeTextContent } from '@leafygreen-ui/lib';

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
  displayName: Exclude<ReactNode, null | undefined>;
} => {
  const displayNameProps = getNodeTextContent(nameProp);

  return {
    value: valProp ?? kebabCase(displayNameProps),
    displayName: displayNameProps || valProp || '', // TODO consider adding a prop to customize displayName => startCase(valProp),
  };
};
