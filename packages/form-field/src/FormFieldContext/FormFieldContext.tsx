import React, { PropsWithChildren, useContext } from 'react';

import { Size } from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField/FormField.types';
import { FormFieldInputElementProps } from '../FormField/useFormFieldProps';

export interface FormFieldContextProps {
  disabled: boolean;
  size: Size;
  state: FormFieldState;
  inputProps?: FormFieldInputElementProps;
  optional?: boolean;
}

export const defaultFormFieldContext = {
  disabled: false,
  size: Size.Default,
  state: FormFieldState.None,
};

export const FormFieldContext = React.createContext<FormFieldContextProps>(
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

/**
 * Returns {@link FormFieldContextProps} to be used within the FormFieldInputContainer,
 * or within and custom FormField children
 */
export const useFormFieldContext = () => useContext(FormFieldContext);
