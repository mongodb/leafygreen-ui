import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import {
  Description,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { DEFAULT_MESSAGES } from '../constants';
import { FormFieldProvider } from '../FormFieldContext';
import { FormFieldFeedback } from '../FormFieldFeedback';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

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
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
      ...rest
    }: FormFieldProps,
    fwdRef,
  ) => {
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const fontStyles = getFontSizeStyles({ baseFontSize, size });
    const lgIds = getLgIds(dataLgId);

    const { labelId, descriptionId, feedbackId, inputId, inputProps } =
      useFormFieldProps({
        label,
        description,
        state,
        id,
        disabled,
        ...rest,
      });

    const formFieldFeedbackProps = {
      baseFontSize,
      disabled,
      errorMessage,
      id: feedbackId,
      size,
      state,
      successMessage,
    } as const;

    console.log({ lgIds });

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <FormFieldProvider
          value={{ disabled, size, state, inputProps, optional, lgIds }}
        >
          <div
            className={cx(fontStyles, className)}
            ref={fwdRef}
            data-lgid={lgIds.root}
            {...rest}
          >
            <div
              className={cx(textContainerStyle, {
                [marginBottom]: !!(label || description),
              })}
            >
              {label && (
                <Label
                  data-testid={lgIds.label}
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
                  data-testid={lgIds.description}
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
