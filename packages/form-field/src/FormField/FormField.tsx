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
  getFontSize,
  paddingBottom,
  textContainerStyle,
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
      baseFontSize: baseFontSizeProp,
      state = FormFieldState.None,
      size = Size.Default,
      disabled = false,
      errorMessage,
      className,
      darkMode,
      optional,
      id,
      ...rest
    }: FormFieldProps,
    fwdRef,
  ) => {
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);

    const { labelId, descriptionId, errorId, inputId, inputProps } =
      useFormFieldProps({ label, description, state, id, ...rest });

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <FormFieldProvider
          value={{ disabled, size, state, inputProps, optional }}
        >
          <div
            className={cx(getFontSize({ baseFontSize, size }), className)}
            ref={fwdRef}
            {...rest}
          >
            <div
              className={cx(textContainerStyle, {
                [paddingBottom]: !!(label || description),
              })}
            >
              {label && (
                <Label
                  data-testid="lg-form_field-label"
                  className={getFontSize({ baseFontSize, size })}
                  htmlFor={inputId}
                  id={labelId}
                  disabled={disabled}
                >
                  {label}
                </Label>
              )}
              {description && (
                <Description
                  data-testid="lg-form_field-description"
                  className={getFontSize({ baseFontSize, size })}
                  id={descriptionId}
                  disabled={disabled}
                >
                  {description}
                </Description>
              )}
            </div>
            {children}

            {state === FormFieldState.Error && !disabled && (
              <div className={errorTextContainerStyle}>
                <Error
                  data-testid="lg-form_field-error_message"
                  className={getFontSize({ baseFontSize, size })}
                  id={errorId}
                >
                  {errorMessage}
                </Error>
              </div>
            )}
          </div>
        </FormFieldProvider>
      </LeafyGreenProvider>
    );
  },
);

FormField.displayName = 'FormField';
