import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { Size } from '@leafygreen-ui/tokens';
import {
  Description,
  Error,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { FormFieldProvider } from '../FormFieldContext/FormFieldContext';
import { formFieldFontStyles, textContainerStyle } from './FormField.styles';
import { type FormFieldProps, FormFieldState } from './FormField.types';
import { useFormFieldProps } from './useFormFieldProps';

/**
 * Creates a form field element with the appropriate styles and attributes for each element.
 *
 * Use the {@link FormFieldInput} element to apply the appropriate
 * interaction styles to the inner container element.
 *
 * See .stories file for examples
 * */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      description,
      children,
      state = FormFieldState.Unset,
      size = Size.Default,
      disabled = false,
      errorMessage,
      className,
      ...rest
    }: FormFieldProps,
    fwdRef,
  ) => {
    const baseFontSize = useUpdatedBaseFontSize();

    const { labelId, descriptionId, errorId, inputId, inputProps } =
      useFormFieldProps({ label, description, state, ...rest });

    return (
      <FormFieldProvider value={{ disabled, size, state, inputProps }}>
        <div
          className={cx(formFieldFontStyles[baseFontSize], className)}
          ref={fwdRef}
          {...rest}
        >
          <div className={textContainerStyle}>
            {label && (
              <Label htmlFor={inputId} id={labelId} disabled={disabled}>
                {label}
              </Label>
            )}
            {description && (
              <Description id={descriptionId} disabled={disabled}>
                {description}
              </Description>
            )}
          </div>
          {children}
          {state === FormFieldState.Error && (
            <Error id={errorId}>{errorMessage}</Error>
          )}
        </div>
      </FormFieldProvider>
    );
  },
);

FormField.displayName = 'FormField';
