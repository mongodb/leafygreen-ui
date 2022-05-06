import { isComponentType, keyMap as _keyMap } from '@leafygreen-ui/lib';
import kebabCase from 'lodash/kebabCase';
import isEqual from 'lodash/isEqual';
import React, { DOMAttributes, DOMElement, ReactChild } from 'react';
import { ComboboxOptionProps } from './Combobox.types';

// TODO - remove this when lib/keyMap supports Backspace & Delete
export const keyMap = {
  ..._keyMap,
  Backspace: 8,
  Delete: 46,
} as const;

/**
 *
 * Wraps every instance of `wrap` found in `str` in the provided `element`.
 *
 * E.g. `wrapJSX('Apple', 'ap', 'em') => <em>Ap</em>ple`
 *
 * @param str
 * @param wrap
 * @param element
 * @returns `JSX.Element`
 */
export const wrapJSX = (
  str: string,
  wrap?: string,
  element?: keyof HTMLElementTagNameMap,
): JSX.Element => {
  if (wrap && element) {
    const regex = new RegExp(wrap, 'gi');
    const matches = str.matchAll(regex);

    if (matches) {
      const outArray = str.split('') as Array<ReactChild>;

      /**
       * For every match, splice it into the "string",
       * wrapped in the React element
       */
      // Consider adding --downlevelIteration TS flag so we don't need Array.from
      for (const match of Array.from(matches)) {
        const matchIndex = match.index ?? -1;
        const matchContent = match[0];
        const matchLength = matchContent.length;

        // We create a replacement array that's
        // the same length as the match we're deleting,
        // in order to keep the matchIndexes aligned
        // with the indexes of the output array
        const replacement = new Array<ReactChild>(matchLength).fill('');
        replacement[0] = React.createElement(element, null, matchContent);

        outArray.splice(matchIndex, matchLength, ...replacement);
      }

      return <>{outArray}</>;
    }

    return <>{str}</>;
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
    displayName: nameProp ?? valProp ?? '', // TODO consider adding a prop to customize displayName => startCase(valProp),
  };
};

export interface OptionObject {
  value: string;
  displayName: string;
  hasGlyph?: boolean;
}

/**
 *
 * Flattens multiple nested ComboboxOptions into a 1D array
 *
 * @param _children
 * @returns `Array<OptionObject>`
 */
export const flattenChildren = (
  _children: React.ReactNode,
): Array<OptionObject> => {
  // TS doesn't like .reduce
  // @ts-expect-error
  return React.Children.toArray(_children).reduce(
    // @ts-expect-error
    (
      acc: Array<OptionObject>,
      child: React.ReactNode,
    ): Array<OptionObject> | undefined => {
      if (isComponentType(child, 'ComboboxOption')) {
        const { value, displayName } = getNameAndValue(child.props);
        const { glyph } = child.props;

        return [
          ...acc,
          {
            value,
            displayName,
            hasGlyph: !!glyph,
          },
        ];
      } else if (isComponentType(child, 'ComboboxGroup')) {
        const { children } = child.props;

        if (children) {
          return [...acc, ...flattenChildren(children)];
        }
      }
    },
    [] as Array<OptionObject>,
  );
};
