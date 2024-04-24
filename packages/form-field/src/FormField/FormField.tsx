import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import {
  Description,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { DEFAULT_MESSAGES, LGIDS_FORM_FIELD } from '../constants';
import { FormFieldProvider } from '../FormFieldContext';
import { FormFieldFeedback } from '../FormFieldFeedback';

import {
  getFontSizeStyles,
  marginBottom,
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
      errorMessage = DEFAULT_MESSAGES.error,
      successMessage = DEFAULT_MESSAGES.success,
      className,
      darkMode,
      optional,
      id,
      ...rest
    }: FormFieldProps,
    fwdRef,
  ) => {
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const fontStyles = getFontSizeStyles({ baseFontSize, size });

    const { labelId, descriptionId, feedbackId, inputId, inputProps } =
      useFormFieldProps({ label, description, state, id, disabled, ...rest });

    const formFieldFeedbackProps = {
      baseFontSize,
      disabled,
      errorMessage,
      id: feedbackId,
      size,
      state,
      successMessage,
    } as const;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <FormFieldProvider
          value={{ disabled, size, state, inputProps, optional }}
        >
          <div className={cx(fontStyles, className)} ref={fwdRef} {...rest}>
            <div
              className={cx(textContainerStyle, {
                [marginBottom]: !!(label || description),
              })}
            >
              {label && (
                <Label
                  data-testid={LGIDS_FORM_FIELD.label}
                  className={fontStyles}
                  htmlFor={inputId}
                  id={labelId}
                  disabled={disabled}
                >
                  {label}
                </Label>
              )}
              {description && (
                <Description
                  data-testid={LGIDS_FORM_FIELD.description}
                  className={fontStyles}
                  id={descriptionId}
                  disabled={disabled}
                >
                  {description}
                </Description>
              )}
            </div>
            {children}
            <FormFieldFeedback {...formFieldFeedbackProps} />
          </div>
        </FormFieldProvider>
      </LeafyGreenProvider>
    );
  },
);

FormField.displayName = 'FormField';
