import React from 'react';
import { SingleSelectStoreProvider } from './singleSelectStore';
import SingleSelectInternal from './SingleSelectInternal';
import {
  SingleSelectFieldProperties,
  InternalFieldProperties,
} from '../../formStore';
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
    <SingleSelectStoreProvider>
      <SingleSelectInternal name={name} {...rest}>
        {children}
      </SingleSelectInternal>
    </SingleSelectStoreProvider>
  );
}

SingleSelect.displayName = 'Field.SingleSelect';

SingleSelect.Option = SingleSelectOption;

export default SingleSelect;
