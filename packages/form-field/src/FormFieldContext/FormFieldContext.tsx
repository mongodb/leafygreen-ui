import React, { PropsWithChildren, useContext } from 'react';

import { Size } from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField/FormField.types';
import { FormFieldInputElementProps } from '../FormField/useFormFieldProps';

interface FormFieldContextProps {
  disabled: boolean;
  size: Size;
  state: FormFieldState;
  inputProps?: FormFieldInputElementProps;
}

const defaultFormFieldContext = {
  disabled: false,
  size: Size.Default,
  state: FormFieldState.Unset,
};

const FormFieldContext = React.createContext<FormFieldContextProps>(
  defaultFormFieldContext,
);

export const FormFieldProvider = ({
  value,
  children,
}: PropsWithChildren<{
  value: FormFieldContextProps;
}>) => (
  <FormFieldContext.Provider value={value}>
    {children}
  </FormFieldContext.Provider>
);

export const useFormFieldContext = () => useContext(FormFieldContext);
