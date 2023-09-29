import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { Size } from '@leafygreen-ui/tokens';
import {
  Description,
  Error,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { formFieldFontStyles, textContainerStyle } from './FormField.styles';
import { type FormFieldProps, FormFieldState } from './FormField.types';
import { FormFieldInputWrapper } from './FormFieldInputWrapper';

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
      icon,
      className,
      inputWrapperProps,
      ...rest
    }: FormFieldProps,
    fwdRef,
  ) => {
    const baseFontSize = useUpdatedBaseFontSize();

    const labelId = useIdAllocator({ prefix: 'lg-form-field-label' });
    const descriptionId = useIdAllocator({
      prefix: 'lg-form-field-description',
    });
    const errorId = useIdAllocator({ prefix: 'lg-form-field-description' });
    const inputId = useIdAllocator({ prefix: 'lg-form-field-input' });

    const ariaLabelledby = label ? labelId : rest['aria-labelledby'];
    const ariaLabel = label ? '' : rest['aria-label'];
    const describedBy = `${description ? descriptionId : ''} ${
      state === FormFieldState.Error ? errorId : ''
    }`.trim();

    const renderedChildren =
      children &&
      React.cloneElement(children, {
        id: inputId,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': describedBy,
        'aria-label': ariaLabel,
      });

    return (
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
        <FormFieldInputWrapper
          input={renderedChildren}
          icon={icon}
          disabled={disabled}
          size={size}
          state={state}
          {...inputWrapperProps}
        />
        {state === FormFieldState.Error && (
          <Error id={errorId}>{errorMessage}</Error>
        )}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
