import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { LGIDS_FORM_FIELD } from '../constants';
import { FormFieldState } from '../FormField/FormField.types';
import { useFormFieldContext } from '../FormFieldContext/FormFieldContext';

import {
  additionalChildrenWrapperStyles,
  childrenWrapperStyles,
  getIconDisabledThemeStyles,
  getIconThemeStyles,
  getInputWrapperStyles,
  getOptionalTextStyle,
  iconClassName,
  inputElementClassName,
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

    const inputWrapperStyles = getInputWrapperStyles({
      disabled,
      size: size ?? Size.Default,
      state,
      theme,
    });

    const renderedChildren = React.cloneElement(children, {
      ...inputProps,
      className: cx(inputElementClassName, children.props.className),
    });

    const showOptionalText =
      state === FormFieldState.None && !disabled && optional;
    const showAdditionalChildren = showOptionalText || contentEnd;

    return (
      <div {...rest} ref={fwdRef} className={cx(inputWrapperStyles, className)}>
        <div className={childrenWrapperStyles}>{renderedChildren}</div>
        {showAdditionalChildren && (
          <div className={additionalChildrenWrapperStyles}>
            {showOptionalText && (
              <div
                data-lgid={LGIDS_FORM_FIELD.optional}
                className={getOptionalTextStyle(theme)}
              >
                <p>Optional</p>
              </div>
            )}

            {contentEnd &&
              React.cloneElement(contentEnd, {
                className: cx(
                  iconClassName,
                  getIconThemeStyles(theme),
                  { [getIconDisabledThemeStyles(theme)]: disabled },
                  contentEnd.props.className,
                ),
              })}
          </div>
        )}
      </div>
    );
  },
);

FormFieldInputContainer.displayName = 'FormFieldInputWrapper';
