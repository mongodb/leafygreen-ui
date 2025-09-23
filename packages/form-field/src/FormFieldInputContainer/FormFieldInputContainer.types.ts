import React from 'react';

import { FormFieldChildren } from '../FormField/FormField.types';

export interface FormFieldInputContainerProps
  extends React.ComponentProps<'div'> {
  /**
   * Must pass a single element in order to label the input element appropriately
   */
  children: FormFieldChildren;

  /**
   * The content rendered after the children
   */
  contentEnd?: React.ReactElement;
}
