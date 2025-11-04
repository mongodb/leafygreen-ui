import React, { useEffect } from 'react';
import { SingleSelectProvider } from './SingleSelectContext';
import SingleSelectInternal from './SingleSelectInternal';
import {
  SingleSelectFieldProperties,
  InternalFieldProperties,
} from '../../FormTemplateContext/FormTemplateContext.types';
import SingleSelectOption from './SingleSelectOption';

interface SingleSelectProps
  extends Omit<SingleSelectFieldProperties, InternalFieldProperties> {
  // The name for the input
  name: string;

  // Option Definitions
  children: React.ReactNode;
}

function SingleSelect({
  children,
  name,
  required = false,
  ...rest
}: SingleSelectProps) {
  // Fields are not responsible for rendering themselves.
  return (
    <SingleSelectProvider>
      <SingleSelectInternal name={name} {...rest}>
        {children}
      </SingleSelectInternal>
    </SingleSelectProvider>
  );
}

SingleSelect.displayName = 'Field.SingleSelect';

SingleSelect.Option = SingleSelectOption;

export default SingleSelect;
