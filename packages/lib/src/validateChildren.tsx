import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { consoleOnce, isComponentType } from '.';

export const validateChildren = (
  children: React.ReactNode,
  validTypes: Array<string>,
) => {
  const validChildren = React.Children.map(children, child => {
    if (validTypes.some(type => isComponentType(child, type))) {
      return child as React.ReactElement;
    }
  })?.filter(child => !isUndefined(child));

  if (validChildren?.length !== React.Children.count(children)) {
    consoleOnce.warn(`Children must be one of: ${validTypes.join(', ')}`);
  }

  return validChildren;
};
