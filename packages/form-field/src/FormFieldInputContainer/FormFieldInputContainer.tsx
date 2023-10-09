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
        <div className={iconsWrapperStyles}>
          {state === FormFieldState.Valid && (
            <Icon
              role="presentation"
              title="Valid"
              glyph="Checkmark"
              className={validIconStyles[theme]}
            />
          )}
          {state === FormFieldState.Error && (
            <Icon
              role="presentation"
              title="Error"
              glyph="Warning"
              className={errorIconStyles[theme]}
            />
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
