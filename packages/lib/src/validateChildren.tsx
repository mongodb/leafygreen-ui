import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { isComponentType } from '.';

export const validateChildren = (
  children: React.ReactNode,
  validTypes: Array<string>,
) => {
  return React.Children.map(children, child => {
    return validTypes.some(type => isComponentType(child, type))
      ? (child as React.ReactElement<
          any,
          string | React.JSXElementConstructor<any>
        >)
      : undefined;
  })?.filter(child => !isUndefined(child));
};
