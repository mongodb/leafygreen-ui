import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { isComponentType } from '.';

export const validateChildren = (
  children: React.ReactNode,
  validTypes: Array<string>,
) => {
  return React.Children.map(children, child => {
    if (validTypes.some(type => isComponentType(child, type))) {
      return child as React.ReactElement<
        any,
        string | React.JSXElementConstructor<any>
      >;
    }
  })?.filter(child => !isUndefined(child));
};
