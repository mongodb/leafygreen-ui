import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import {
  childrenWrapperStyles,
  errorIconStyles,
  iconClassName,
  iconStyles,
  inputWrapperBaseStyles,
  inputWrapperDisabledStyles,
  inputWrapperFocusStyles,
  inputWrapperModeStyles,
  inputWrapperSizeStyles,
  inputWrapperStateStyles,
} from '../FormField.styles';
import { FormFieldState } from '../FormField.types';

import { FormFieldInputWrapperProps } from './FormFieldInputWrapper.types';

export const FormFieldInputWrapper = forwardRef<
  HTMLDivElement,
  FormFieldInputWrapperProps
>(
  (
    {
      input,
      icon,
      size,
      state,
      disabled,
      className,
      ...rest
    }: FormFieldInputWrapperProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();

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
        <div className={childrenWrapperStyles}>{input}</div>
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

FormFieldInputWrapper.displayName = 'FormFieldInputWrapper';
