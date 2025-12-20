import React from 'react';

import { FormField } from '@leafygreen-ui/form-field';

import { useTimeInputDisplayContext } from '../../Context';

import { TimeFormFieldProps } from './TimeFormField.types';

/**
 * A wrapper around `FormField` that sets the relevant
 * attributes, and styling
 */
export const TimeFormField = React.forwardRef<
  HTMLDivElement,
  TimeFormFieldProps
>(({ children, ...rest }: TimeFormFieldProps, fwdRef) => {
  const { label, description, disabled, size } = useTimeInputDisplayContext();

  return (
    <FormField
      label={label}
      description={description}
      disabled={disabled}
      size={size}
      ref={fwdRef}
      {...rest}
    >
      {children}
    </FormField>
  );
});

TimeFormField.displayName = 'TimeFormField';
