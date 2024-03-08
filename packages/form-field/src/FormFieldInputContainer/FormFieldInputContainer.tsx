import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField/FormField.types';
import { useFormFieldContext } from '../FormFieldContext/FormFieldContext';

import {
  childrenWrapperStyles,
  errorIconStyles,
  iconClassName,
  iconStyles,
  iconsWrapperStyles,
  inputElementClassName,
  inputWrapperBaseStyles,
  inputWrapperDisabledStyles,
  inputWrapperFocusStyles,
  inputWrapperModeStyles,
  inputWrapperSizeStyles,
  inputWrapperStateStyles,
  optionalTextBaseStyle,
  optionalTextThemeStyle,
  validIconStyles,
} from './FormFieldInputContainer.styles';
import { FormFieldInputContainerProps } from './FormFieldInputContainer.types';

/**
 * Applies styling around the `input` of a FormField element
 * @internal
 */
export const FormFieldInputContainer = forwardRef<
  HTMLDivElement,
  FormFieldInputContainerProps
>(
  (
    { contentEnd, className, children, ...rest }: FormFieldInputContainerProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const { disabled, size, state, inputProps, optional } =
      useFormFieldContext();

    const renderedChildren = React.cloneElement(children, {
      ...inputProps,
      className: cx(inputElementClassName, children.props.className),
    });

    const shouldRenderOptionalText =
      state === FormFieldState.None && !disabled && optional;

    return (
      <div
        {...rest}
        ref={fwdRef}
        aria-disabled={disabled}
        className={cx(
          inputWrapperBaseStyles,
          inputWrapperModeStyles[theme],
          inputWrapperSizeStyles[size ?? Size.Default],
          inputWrapperStateStyles[state][theme],
          inputWrapperFocusStyles[theme],
          {
            [inputWrapperDisabledStyles[theme]]: disabled,
          },
          className,
        )}
      >
        <div className={childrenWrapperStyles}>{renderedChildren}</div>
        <div className={iconsWrapperStyles}>
          {state === FormFieldState.Valid && !disabled && (
            <Icon
              role="presentation"
              title="Valid"
              glyph="Checkmark"
              className={validIconStyles[theme]}
            />
          )}

          {state === FormFieldState.Error && !disabled && (
            <Icon
              role="presentation"
              title="Error"
              glyph="Warning"
              className={errorIconStyles[theme]}
            />
          )}

          {shouldRenderOptionalText && (
            <div
              className={cx(
                optionalTextBaseStyle,
                optionalTextThemeStyle[theme],
              )}
            >
              <p>Optional</p>
            </div>
          )}

          {contentEnd &&
            React.cloneElement(contentEnd, {
              className: cx(
                iconClassName,
                iconStyles[theme],
                contentEnd.props.className,
              ),
              disabled,
            })}
        </div>
      </div>
    );
  },
);

FormFieldInputContainer.displayName = 'FormFieldInputWrapper';
