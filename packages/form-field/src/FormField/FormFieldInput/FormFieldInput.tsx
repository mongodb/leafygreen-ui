import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField.types';
import { useFormFieldContext } from '../FormFieldContext/FormFieldContext';

import {
  childrenWrapperStyles,
  errorIconStyles,
  iconClassName,
  iconStyles,
  inputElementClassName,
  inputWrapperBaseStyles,
  inputWrapperDisabledStyles,
  inputWrapperFocusStyles,
  inputWrapperModeStyles,
  inputWrapperSizeStyles,
  inputWrapperStateStyles,
} from './FormFieldInput.styles';
import { FormFieldInputProps } from './FormFieldInput.types';

export const FormFieldInput = forwardRef<HTMLDivElement, FormFieldInputProps>(
  ({ icon, className, children, ...rest }: FormFieldInputProps, fwdRef) => {
    const { theme } = useDarkMode();
    const { disabled, size, state, inputProps } = useFormFieldContext();

    const renderedChildren = React.cloneElement(children, {
      ...inputProps,
      className: cx(inputElementClassName, children.props.className),
    });

    return (
      <div
        {...rest}
        ref={fwdRef}
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
          className,
        )}
      >
        <div className={childrenWrapperStyles}>{renderedChildren}</div>
        {state === FormFieldState.Error && (
          <Icon
            role="presentation"
            title="Error"
            glyph="Warning"
            className={errorIconStyles[theme]}
          />
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
    );
  },
);

FormFieldInput.displayName = 'FormFieldInputWrapper';
