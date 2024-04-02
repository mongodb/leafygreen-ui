import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import {
  Body,
  Description,
  Error,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { LGIDS_FORM_FIELD } from '../constants';
import { FormFieldProvider } from '../FormFieldContext';

import {
  errorIconStyles,
  getFontSize,
  marginBottom,
  stateFeedbackContainerStyle,
  textContainerStyle,
  validIconStyles,
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
      successMessage,
      className,
      darkMode,
      optional,
      id,
      ...rest
    }: FormFieldProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const fontStyles = getFontSize({ baseFontSize, size });

    const { labelId, descriptionId, errorId, inputId, inputProps } =
      useFormFieldProps({ label, description, state, id, disabled, ...rest });

    const isErrorState = state === FormFieldState.Error;
    const isSuccessState = state === FormFieldState.Valid;
    const showStateFeedback = (isErrorState || isSuccessState) && !disabled;

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
                  data-testid="lg-form_field-label"
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
                  data-testid="lg-form_field-description"
                  className={fontStyles}
                  id={descriptionId}
                  disabled={disabled}
                >
                  {description}
                </Description>
              )}
            </div>
            {children}

            {showStateFeedback && (
              <div className={stateFeedbackContainerStyle}>
                {isErrorState && (
                  <>
                    <Icon
                      role="presentation"
                      title="Error"
                      glyph="Warning"
                      className={errorIconStyles[theme]}
                    />
                    <Error
                      data-testid="lg-form_field-error_message"
                      data-lgid={LGIDS_FORM_FIELD.errorMessage}
                      className={fontStyles}
                      id={errorId}
                    >
                      {errorMessage}
                    </Error>
                  </>
                )}
                {isSuccessState && (
                  <>
                    <Icon
                      role="presentation"
                      title="Valid"
                      glyph="Checkmark"
                      className={validIconStyles[theme]}
                    />
                    <Body
                      data-testid="lg-form_field-success_message"
                      data-lgid={LGIDS_FORM_FIELD.successMessage}
                      className={fontStyles}
                    >
                      {successMessage}
                    </Body>
                  </>
                )}
              </div>
            )}
          </div>
        </FormFieldProvider>
      </LeafyGreenProvider>
    );
  },
);

FormField.displayName = 'FormField';
