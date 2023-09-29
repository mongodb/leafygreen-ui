import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import {
  Description,
  Error,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import {
  childrenWrapperStyles,
  errorIconStyles,
  formFieldFontStyles,
  iconClassName,
  iconStyles,
  inputWrapperBaseStyles,
  inputWrapperDisabledStyles,
  inputWrapperFocusStyles,
  inputWrapperModeStyles,
  inputWrapperSizeStyles,
  inputWrapperStateStyles,
  textContainerStyle,
} from './FormField.styles';
import { type FormFieldProps, FormFieldState } from './FormField.types';

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      description,
      children,
      state = FormFieldState.Unset,
      size,
      disabled,
      errorMessage,
      icon,
      className,
      inputWrapperProps,
      ...rest
    }: FormFieldProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const baseFontSize = useUpdatedBaseFontSize();

    const labelId = useIdAllocator({ prefix: 'lg-form-field-label' });
    const descriptionId = useIdAllocator({
      prefix: 'lg-form-field-description',
    });
    const errorId = useIdAllocator({ prefix: 'lg-form-field-description' });
    const inputId = useIdAllocator({ prefix: 'lg-form-field-input' });

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
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          {...inputWrapperProps}
          aria-disabled={disabled}
          className={cx(
            inputWrapperBaseStyles,
            inputWrapperModeStyles[theme],
            inputWrapperFocusStyles[theme],
            inputWrapperSizeStyles[size ?? Size.Default],
            inputWrapperStateStyles[state][theme],
            {
              [inputWrapperDisabledStyles[theme]]: disabled,
            },
            inputWrapperProps?.className,
          )}
        >
          <div className={childrenWrapperStyles}>
            {React.cloneElement(children, {
              id: inputId,
              'aria-labelledby': labelId,
              'aria-describedby': `${descriptionId} ${errorId}`,
            })}
          </div>
          {state === FormFieldState.Error && (
            <Icon glyph="Warning" className={errorIconStyles[theme]} />
          )}
          {icon &&
            React.cloneElement(icon, {
              className: cx(
                iconClassName,
                iconStyles[theme],
                icon.props.className,
              ),
              disabled,
            })}
        </div>
        {state === FormFieldState.Error && (
          <Error id={errorId}>{errorMessage}</Error>
        )}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
