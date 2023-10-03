import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import {
  Description,
  Error,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { FormFieldProvider } from '../FormFieldContext';

import {
  errorTextContainerStyle,
  formFieldFontStyles,
  labelTextContainerStyle,
} from './FormField.styles';
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
    const baseFontSize = useUpdatedBaseFontSize(
      size === Size.Large ? 16 : undefined,
    );

    const { labelId, descriptionId, errorId, inputId, inputProps } =
      useFormFieldProps({ label, description, state, ...rest });

    return (
      <LeafyGreenProvider baseFontSize={baseFontSize === 16 ? 16 : 14}>
        <FormFieldProvider value={{ disabled, size, state, inputProps }}>
          <div
            className={cx(formFieldFontStyles[baseFontSize], className)}
            ref={fwdRef}
            {...rest}
          >
            <div className={labelTextContainerStyle}>
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
            <div className={errorTextContainerStyle}>
              {state === FormFieldState.Error && (
                <Error id={errorId}>{errorMessage}</Error>
              )}
            </div>
          </div>
        </FormFieldProvider>
      </LeafyGreenProvider>
    );
  },
);

FormField.displayName = 'FormField';
