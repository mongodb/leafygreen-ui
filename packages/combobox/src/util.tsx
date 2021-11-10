import { kebabCase, startCase } from 'lodash';
import React from 'react';
import { ComboboxOptionProps } from './Combobox.types';

/**
 *
 * Wraps the first instance of `wrap` found in `str` within the provided `element`.
 *
 * E.g. `wrapJSX('Apple', 'ap', 'em') => <><em>Ap</em>ple</>`
 *
 * @param str
 * @param wrap
 * @param element
 * @returns `JSX.Element`
 */
export const wrapJSX = (
  str: string,
  wrap?: string,
  element?: string,
): JSX.Element => {
  if (wrap && element) {
    const regex = new RegExp(wrap, 'gi');
    const startIndex = str.search(regex);
    const endIndex = startIndex + wrap.length;
    const nameArr = str.split('');
    const start = nameArr.slice(0, startIndex).join('');
    const end = nameArr.slice(endIndex).join('');
    const match = nameArr.slice(startIndex, endIndex).join('');
    const matchEl = React.createElement(element, null, match);
    return (
      <>
        {start}
        {matchEl}
        {end}
      </>
    );
  }

  return <>{str}</>;
};

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
    displayName: nameProp ?? startCase(valProp),
  };
};
